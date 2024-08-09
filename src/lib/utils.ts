import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const storeAuthInfo = ({
  accountId,
  staffId,
  name,
  token,
}: {
  accountId: string;
  staffId: string;
  name: string;
  token: string;
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ staffId, name, accountId }),
  );
  localStorage.setItem("token", token);
};

export const getAuthInfo = () => {
  const userInfo: { staffId: string; name: string; accountId: string } | null =
    JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  const token = localStorage.getItem("token");

  return { userInfo, token };
};

export const clearLocalStorage = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
};

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  if (+hour === 0) {
    return `12:${minute} PM`;
  }
  if (+hour <= 12) {
    return `${hour}:${minute} AM`;
  }

  if (+hour > 12) {
    return `${+hour - 12 >= 10 ? +hour - 12 : "0" + (+hour - 12)}:${minute} PM`;
  }
};

export const getMinutesFromTimeStr = (time: string) => {
  const [hour, minute] = time.split(":");
  const totalMins = +hour * 60 + +minute;
  return totalMins;
};
// export const getStatusColor = (status: EStatus) => {
//   const STATUS_COLOR: Record<EStatus, string> = {
//     [EStatus.InProgress]: "text-blue-600",
//     [EStatus.Complete]: "text-green-600",
//     [EStatus.Pending]: "text-amber-600",
//   };

//   return STATUS_COLOR[status];
// };

// export const generateCryptoKey = async () => {
//   return crypto.subtle.generateKey(
//     {
//       name: "AES-GCM",
//       length: 256,
//     },
//     true,
//     ["encrypt", "decrypt"],
//   );
// };

// export const importKey = async (customKey: string) => {
//   const keyBuffer = stringToArrayBuffer(customKey);
//   return crypto.subtle.importKey(
//     "raw",
//     keyBuffer,
//     {
//       name: "AES-GCM",
//     },
//     true,
//     ["encrypt", "decrypt"],
//   );
// };

// export const stringToArrayBuffer = (str: string) => {
//   const encoder = new TextEncoder();
//   return encoder.encode(str);
// };

// export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
//   const bytes = new Uint8Array(buffer);
//   let binary = "";
//   bytes.forEach((b) => (binary += String.fromCharCode(b)));
//   return window.btoa(binary);
// };

// export const encryptPassword = async (password: string, key: CryptoKey) => {
//   const iv = crypto.getRandomValues(new Uint8Array(12));
//   const psw = stringToArrayBuffer(password);
//   const encrypted = await crypto.subtle.encrypt(
//     {
//       name: "AES-GCM",
//       iv: iv,
//     },
//     key,
//     psw,
//   );

//   return { encrypted, iv };
// };
