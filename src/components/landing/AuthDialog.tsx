import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./auth/LoginForm";
import { ForgotPasswordForm } from "./auth/ForgotPasswordForm";
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
  const [authMode, setAuthMode] = useState<"login" | "book">(defaultTab);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSuccessEmail, setResetSuccessEmail] = useState<string | null>(null);
  const [showBookMeeting, setShowBookMeeting] = useState(false);
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
      setShowBookMeeting(false);
    }
  }, [isOpen]);

  const handleAuthSuccess = () => {
    onOpenChange(false); // Close dialog after successful login
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
    setShowBookMeeting(false);
  };

  const handleResetSuccess = (email: string) => {
    setResetSuccessEmail(email);
  };

  const handleBookMeeting = () => {
    setShowBookMeeting(true);
  };

  const handleBookingSuccess = () => {
    onOpenChange(false); // Close dialog after successful booking
  };

  return <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="Rabbit Hole Analytics" 
              className="h-12 object-contain" 
            />
          </div>
        </DialogHeader>
        
        {showForgotPassword ? (
          // Forgot password flow
          <>
            {authError && 
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            }
            
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
        ) : showBookMeeting ? (
          // Book a meeting form
          <BookMeetingForm 
            onBack={handleBackToLogin}
            onSuccess={handleBookingSuccess} 
          />
        ) : (
          // Login and Book Meeting tabs
          <div className="space-y-6">
            {authError && 
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            }

            <LoginForm 
              onSuccess={handleAuthSuccess} 
              onError={handleAuthError} 
              onForgotPassword={handleForgotPassword} 
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
            
            <Button 
              onClick={handleBookMeeting} 
              variant="outline" 
              className="w-full"
            >
              Book a Meeting
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>;
};
