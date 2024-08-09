import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FileObject {
  fileName: string;
  size: string;
  date: string;
}

function sortFilesByDate(files: FileObject[]): FileObject[] {
  return files.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
  });
}

function sortFilesByName(files: FileObject[]): FileObject[] {
  return files.sort((a, b) => {
      return a.fileName.localeCompare(b.fileName);
  });
}
