'use client'

import { MessageSquare, TrendingUp, Users, Search } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  const handleSearch = (query: string) => {
    // Navigate to search page with query
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Discover Honest Product Reviews from{' '}
            <span className="text-primary">Reddit</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find genuine, unbiased opinions on products from real Reddit users across thousands of communities.
            No sponsored content, just honest reviews.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for any product... (e.g., iPhone 15, Tesla Model 3, Nike Air Max)"
              className="mx-auto"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/trending">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Trending Products
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories">
                <Search className="mr-2 h-5 w-5" />
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose VoicesOfReddit?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Genuine Reviews</h3>
              <p className="text-muted-foreground">
                Real opinions from actual Reddit users, not paid influencers or fake reviews.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Aggregated from hundreds of Reddit communities and specialized subreddits.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sentiment Analysis</h3>
              <p className="text-muted-foreground">
                AI-powered analysis to quickly understand overall product sentiment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Technology', count: '2.5k products', href: '/categories/technology' },
              { name: 'Home & Garden', count: '1.8k products', href: '/categories/home-garden' },
              { name: 'Fashion', count: '1.2k products', href: '/categories/fashion' },
              { name: 'Health & Beauty', count: '950 products', href: '/categories/health-beauty' },
              { name: 'Sports & Fitness', count: '800 products', href: '/categories/sports-fitness' },
              { name: 'Automotive', count: '650 products', href: '/categories/automotive' },
              { name: 'Books & Media', count: '500 products', href: '/categories/books-media' },
              { name: 'Food & Drink', count: '400 products', href: '/categories/food-drink' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="p-4 border rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Trusted by Thousands
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10k+</div>
              <div className="text-muted-foreground">Products Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500k+</div>
              <div className="text-muted-foreground">Reddit Comments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Subreddits Monitored</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25k+</div>
              <div className="text-muted-foreground">Daily Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Purchase?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of smart shoppers who trust Reddit&apos;s honest opinions.
          </p>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Start searching for products..."
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  )
}
