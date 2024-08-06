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

export const generateCryptoKey = async () => {
  return crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );
};

export const importKey = async (customKey: string) => {
  const keyBuffer = stringToArrayBuffer(customKey);
  return crypto.subtle.importKey(
    "raw",
    keyBuffer,
    {
      name: "AES-GCM",
    },
    true,
    ["encrypt", "decrypt"],
  );
};

export const stringToArrayBuffer = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

export const encryptPassword = async (password: string, key: CryptoKey) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const psw = stringToArrayBuffer(password);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    psw,
  );

  return { encrypted, iv };
};
