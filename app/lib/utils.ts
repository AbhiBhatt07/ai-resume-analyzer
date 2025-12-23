/**
 * Formats a number of bytes into a human-readable file size string
 * @param bytes - The number of bytes to format
 * @returns A formatted string with appropriate unit (B, KB, MB, GB, TB)
 */

import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function formatSize(bytes: number): string {
 if (bytes === 0) return "0 B";

 const units = ["B", "KB", "MB", "GB", "TB"];
 const byteSize = 1024;
 const index = Math.floor(Math.log(bytes) / Math.log(byteSize));
 const value = bytes / Math.pow(byteSize, index);

 return `${value.toFixed(2)} ${units[index]}`;
}

export function generateUUID() {
 return crypto.randomUUID();
}
