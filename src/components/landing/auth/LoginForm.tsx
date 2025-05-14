
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
      // Pre-check if email is approved before attempting login
      const isApproved = await checkEmailApproved(values.email);
      if (!isApproved) {
        throw new Error("Couldn't find your account");
      }
      
      await signInWithOtp(values.email);
      onSuccess(values.email);
    } catch (error: any) {
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
