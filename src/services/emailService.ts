import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Zod schema for validation
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine(val => val.trim().length >= 10, 'Message cannot be just whitespace')
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Send email using Supabase Edge Function
export const sendContactEmail = async (formData: ContactFormSchema): Promise<ContactFormResponse> => {
  try {
    // Validate form data using Zod schema
    const validatedData = contactFormSchema.parse(formData);

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Failed to send email');
    }

    return {
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your input and try again.',
        error: error.errors.map(err => err.message).join(', ')
      };
    }
    
    return {
      success: false,
      message: 'Unable to send message at this time. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
