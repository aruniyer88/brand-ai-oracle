
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Mail, Building, ArrowRight, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const meetingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Please enter your company name"),
  message: z.string().optional(),
});

type MeetingFormValues = z.infer<typeof meetingSchema>;

interface BookMeetingFormProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export const BookMeetingForm = ({ onSuccess, onBack }: BookMeetingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const handleSubmit = async (data: MeetingFormValues) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send this data to your backend
      console.log("Meeting request data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Request submitted",
        description: "We'll be in touch with you shortly to schedule a meeting.",
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting meeting request:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't submit your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center">
          <Calendar className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Book a Meeting</h2>
        <p className="text-sm text-muted-foreground">
          We'd love to chat with you about how Rabbit Hole Analytics can help your brand. 
          Please fill out the form below to book a meeting with our team.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input className="pl-10" placeholder="John Doe" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input className="pl-10" placeholder="email@example.com" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input className="pl-10" placeholder="Acme Inc." {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                    <Textarea 
                      className="pl-10 min-h-[100px]" 
                      placeholder="Tell us about your needs and when you'd prefer to meet."
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-2">
            {onBack && (
              <Button type="button" variant="outline" onClick={onBack} className="w-full">
                Back to Login
              </Button>
            )}
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Book Meeting <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
