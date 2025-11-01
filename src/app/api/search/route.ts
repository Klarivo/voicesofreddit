import { NextRequest, NextResponse } from 'next/server'
import { searchMockProducts } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    // For now, use mock data. In production, this would search Reddit
    const products = searchMockProducts(query).slice(0, limit)
    return NextResponse.json({
      products,
      total: products.length,
      query,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}
