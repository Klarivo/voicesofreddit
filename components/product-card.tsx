'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, TrendingUp, Star, Users, Calendar, ExternalLink, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react'
import { ProductWithRedditData } from '@/types'
import { timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: ProductWithRedditData
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const sentimentScore = product.averageSentiment || 0
  const isPositive = sentimentScore > 0.1
  const isNegative = sentimentScore < -0.1

  const sentimentColor = isPositive 
    ? 'from-green-500 to-emerald-500' 
    : isNegative 
      ? 'from-red-500 to-rose-500' 
      : 'from-yellow-500 to-orange-500'

  const sentimentBg = isPositive 
    ? 'bg-green-50 dark:bg-green-900/20' 
    : isNegative 
      ? 'bg-red-50 dark:bg-red-900/20' 
      : 'bg-yellow-50 dark:bg-yellow-900/20'

  const sentimentText = isPositive 
    ? 'text-green-700 dark:text-green-300' 
    : isNegative 
      ? 'text-red-700 dark:text-red-300' 
      : 'text-yellow-700 dark:text-yellow-300'

  const SentimentIcon = isPositive ? ThumbsUp : isNegative ? ThumbsDown : MessageCircle

  const sentimentLabel = isPositive ? 'Positive' : isNegative ? 'Negative' : 'Mixed'
  const sentimentPercentage = Math.abs(sentimentScore * 100).toFixed(0)

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 group-hover:scale-[1.02] group-hover:border-blue-300 dark:group-hover:border-blue-600",
        className
      )}>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <div className="relative p-6">
          <div className="flex gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                ) : (
                  <div className="flex h-30 w-30 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-lg">
                    <div className="text-center">
                      <Sparkles className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">No Image</span>
                    </div>
                  </div>
                )}
                
                {/* Trending badge */}
                {product.totalMentions && product.totalMentions > 20 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    🔥 Hot
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  {product.brand && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">{product.brand}</p>
                  )}
                </div>

                {/* Sentiment Score */}
                <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm", sentimentBg)}>
                  <div className={`w-8 h-8 bg-gradient-to-r ${sentimentColor} rounded-lg flex items-center justify-center shadow-sm`}>
                    <SentimentIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={cn("text-sm font-bold", sentimentText)}>{sentimentLabel}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{sentimentPercentage}% confidence</div>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              {product.category && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
                  <Star className="h-3 w-3" />
                  {product.category}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
                  {product.description}
                </p>
              )}

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-2 mx-auto">
                    <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{product.totalMentions || 0}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Mentions</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-2 mx-auto">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{product.topSubreddits?.length || 0}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Subreddits</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg mb-2 mx-auto">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {product.redditContent && product.redditContent.length > 0 
                      ? Math.max(...product.redditContent.map(c => c.score))
                      : 0
                    }
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Top Score</div>
                </div>
              </div>

              {/* Popular Subreddits */}
              {product.topSubreddits && product.topSubreddits.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Popular in:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.topSubreddits.slice(0, 3).map((subreddit, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                      >
                        r/{subreddit}
                      </span>
                    ))}
                    {product.topSubreddits.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                        +{product.topSubreddits.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  {product.redditContent && product.redditContent.length > 0 
                    ? `Updated ${timeAgo(product.redditContent[0].createdAt)}`
                    : 'No recent activity'
                  }
                </div>
                
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                  <span>View Details</span>
                  <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover effect border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors duration-300 pointer-events-none"></div>
      </div>
    </Link>
  )
}
