import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const chipVariants = cva(
  "rounded-lg text-center px-2.5 text-xs py-1.5 min-w-[80px] max-w-max",
  {
    variants: {
      color: {
        default: "bg-blue-600/40 border border-blue-600",
        error: "bg-destructive text-destructive-foreground",
        success: "bg-green-600 text-white",
        pending: "bg-amber-500 text-white",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

interface ChipProps extends VariantProps<typeof chipVariants> {
  className?: string;
  children: ReactNode;
}
const Chip = ({ color, className, children }: ChipProps) => {
  return (
    <div className={cn(chipVariants({ color }), className)}>{children}</div>
  );
};

export { Chip };
