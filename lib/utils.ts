import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuid } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getProjectNameByNumber = (project_id: number): string => {
  switch (project_id) {
    case 1: return 'Slot Car Racing VR';
    case 2: return 'Number Ops Mobile';
    case 3: return 'Website';
    default: return 'unknown';
  }
}

export const getUpateTagProjectId = (project_id: number): string => {
  switch (project_id) {
    case 1: return 'slotcarracing';
    case 2: return 'numberops';
    case 3: return 'website';
    default: return 'unknown';
  }
}

export const getProjectNameByString = (project: string): number => {
  switch (project) {
    case 'slotcarracing':
      return 1;
    case 'numberops':
      return 2;
    case 'website':
      return 3;
    default: return 0;
  }
}

export const imageFallback = (project_id: number): string => {
  switch (project_id) {
    case 1: return '/piratecove.png';
    case 2: return '/numberopsplaceholder.png';
    case 3: return '/codeplaceholder.png';
    default: return '/codeplaceholder.png';
  }
}

export const slugify = (textToSlug: string) => {
  const withUuid = textToSlug + '-' + uuid();
  return withUuid.toLowerCase().trim().replace(/[^\w\s-]/g, '')
    .replace(/[\s_]/g, '-')
    .replace(/-+ /g, '')

}
