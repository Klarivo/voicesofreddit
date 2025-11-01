import { NextResponse } from 'next/server'
import { getTrendingMockProducts } from '@/lib/mock-data'

export async function GET() {
  try {
    // For now, use mock data. In production, this would fetch from Reddit
    const trendingProducts = getTrendingMockProducts()
    return NextResponse.json({
      products: trendingProducts,
      total: trendingProducts.length,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Trending API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending products' },
      { status: 500 }
    )
  }
}
