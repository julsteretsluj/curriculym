import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[#0077ED] dark:hover:bg-[#409cff] rounded-full px-4 py-2 shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-4 py-2 border border-black/5 dark:border-white/10",
        ghost:
          "hover:bg-black/5 dark:hover:bg-white/10 rounded-lg px-3 py-1.5 text-foreground",
        outline:
          "border border-black/10 dark:border-white/15 bg-background/60 hover:bg-muted rounded-full px-4 py-2",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 rounded-full px-4 py-2",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-xs px-3",
        lg: "h-11 text-base px-5",
        icon: "h-9 w-9 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";
