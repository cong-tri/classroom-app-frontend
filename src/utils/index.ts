// import { User } from "../interfaces";

export const getErrorMessage = (error: unknown): string => {
  if (!error) return "";
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Có lỗi xảy ra";
};

export const toSlugFromURLEncoded = (encodedText: string): string => {
  const decoded = decodeURIComponent(encodedText);
  return decoded
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export interface DecodedJWT {
  [key: string]: unknown;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  iat?: number;
  exp?: number;
}

export const handleDecodeJWT = <T extends DecodedJWT | null>(
  token: string
): T | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid token");
    const base64Url = parts[1];
    const base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), "=");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("JWT Decode Error:", err);
    return null;
  }
};

// export const handleGetUserInfoFromJWT = (token: string): User | null => {
//   const decoded = handleDecodeJWT(token);
//   if (!decoded) return null;
//   return {
//     name: "ABC",
//     id: "123",
//     phone: "123456",
//     role: "student",
//     email: "abc",
//   };
// };
