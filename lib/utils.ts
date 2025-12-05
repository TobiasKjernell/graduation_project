import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const projectName = (project_id: number): string => {
  switch (project_id) {
    case 1: return 'Slot Car Racing VR';
    case 2: return 'Number Ops';
    case 3: return 'Website';
    default: return 'unknown';
  }
}

export const imageFallback = (project_id: number): string => {
  switch (project_id) {
    case 1: return '/codeplaceholder.png';
    case 2: return '/numberopsplaceholder.png';
    case 3: return '/codeplaceholder.png';
    default: return '/codeplaceholder.png';
  }
}
