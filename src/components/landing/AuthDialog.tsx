
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./auth/LoginForm";
import { toast } from "@/hooks/use-toast";
import { OtpVerificationForm } from "./auth/OtpVerificationForm";
import { useAuth } from "@/contexts/AuthContext";
import { BookMeetingForm } from "./BookMeetingForm";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  defaultTab: 'login' | 'book';
}

export const AuthDialog = ({
  isOpen,
  onOpenChange,
  defaultTab = "login"
}: AuthDialogProps) => {
  const { signInWithOtp } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "book">(defaultTab);
  const [authError, setAuthError] = useState<string | null>(null);
  const [sentOtpEmail, setSentOtpEmail] = useState<string | null>(null);
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
      setSentOtpEmail(null);
    }
  }, [isOpen]);

  const handleAuthSuccess = () => {
    onOpenChange(false); // Close dialog after successful login
    navigate("/search"); // Redirect to search page
  };

  const handleAuthError = (error: Error) => {
    setAuthError(error.message || "Authentication failed");
  };

  const handleLoginWithOtp = (email: string) => {
    setSentOtpEmail(email);
    setAuthError(null);
  };

  const handleResendOtp = async () => {
    if (!sentOtpEmail) return;
    
    setAuthError(null);
    try {
      await signInWithOtp(sentOtpEmail);
      toast({
        title: "Verification code resent",
        description: "Please check your email for the new code"
      });
    } catch (error: any) {
      setAuthError(error.message || "Failed to resend verification code");
    }
  };

  const handleBookingSuccess = () => {
    toast({
      title: "Meeting request submitted",
      description: "We'll be in touch shortly to schedule your meeting."
    });
    onOpenChange(false); // Close dialog after successful booking
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-center mb-4">
          {/* Logo could go here */}
        </div>
        
        {sentOtpEmail ? (
          // Show OTP verification form if OTP has been sent
          <OtpVerificationForm
            email={sentOtpEmail}
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
            onBack={() => setSentOtpEmail(null)}
            onResend={handleResendOtp}
          />
        ) : authMode === "book" ? (
          // Book a meeting form
          <div className="space-y-6">
            <Button onClick={() => setAuthMode("login")} variant="ghost" className="mb-4">
              Back to Login
            </Button>
            
            <BookMeetingForm 
              onSuccess={handleBookingSuccess}
              onBack={() => setAuthMode("login")}
            />
          </div>
        ) : (
          // Login form
          <div className="space-y-6">
            {authError && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <LoginForm 
              onSuccess={handleLoginWithOtp} 
              onError={handleAuthError} 
              onForgotPassword={() => {}} 
            />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            
            <Button onClick={() => setAuthMode("book")} variant="outline" className="w-full">
              Book a Meeting
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
