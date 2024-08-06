import { EStatus } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: EStatus) => {
  const STATUS_COLOR: Record<EStatus, string> = {
    [EStatus.InProgress]: "text-blue-600",
    [EStatus.Complete]: "text-green-600",
    [EStatus.Pending]: "text-amber-600",
  };

  return STATUS_COLOR[status];
};
