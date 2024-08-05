import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const chipVariants = cva(
  "rounded-full text-center px-4 text-xs py-2 min-w-[80px] max-w-max",
  {
    variants: {
      color: {
        default: "bg-primary text-white",
        error: "bg-destructive text-destructive-foreground",
        success: "bg-green-600 text-white",
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
