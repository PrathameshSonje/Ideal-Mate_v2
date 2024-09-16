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

// export const makeStream = <T extends Record<string, unknown>>(generator: AsyncGenerator<T, void, unknown>) => {

//   const encoder = new TextEncoder();
//   return new ReadableStream<any>({
//     async start(controller) {
//       for await (let chunk of generator) {
//         const chunkData = encoder.encode(JSON.stringify(chunk.choices[0]?.delta?.content));
//         controller.enqueue(chunkData);
//       }
//       controller.close();
//     }
//   });
// }

// /**
//  * Generator function that streams the response body from a fetch request.
//  */
// export async function* streamingFetch(input: RequestInfo | URL, init?: RequestInit) {

//   const response = await fetch(input, init)
//   const reader = response.body!.getReader();
//   const decoder = new TextDecoder('utf-8');

//   for (; ;) {
//     const { done, value } = await reader.read()
//     if (done) break;

//     try {
//       yield decoder.decode(value)
//     }
//     catch (e: any) {
//       console.warn(e.message)
//     }

//   }
// }