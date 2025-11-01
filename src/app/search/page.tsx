'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchBar } from '@/components/search-bar'
import { ProductCard } from '@/components/product-card'
import { ProductWithRedditData } from '@/types'
import { Loader2, Filter, SortAsc, Grid, List, Sparkles, TrendingUp, Clock, Star, AlertCircle, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<ProductWithRedditData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortBy, setSortBy] = useState<'relevance' | 'sentiment' | 'mentions' | 'recent'>('relevance')
  const [filterSentiment, setFilterSentiment] = useState<'all' | 'positive' | 'negative' | 'mixed'>('all')

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setQuery(searchQuery)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=10`)
      if (!response.ok) {
        throw new Error('Search failed')
      }
      
      const data = await response.json() as { products: ProductWithRedditData[] }
      setProducts(data.products || [])
    } catch (err) {
      setError('Failed to search products. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Search on initial load if query exists
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      if (filterSentiment === 'all') return true
      const sentiment = product.averageSentiment || 0
      if (filterSentiment === 'positive') return sentiment > 0.1
      if (filterSentiment === 'negative') return sentiment < -0.1
      if (filterSentiment === 'mixed') return sentiment >= -0.1 && sentiment <= 0.1
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'sentiment':
          return (b.averageSentiment || 0) - (a.averageSentiment || 0)
        case 'mentions':
          return (b.totalMentions || 0) - (a.totalMentions || 0)
        case 'recent':
          const aDate = a.redditContent?.[0]?.createdAt || new Date(0)
          const bDate = b.redditContent?.[0]?.createdAt || new Date(0)
          return new Date(bDate).getTime() - new Date(aDate).getTime()
        default:
          return 0 // relevance (default order from API)
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 mb-6 shadow-lg">
              <Search className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Search</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Find Honest Reviews
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Search through thousands of genuine Reddit discussions to find the truth about any product
            </p>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                defaultValue={query}
                placeholder="Search for any product... iPhone, Tesla, MacBook"
                className="mx-auto"
              />
            </div>
          </div>

          {/* Filters and Controls */}
          {(products.length > 0 || query) && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Results Count */}
                <div className="flex items-center gap-3">
                  {query && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {filteredAndSortedProducts.length} results for &quot;{query}&quot;
                      </span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Sentiment Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select
                      value={filterSentiment}
                      onChange={(e) => setFilterSentiment(e.target.value as 'all' | 'positive' | 'negative' | 'mixed')}
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Sentiment</option>
                      <option value="positive">Positive</option>
                      <option value="negative">Negative</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'relevance' | 'sentiment' | 'mentions' | 'recent')}
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="sentiment">Sentiment</option>
                      <option value="mentions">Most Mentions</option>
                      <option value="recent">Most Recent</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                  <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-600/20"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Searching Reddit...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                  Analyzing thousands of discussions across Reddit communities to find honest opinions about your search.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Search Failed
                </h3>
                <p className="text-red-600 dark:text-red-400 mb-6 max-w-md">
                  {error}
                </p>
                <Button 
                  onClick={() => handleSearch(query)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {!loading && !error && filteredAndSortedProducts.length > 0 && (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && query && filteredAndSortedProducts.length === 0 && products.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No results match your filters
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your sentiment filter or sort options to see more results.
                </p>
                <Button 
                  onClick={() => {
                    setFilterSentiment('all')
                    setSortBy('relevance')
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {/* No Results - No Products Found */}
          {!loading && !error && query && products.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  We couldn&apos;t find any Reddit discussions about &quot;{query}&quot;. Try a different search term or check your spelling.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Popular searches:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['iPhone 15', 'MacBook Air', 'Tesla Model 3', 'Nike Air Max', 'Gaming Chair'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSearch(suggestion)}
                        className="px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Initial State */}
          {!loading && !error && !query && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
              <div className="text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Start Your Search Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                  Enter a product name above to discover honest Reddit reviews and discussions from real users.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Real Opinions</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Genuine reviews from actual Reddit users, not paid promotions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">AI Analysis</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Smart sentiment analysis across thousands of discussions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Always Updated</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Fresh data from the latest Reddit conversations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Find Honest Reviews
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Search through thousands of genuine Reddit discussions
              </p>
              <SearchBar 
                onSearch={() => {}}
                placeholder="Search for any product..."
                className="mx-auto"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
                <span className="text-gray-600 dark:text-gray-400">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
