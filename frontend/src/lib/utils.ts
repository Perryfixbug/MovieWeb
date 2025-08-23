import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(input: string){
  return input.split(' ').map((word: string)=>(
    word[0].toUpperCase() + word.substring(1).toLowerCase()
  )).join(' ')
}