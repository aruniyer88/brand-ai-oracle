
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEmailApproval } from "./useEmailApproval";

export const useAuthActions = () => {
  const { toast } = useToast();
  const { checkEmailApproved } = useEmailApproval();

  const signUp = async (email: string, userData?: { full_name?: string }) => {
    try {
      // Check if email is in approved list
      const isApproved = await checkEmailApproved(email);
      
      if (!isApproved) {
        throw new Error("Couldn't find your account");
      }

      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: userData,
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Verification email sent",
        description: "Please check your email for the login link or OTP code.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithOtp = async (email: string) => {
    try {
      // Check if email is in approved list
      const isApproved = await checkEmailApproved(email);
      
      if (!isApproved) {
        throw new Error("Couldn't find your account");
      }
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Don't create a new user if one doesn't exist
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Verification code sent",
        description: "Please check your email for the one-time password.",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyOtp = async (email: string, token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Signed in successfully",
      });
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    signUp,
    signInWithOtp,
    verifyOtp,
    signOut
  };
};
