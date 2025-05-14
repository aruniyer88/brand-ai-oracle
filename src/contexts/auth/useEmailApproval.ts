
import { supabase } from "@/integrations/supabase/client";

export const useEmailApproval = () => {
  const checkEmailApproved = async (email: string): Promise<boolean> => {
    try {
      if (!email) {
        console.error("No email provided for approval check");
        return false;
      }
      
      // Ensure email is lowercase for case-insensitive comparison
      const normalizedEmail = email.toLowerCase().trim();
      console.log("Checking approval for email:", normalizedEmail);
      
      const { data, error } = await supabase
        .from('approved_emails')
        .select('*')
        .ilike('email', normalizedEmail)  // Using ilike for case-insensitive matching
        .maybeSingle();
      
      if (error) {
        console.error("Error checking approved email:", error);
        return false;
      }
      
      const isApproved = !!data;
      console.log("Email approval status:", isApproved);
      
      // If not approved, let's check why by logging all approved emails
      if (!isApproved) {
        const { data: allEmails, error: allEmailsError } = await supabase
          .from('approved_emails')
          .select('email');
        
        if (!allEmailsError && allEmails) {
          console.log("All approved emails in database:", allEmails);
        }
      }
      
      return isApproved;
    } catch (error) {
      console.error("Error in checkEmailApproved:", error);
      return false;
    }
  };

  return { checkEmailApproved };
};
