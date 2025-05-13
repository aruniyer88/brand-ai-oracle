
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { OtpVerificationForm } from "@/components/landing/auth/OtpVerificationForm";
import { AuthTabs } from "@/components/landing/auth/AuthTabs";

const AuthPage = () => {
  const { user, loading, signInWithOtp } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentOtpEmail, setSentOtpEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle OTP verification success
  const handleVerificationSuccess = () => {
    navigate("/search");
  };

  // Handle login with OTP
  const handleLoginWithOtp = async (email: string) => {
    setAuthError(null);
    setSentOtpEmail(email);
  };

  // Handle signup
  const handleSignup = async (email: string) => {
    setAuthError(null);
    setSentOtpEmail(email);
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
            <AuthTabs
              onLoginSuccess={handleLoginWithOtp}
              onSignupSuccess={handleSignup}
              onError={(error) => setAuthError(error.message)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
