import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import loaderIcon from "@/assets/loader.svg";

interface SubmitButtonProps {
  loading: boolean;
  className?: string;
  children: ReactNode;
}

const SubmitButton = ({ loading, className, children }: SubmitButtonProps) => {
  return (
    <>
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className={cn("min-w-[120px] disabled:opacity-80", className)}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <img
              src={loaderIcon}
              alt="loader"
              width={24}
              height={24}
              className="animate-spin"
            />
          </div>
        ) : (
          children
        )}
      </Button>
    </>
  );
};

export default SubmitButton;
