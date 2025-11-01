'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchBar } from '@/components/search-bar'
import { ProductCard } from '@/components/product-card'
import { ProductWithRedditData } from '@/types'
import { Loader2 } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<ProductWithRedditData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Products</h1>
          <p className="text-muted-foreground mb-6">
            Find honest Reddit reviews for any product
          </p>
          <SearchBar 
            onSearch={handleSearch}
            defaultValue={query}
            placeholder="Search for any product..."
            className="mx-auto"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Searching Reddit...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => handleSearch(query)}
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && products.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Found {products.length} products for "{query}"
              </h2>
            </div>
            
            <div className="grid gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && query && products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try searching for a different product or check your spelling.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Popular searches: iPhone, MacBook, Tesla, Nike shoes, Gaming chair</p>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !query && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Start your search</h3>
            <p className="text-muted-foreground">
              Enter a product name to find honest Reddit reviews and discussions.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
