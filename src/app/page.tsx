'use client'

import { MessageSquare, TrendingUp, Users, Search, Star, Shield, Zap, ArrowRight, Sparkles, Award, Target } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  const handleSearch = (query: string) => {
    // Navigate to search page with query
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 mb-8 shadow-lg">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Trusted by 50,000+ smart shoppers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Discover Honest
              <br />
              <span className="relative">
                Product Reviews
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400" viewBox="0 0 300 12" fill="none">
                  <path d="M1 6C50 1 150 1 200 6C250 11 290 11 299 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Find genuine, unbiased opinions from real Reddit users across thousands of communities. 
              <span className="font-semibold text-gray-800 dark:text-gray-200"> No sponsored content, just honest reviews.</span>
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="relative">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search any product... iPhone 15, Tesla Model 3, Nike Air Max"
                  className="mx-auto shadow-2xl"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                ✨ Powered by AI sentiment analysis across 150+ subreddits
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/trending" className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  View Trending Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/categories" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: '500K+', label: 'Reddit Comments', icon: MessageSquare },
                { number: '150+', label: 'Subreddits', icon: Users },
                { number: '10K+', label: 'Products', icon: Star },
                { number: '99.9%', label: 'Uptime', icon: Shield }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Choose VoicesOfReddit?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We aggregate millions of authentic Reddit discussions to give you the most honest product insights available anywhere.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Genuine Reviews',
                  description: 'Real opinions from actual Reddit users, not paid influencers or fake reviews. Every review is verified and authentic.',
                  color: 'from-green-400 to-emerald-600'
                },
                {
                  icon: Users,
                  title: 'Community Driven',
                  description: 'Aggregated from hundreds of Reddit communities and specialized subreddits where real users share honest experiences.',
                  color: 'from-blue-400 to-cyan-600'
                },
                {
                  icon: Zap,
                  title: 'AI-Powered Analysis',
                  description: 'Advanced sentiment analysis and machine learning to instantly understand overall product sentiment and trends.',
                  color: 'from-purple-400 to-pink-600'
                }
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 rounded-2xl blur"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Popular Categories
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Explore thousands of products across every category imaginable
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Technology', count: '2.5k products', href: '/categories/technology', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
                { name: 'Home & Garden', count: '1.8k products', href: '/categories/home-garden', emoji: '🏠', color: 'from-green-500 to-emerald-500' },
                { name: 'Fashion', count: '1.2k products', href: '/categories/fashion', emoji: '👗', color: 'from-pink-500 to-rose-500' },
                { name: 'Health & Beauty', count: '950 products', href: '/categories/health-beauty', emoji: '💄', color: 'from-purple-500 to-violet-500' },
                { name: 'Sports & Fitness', count: '800 products', href: '/categories/sports-fitness', emoji: '🏋️', color: 'from-orange-500 to-red-500' },
                { name: 'Automotive', count: '650 products', href: '/categories/automotive', emoji: '🚗', color: 'from-gray-500 to-slate-500' },
                { name: 'Books & Media', count: '500 products', href: '/categories/books-media', emoji: '📚', color: 'from-indigo-500 to-blue-500' },
                { name: 'Food & Drink', count: '400 products', href: '/categories/food-drink', emoji: '🍕', color: 'from-yellow-500 to-orange-500' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 rounded-2xl blur"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <span className="text-2xl">{category.emoji}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{category.count}</p>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Award className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Trusted by Smart Shoppers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Join thousands who make better purchasing decisions with our Reddit-powered insights
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '50K+', label: 'Active Users', icon: Users },
                { number: '1M+', label: 'Reviews Analyzed', icon: MessageSquare },
                { number: '99%', label: 'Accuracy Rate', icon: Target },
                { number: '24/7', label: 'Data Updates', icon: Zap }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to Make Smarter Purchases?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join the community of informed shoppers who trust Reddit&apos;s honest opinions over marketing hype.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Start your search journey..."
                className="mx-auto shadow-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                <Link href="/trending" className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Explore Trending Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 shadow-xl">
                <Link href="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
