import { useTheme } from "@/contexts/ThemeContext"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:dark:bg-gray-800 group-[.toaster]:text-gray-900 group-[.toaster]:dark:text-white group-[.toaster]:border group-[.toaster]:border-gray-200 group-[.toaster]:dark:border-gray-700 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-600 group-[.toast]:dark:text-gray-300",
          actionButton:
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white group-[.toast]:hover:bg-blue-700",
          cancelButton:
            "group-[.toast]:bg-gray-200 group-[.toast]:dark:bg-gray-700 group-[.toast]:text-gray-800 group-[.toast]:dark:text-gray-200",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
