// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Debug CORS settings
  const allowedOriginEnv = Deno.env.get("ALLOWED_ORIGIN") || "";
  const allowedOrigins = allowedOriginEnv.split(",").map((o) => o.trim());
  const requestOrigin = req.headers.get("Origin");

  console.log("🔍 CORS Debug:", {
    ALLOWED_ORIGIN: allowedOriginEnv || "NOT SET",
    REQUEST_ORIGIN: requestOrigin || "NOT SET",
    METHOD: req.method,
  });

  let allowOrigin = allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0] || "http://localhost:5173";

  // Dynamic CORS headers based on request
  const corsHeaders = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactFormData = await req.json();

    if (!name || !email || !message) {
      throw new Error("Missing required fields");
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("CONTACT_EMAIL");
    const subject =
      Deno.env.get("EMAIL_SUBJECT") || "New Contact Form Submission";

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }

    if (!toEmail) {
      throw new Error("CONTACT_EMAIL environment variable is required");
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;">
        <div style="margin: 0 auto; padding: 20px 0 48px; max-width: 600px;">
          
          <p style="font-size: 16px; line-height: 26px; font-weight: bold; margin: 0 0 20px 0;">
            NEW CONTACT MESSAGE
          </p>
          
          <p style="font-size: 16px; line-height: 26px; margin: 0 0 16px 0;">
            Hello,
          </p>
          
          <p style="font-size: 16px; line-height: 26px; margin: 0 0 24px 0;">
            You have received a new message through your portfolio contact form:
          </p>
          
          <div style="background-color: #f6f9fc; border: 1px solid #e1e8ed; border-radius: 6px; padding: 24px; margin: 24px 0;">
            <p style="font-size: 16px; line-height: 26px; margin: 0 0 12px 0;">
              <strong>From:</strong> ${name}
            </p>
            <p style="font-size: 16px; line-height: 26px; margin: 0 0 12px 0;">
              <strong>Email:</strong> <a href="mailto:${email}" style="color: #1977f3; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <p style="font-size: 16px; line-height: 26px; margin: 0 0 16px 0;">
            <strong>Message:</strong>
          </p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #1977f3; padding: 16px; margin: 0 0 24px 0;">
            <p style="font-size: 16px; line-height: 26px; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(
      subject
    )}" 
               style="background-color: #1977f3; border-radius: 3px; color: #fff; font-size: 16px; text-decoration: none; text-align: center; display: inline-block; padding: 12px 24px;">
              Reply to ${name}
            </a>
          </div>
          
          <hr style="border-color: #cccccc; margin: 20px 0; border-top: 1px solid #cccccc; border-bottom: none; border-left: none; border-right: none;">
          
          <p style="font-size: 16px; line-height: 26px; margin: 0;">
            Best regards,<br>
            <strong style="color: #1977f3;">Portfolio Contact System</strong>
          </p>
          
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Portfolio Contact <noreply@${
          Deno.env.get("RESEND_DOMAIN") || "resend.dev"
        }>`,
        to: toEmail,
        reply_to: email,
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();

    console.log("✅ Email sent successfully:", data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully!",
        id: data.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to send email",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
};

Deno.serve(handler);
