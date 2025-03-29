import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import GithubSlugger from 'github-slugger'

const slugger = new GithubSlugger()
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function slugify(text: string): string {
  return encodeURIComponent(slugger.slug(text));
}

