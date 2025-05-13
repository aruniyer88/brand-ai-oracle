
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { OtpVerificationForm } from "@/components/landing/auth/OtpVerificationForm";
import { LoginForm } from "@/components/landing/auth/LoginForm";

// Schema for the signup form
const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  full_name: z.string().min(2, "Full name must be at least 2 characters")
});

const AuthPage = () => {
  const { user, loading, signUp, checkEmailApproved, signInWithOtp } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentOtpEmail, setSentOtpEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      full_name: "",
    },
  });

  // Handle login with OTP
  const handleLoginWithOtp = async (email: string) => {
    setAuthError(null);
    setSentOtpEmail(email);
  };

  // Handle OTP verification success
  const handleVerificationSuccess = () => {
    navigate("/search");
  };

  // Handle signup
  const handleSignup = async (values: z.infer<typeof signupSchema>) => {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      // Check if email is approved for signup
      const isApproved = await checkEmailApproved(values.email);
      if (!isApproved) {
        throw new Error("Access denied. Your email is not approved to register for this application.");
      }
      
      await signUp(values.email, { full_name: values.full_name });
      setSentOtpEmail(values.email);
    } catch (error: any) {
      setAuthError(error.message || "Sign up failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resending OTP
  const handleResendOtp = async () => {
    if (!sentOtpEmail) return;
    
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await signInWithOtp(sentOtpEmail);
    } catch (error: any) {
      setAuthError(error.message || "Failed to resend verification code");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already logged in, redirect to search page
  if (user && !loading) {
    return <Navigate to="/search" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            {sentOtpEmail ? "Verify your email" : "Sign in or create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sentOtpEmail ? (
            // Show OTP verification form if OTP has been sent
            <OtpVerificationForm
              email={sentOtpEmail}
              onSuccess={handleVerificationSuccess}
              onError={(error) => setAuthError(error.message)}
              onBack={() => setSentOtpEmail(null)}
              onResend={handleResendOtp}
            />
          ) : (
            // Show login/signup tabs
            <Tabs defaultValue="login" value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              {authError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <LoginForm
                  onSuccess={handleLoginWithOtp}
                  onError={(error) => setAuthError(error.message)}
                  onForgotPassword={() => {}} // We can remove this or keep it for password reset
                />
              </TabsContent>
              
              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
