import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

/**
 * Format a timestamp to a readable date
 */
export function formatDate(timestamp: number | Date): string {
  const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : timestamp
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Calculate time ago from timestamp
 */
export function timeAgo(timestamp: number | Date): string {
  const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : timestamp
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`
  return `${Math.floor(diffInSeconds / 31536000)}y ago`
}

/**
 * Simple sentiment analysis based on keywords
 * Returns a score between -1 (negative) and 1 (positive)
 */
export function analyzeSentiment(text: string): number {
  const positiveWords = [
    'amazing', 'awesome', 'excellent', 'fantastic', 'great', 'love', 'perfect',
    'wonderful', 'outstanding', 'brilliant', 'superb', 'incredible', 'best',
    'recommend', 'impressed', 'satisfied', 'happy', 'pleased', 'good', 'nice',
    'solid', 'reliable', 'quality', 'worth', 'buy', 'purchase'
  ]

  const negativeWords = [
    'awful', 'terrible', 'horrible', 'bad', 'worst', 'hate', 'disappointing',
    'useless', 'broken', 'cheap', 'poor', 'waste', 'regret', 'avoid',
    'disappointed', 'frustrated', 'annoying', 'problem', 'issue', 'fail',
    'defective', 'overpriced', 'scam', 'garbage', 'trash'
  ]

  const words = text.toLowerCase().split(/\W+/)
  let positiveCount = 0
  let negativeCount = 0

  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  const totalSentimentWords = positiveCount + negativeCount
  if (totalSentimentWords === 0) return 0

  return (positiveCount - negativeCount) / totalSentimentWords
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

/**
 * Format Reddit score (upvotes) with k/M notation
 */
export function formatScore(score: number): string {
  if (score >= 1000000) {
    return `${(score / 1000000).toFixed(1)}M`
  }
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}k`
  }
  return score.toString()
}
