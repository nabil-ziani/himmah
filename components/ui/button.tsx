import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        shine:
          "text-white animate-shine bg-gradient-to-r from-[#22c55e] via-[#22c55e]/80 to-[#22c55e] bg-[length:400%_100%]",
        default: "bg-[#FF5C5C] text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-[#dc2626] text-destructive-foreground hover:bg-[#dc2626]/90",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground drop-shadow-md",
        secondary:
          "bg-white hover:bg-white/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "text-destructive-foreground transition-all duration-100 bg-gradient-to-br to-[#f6ce69] from-[#f86d6d] hover:drop-shadow-md"
      },
      size: {
        default: "h-10 px-6 py-2 rounded-lg",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
