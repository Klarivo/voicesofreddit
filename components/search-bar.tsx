'use client'

import { useState } from 'react'
import { Search, Sparkles, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
  defaultValue?: string
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search for products...", 
  className,
  defaultValue = ""
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const suggestions = [
    "iPhone 15 Pro",
    "Tesla Model 3", 
    "MacBook Air M3",
    "Nike Air Max",
    "Sony WH-1000XM5"
  ]

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <form onSubmit={handleSubmit} className="relative group">
        {/* Gradient border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative flex bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Icon */}
          <div className="flex items-center pl-6">
            <Search className={cn(
              "h-5 w-5 transition-colors duration-200",
              isFocused ? "text-blue-600" : "text-gray-400"
            )} />
          </div>
          
          {/* Input Field */}
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 border-0 bg-transparent px-4 py-4 text-lg placeholder:text-gray-400 focus:ring-0 focus:outline-none"
          />
          
          {/* Search Button */}
          <Button 
            type="submit" 
            disabled={!query.trim()}
            className="m-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* AI Badge */}
        <div className="flex items-center justify-center mt-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 text-xs">
            <Sparkles className="h-3 w-3 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">AI-Powered Reddit Analysis</span>
          </div>
        </div>
      </form>

      {/* Quick Suggestions */}
      {!query && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion)
                  onSearch(suggestion)
                }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200"
              >
                <TrendingUp className="h-3 w-3" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
