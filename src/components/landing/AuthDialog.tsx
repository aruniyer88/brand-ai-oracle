
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginForm } from "./auth/LoginForm";
import { SignupForm } from "./auth/SignupForm";

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
  const navigate = useNavigate();
  
  // Update tab when defaultTab prop changes
  useEffect(() => {
    if (defaultTab) {
      setAuthMode(defaultTab);
    }
  }, [defaultTab]);

  const handleAuthSuccess = () => {
    onOpenChange(false); // Close dialog after successful login/signup
    navigate("/search"); // Redirect to search page
  };

  const handleAuthError = (error: Error) => {
    setAuthError(error.message || "Authentication failed");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">
            Get Started with Rabbit Hole Analytics
          </DialogTitle>
          <DialogDescription>Sign in to your account or create a new one</DialogDescription>
        </DialogHeader>
        
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
            <LoginForm onSuccess={handleAuthSuccess} onError={handleAuthError} />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm onSuccess={handleAuthSuccess} onError={handleAuthError} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
