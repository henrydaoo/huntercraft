import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  sendContactEmail,
  contactFormSchema,
  type ContactFormSchema,
} from "@/services/emailService";
import AnimatedSection from "./AnimatedSection";

const Contact = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const messageValue = watch("message");

  const onSubmit = async (data: ContactFormSchema) => {
    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        toast.success("Message Sent!", {
          description: "Thank you for your message. I'll get back to you soon.",
        });
        reset();
      } else {
        toast.error("Failed to Send", {
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <AnimatedSection id="contact" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Feel free to reach out. We're open to discussing new opportunities.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Name *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-md px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-md px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message *
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={5}
                className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-md px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Let's start a conversation..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.message && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                  {messageValue?.length || 0}/2000 characters
                </p>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white font-bold py-3 px-10 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
