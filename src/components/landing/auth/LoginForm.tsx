
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

interface LoginFormProps {
  onSuccess: (email: string) => void;
  onError: (error: Error) => void;
}

export const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const { signInWithOtp, checkEmailApproved } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: ""
    }
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    try {
      // Normalize email
      const email = values.email.toLowerCase().trim();
      console.log("Attempting login with email:", email);

      // Temporary toast to debug
      toast({
        title: "Checking email approval",
        description: `Checking if ${email} is approved...`
      });
      
      // Pre-check if email is approved before attempting login
      const isApproved = await checkEmailApproved(email);
      console.log("Pre-check approval result:", isApproved);
      
      if (!isApproved) {
        console.error(`Email ${email} not approved`);
        toast({
          title: "Email not approved",
          description: "The email is not in our approved list.",
          variant: "destructive"
        });
        throw new Error("Couldn't find your account");
      }
      
      // Temporary toast to debug
      toast({
        title: "Email approved",
        description: "Sending verification code..."
      });
      
      await signInWithOtp(email);
      console.log("OTP sent successfully");
      onSuccess(email);
    } catch (error: any) {
      console.error("Login form error:", error);
      onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FormField
          control={form.control}
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
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending verification code..." : "Send Verification Code"}
        </Button>
      </form>
    </Form>
  );
};
