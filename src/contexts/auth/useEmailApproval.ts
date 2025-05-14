
import { supabase } from "@/integrations/supabase/client";

export const useEmailApproval = () => {
  const checkEmailApproved = async (email: string): Promise<boolean> => {
    try {
      // Ensure email is lowercase for case-insensitive comparison
      const normalizedEmail = email.toLowerCase();
      console.log("Checking approval for email:", normalizedEmail);
      
      const { data, error } = await supabase
        .from('approved_emails')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking approved email:", error);
        return false;
      }
      
      const isApproved = !!data;
      console.log("Email approval status:", isApproved);
      return isApproved;
    } catch (error) {
      console.error("Error in checkEmailApproved:", error);
      return false;
    }
  };

  return { checkEmailApproved };
};
