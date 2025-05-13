
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

interface ForgotPasswordFormProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
  onError: (error: Error) => void;
}

export const ForgotPasswordForm = ({ onBack, onSuccess, onError }: ForgotPasswordFormProps) => {
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: ""
    }
  });

  const handleResetPassword = async (values: z.infer<typeof resetSchema>) => {
    setIsSubmitting(true);
    try {
      await resetPassword(values.email);
      onSuccess(values.email);
    } catch (error: any) {
      onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Button 
          type="button" 
          variant="ghost" 
          className="p-0 h-auto flex items-center text-muted-foreground hover:text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
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
            {isSubmitting ? "Sending reset link..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </>
  );
};
