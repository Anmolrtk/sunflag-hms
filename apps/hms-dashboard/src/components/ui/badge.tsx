import * as React from "react"
import { cn } from "@/lib/utils"

// 1. Define allowed variants
type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

// 2. Add 'variant' to the interface so TypeScript stops complaining
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  // 3. Map variants to styles
  const variants: Record<BadgeVariant, string> = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
    outline: "text-gray-950 border-gray-200",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
