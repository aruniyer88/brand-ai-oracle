
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, LockKeyhole } from "lucide-react";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

interface ForgotPasswordFormProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
  onError: (error: Error) => void;
}

export const ForgotPasswordForm = ({
  onBack,
  onSuccess,
  onError
}: ForgotPasswordFormProps) => {
  const {
    resetPassword
  } = useAuth();
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
        <Button type="button" variant="ghost" className="p-0 h-auto flex items-center text-muted-foreground hover:text-foreground" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="rounded-full border-2 border-primary p-4 mb-4">
          <LockKeyhole className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">Trouble with logging in?</h3>
        <p className="text-center text-muted-foreground mb-6">
          Enter your email address and we'll send you a link to get back into your account.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
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
          
          <div className="mt-6 text-center">
            <Button 
              type="button"
              variant="link" 
              className="text-primary"
              onClick={onBack}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
