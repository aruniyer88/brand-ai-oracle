
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginForm } from "./auth/LoginForm";
import { SignupForm } from "./auth/SignupForm";
import { ForgotPasswordForm } from "./auth/ForgotPasswordForm";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "signup";
}

export const AuthDialog = ({
  isOpen,
  onOpenChange,
  defaultTab = "login"
}: AuthDialogProps) => {
  const [authMode, setAuthMode] = useState<"login" | "signup">(defaultTab);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSuccessEmail, setResetSuccessEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Update tab when defaultTab prop changes
  useEffect(() => {
    if (defaultTab) {
      setAuthMode(defaultTab);
    }
  }, [defaultTab]);

  // Reset states when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setAuthError(null);
      setShowForgotPassword(false);
      setResetSuccessEmail(null);
    }
  }, [isOpen]);

  const handleAuthSuccess = () => {
    onOpenChange(false); // Close dialog after successful login/signup
    navigate("/search"); // Redirect to search page
  };

  const handleAuthError = (error: Error) => {
    setAuthError(error.message || "Authentication failed");
  };

  const handleForgotPassword = () => {
    setAuthError(null);
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setAuthError(null);
    setShowForgotPassword(false);
    setResetSuccessEmail(null);
  };

  const handleResetSuccess = (email: string) => {
    setResetSuccessEmail(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">
            {showForgotPassword ? "Reset Your Password" : "Get Started with Rabbit Hole Analytics"}
          </DialogTitle>
          <DialogDescription>
            {showForgotPassword 
              ? "We'll send you a link to reset your password" 
              : "Sign in to your account or create a new one"}
          </DialogDescription>
        </DialogHeader>
        
        {!showForgotPassword ? (
          // Login/Signup tabs
          <Tabs value={authMode} onValueChange={value => setAuthMode(value as "login" | "signup")}>
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
                onSuccess={handleAuthSuccess} 
                onError={handleAuthError}
                onForgotPassword={handleForgotPassword} 
              />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm onSuccess={handleAuthSuccess} onError={handleAuthError} />
            </TabsContent>
          </Tabs>
        ) : (
          // Forgot password flow
          <>
            {authError && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            
            {resetSuccessEmail ? (
              // Success message after sending reset email
              <div className="space-y-4">
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <AlertDescription className="text-green-700">
                    A password reset link has been sent to <strong>{resetSuccessEmail}</strong>. Please check your email.
                  </AlertDescription>
                </Alert>
                <Button onClick={handleBackToLogin} className="w-full">
                  Back to Login
                </Button>
              </div>
            ) : (
              // Forgot password form
              <ForgotPasswordForm
                onBack={handleBackToLogin}
                onSuccess={handleResetSuccess}
                onError={handleAuthError}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
