
import { supabase } from "@/integrations/supabase/client";

export const useEmailApproval = () => {
  const checkEmailApproved = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('approved_emails')
        .select('*')
        .eq('email', email.toLowerCase())
        .maybeSingle();
      
      if (error) {
        console.error("Error checking approved email:", error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error("Error in checkEmailApproved:", error);
      return false;
    }
  };

  return { checkEmailApproved };
};
