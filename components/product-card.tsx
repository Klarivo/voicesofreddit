'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { ProductWithRedditData } from '@/types'
import { formatScore, timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: ProductWithRedditData
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const sentimentColor = product.averageSentiment 
    ? product.averageSentiment > 0.1 
      ? 'text-green-600' 
      : product.averageSentiment < -0.1 
        ? 'text-red-600' 
        : 'text-yellow-600'
    : 'text-gray-500'

  const SentimentIcon = product.averageSentiment 
    ? product.averageSentiment > 0.1 
      ? TrendingUp 
      : product.averageSentiment < -0.1 
        ? TrendingDown 
        : MessageCircle
    : MessageCircle

  return (
    <Link href={`/products/${product.slug}`}>
      <div className={cn(
        "group cursor-pointer rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/20",
        className
      )}>
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted">
                <span className="text-xs text-muted-foreground">No Image</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                  {product.name}
                </h3>
                {product.brand && (
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                )}
                {product.category && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-secondary rounded-full">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Sentiment Indicator */}
              <div className={cn("flex items-center gap-1 text-sm", sentimentColor)}>
                <SentimentIcon className="h-4 w-4" />
                <span className="font-medium">
                  {product.averageSentiment 
                    ? product.averageSentiment > 0.1 
                      ? 'Positive' 
                      : product.averageSentiment < -0.1 
                        ? 'Negative' 
                        : 'Mixed'
                    : 'No Data'
                  }
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Reddit Stats */}
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{product.totalMentions || 0} mentions</span>
              </div>
              
              {product.topSubreddits && product.topSubreddits.length > 0 && (
                <div className="flex items-center gap-1">
                  <span>Popular in:</span>
                  <span className="font-medium">
                    r/{product.topSubreddits[0]}
                    {product.topSubreddits.length > 1 && ` +${product.topSubreddits.length - 1}`}
                  </span>
                </div>
              )}
            </div>

            {/* Latest Reddit Activity */}
            {product.redditContent && product.redditContent.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                Latest mention: {timeAgo(product.redditContent[0].createdAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
