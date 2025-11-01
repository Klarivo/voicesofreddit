'use client'

import Link from 'next/link'
import { ExternalLink, MessageCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { RedditContent } from '@/types'
import { formatScore, timeAgo, truncateText } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface RedditPostCardProps {
  post: RedditContent
  className?: string
  showProduct?: boolean
}

export function RedditPostCard({ post, className, showProduct = false }: RedditPostCardProps) {
  const sentimentColor = post.sentimentScore 
    ? post.sentimentScore > 0.1 
      ? 'text-green-600' 
      : post.sentimentScore < -0.1 
        ? 'text-red-600' 
        : 'text-yellow-600'
    : 'text-gray-500'

  const SentimentIcon = post.sentimentScore 
    ? post.sentimentScore > 0.1 
      ? TrendingUp 
      : post.sentimentScore < -0.1 
        ? TrendingDown 
        : Minus
    : Minus

  const redditUrl = `https://reddit.com${post.permalink}`

  return (
    <div className={cn(
      "rounded-lg border bg-card p-4 shadow-sm",
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-primary">r/{post.subreddit}</span>
          <span>•</span>
          <span>u/{post.author}</span>
          <span>•</span>
          <span>{timeAgo(post.createdAt)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sentiment */}
          <div className={cn("flex items-center gap-1 text-sm", sentimentColor)}>
            <SentimentIcon className="h-4 w-4" />
          </div>
          
          {/* Score */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>{formatScore(post.score)}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      {post.title && (
        <h4 className="font-semibold mb-2 text-foreground">
          {post.title}
        </h4>
      )}

      {/* Content */}
      <div className="text-sm text-muted-foreground mb-3">
        <p className="whitespace-pre-wrap">
          {truncateText(post.content, 300)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>Reddit Discussion</span>
          </div>
        </div>

        <Link 
          href={redditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <span>View on Reddit</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
