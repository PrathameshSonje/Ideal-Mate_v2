import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { File } from "../types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function sortFilesByDate(files?: File): File {
  return files?.sort((a, b) => {
    const dateA = new Date(a.createAt).getTime();
    const dateB = new Date(b.createAt).getTime();
    console.log("hi from sort files");
    return dateB - dateA;
  });
}


export function sortFilesByName(files?: File) {
  return files?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000
    }${path}`
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
  return `${formattedSize} ${sizes[i]}`;
}

export class StreamingResponse extends Response {

  constructor( res: ReadableStream<any>, init?: ResponseInit ) {
    super(res as any, {
      ...init,
      status: 200,
      headers: {
        ...init?.headers,
      },
    });
  }
}