import { ProductWithRedditData } from '@/types'

// Mock data for testing the application
export const mockProducts: ProductWithRedditData[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Technology',
    description: 'Latest iPhone with titanium design and advanced camera system',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    slug: 'iphone-15-pro',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    averageSentiment: 0.7,
    totalMentions: 45,
    topSubreddits: ['apple', 'iphone', 'technology'],
    redditContent: [
      {
        id: '1',
        redditId: 'abc123',
        productId: 'iphone-15-pro',
        subreddit: 'apple',
        title: 'iPhone 15 Pro Review - Worth the Upgrade?',
        content: 'Just got my iPhone 15 Pro and I have to say, the camera improvements are incredible. The titanium build feels premium and the battery life is noticeably better than my 14 Pro.',
        author: 'techreviewguy',
        score: 234,
        url: 'https://reddit.com/r/apple/comments/abc123',
        permalink: '/r/apple/comments/abc123/iphone_15_pro_review/',
        createdAt: new Date('2024-01-15'),
        fetchedAt: new Date('2024-01-15'),
        sentimentScore: 0.8,
      },
      {
        id: '2',
        redditId: 'def456',
        productId: 'iphone-15-pro',
        subreddit: 'iphone',
        title: 'iPhone 15 Pro overheating issues?',
        content: 'Anyone else experiencing overheating with their iPhone 15 Pro? Mine gets pretty warm during gaming and video recording.',
        author: 'mobilegamer',
        score: 89,
        url: 'https://reddit.com/r/iphone/comments/def456',
        permalink: '/r/iphone/comments/def456/iphone_15_pro_overheating/',
        createdAt: new Date('2024-01-10'),
        fetchedAt: new Date('2024-01-10'),
        sentimentScore: -0.3,
      }
    ]
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Technology',
    description: 'Ultra-thin laptop with M3 chip for exceptional performance and battery life',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    slug: 'macbook-air-m3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    averageSentiment: 0.85,
    totalMentions: 67,
    topSubreddits: ['apple', 'macbook', 'laptops'],
    redditContent: [
      {
        id: '3',
        redditId: 'ghi789',
        productId: 'macbook-air-m3',
        subreddit: 'apple',
        title: 'MacBook Air M3 - Perfect for developers',
        content: 'Been using the MacBook Air M3 for development work and it handles everything I throw at it. Xcode, Docker, multiple browsers - no slowdown. Battery lasts all day.',
        author: 'devlife',
        score: 156,
        url: 'https://reddit.com/r/apple/comments/ghi789',
        permalink: '/r/apple/comments/ghi789/macbook_air_m3_perfect/',
        createdAt: new Date('2024-01-12'),
        fetchedAt: new Date('2024-01-12'),
        sentimentScore: 0.9,
      }
    ]
  },
  {
    id: 'tesla-model-3',
    name: 'Tesla Model 3',
    brand: 'Tesla',
    category: 'Automotive',
    description: 'Electric sedan with autopilot and over-the-air updates',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=400&fit=crop',
    slug: 'tesla-model-3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    averageSentiment: 0.6,
    totalMentions: 123,
    topSubreddits: ['teslamotors', 'electricvehicles', 'cars'],
    redditContent: [
      {
        id: '4',
        redditId: 'jkl012',
        productId: 'tesla-model-3',
        subreddit: 'teslamotors',
        title: '6 months with Model 3 - honest review',
        content: 'Love the tech and efficiency, but build quality issues are frustrating. Panel gaps and paint imperfections. Service experience has been mixed.',
        author: 'evowner',
        score: 445,
        url: 'https://reddit.com/r/teslamotors/comments/jkl012',
        permalink: '/r/teslamotors/comments/jkl012/6_months_model_3/',
        createdAt: new Date('2024-01-08'),
        fetchedAt: new Date('2024-01-08'),
        sentimentScore: 0.2,
      }
    ]
  }
]

export function searchMockProducts(query: string): ProductWithRedditData[] {
  const lowerQuery = query.toLowerCase()
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand?.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.description?.toLowerCase().includes(lowerQuery)
  )
}

export function getTrendingMockProducts(): ProductWithRedditData[] {
  return mockProducts
    .sort((a, b) => (b.totalMentions || 0) - (a.totalMentions || 0))
    .slice(0, 10)
}
