interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  score: number;
  created_utc: number;
  subreddit: string;
  permalink: string;
  url: string;
}

interface RedditComment {
  id: string;
  body: string;
  author: string;
  score: number;
  created_utc: number;
  permalink: string;
}

interface RedditSearchResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

class RedditAPI {
  private baseUrl = 'https://www.reddit.com';
  private userAgent: string;

  constructor() {
    this.userAgent = process.env.REDDIT_USER_AGENT || 'VoicesOfReddit/1.0';
  }

  /**
   * Search Reddit for posts containing product mentions
   */
  async searchPosts(query: string, subreddit?: string, limit: number = 25): Promise<RedditPost[]> {
    try {
      const searchUrl = subreddit 
        ? `${this.baseUrl}/r/${subreddit}/search.json`
        : `${this.baseUrl}/search.json`;
      
      const params = new URLSearchParams({
        q: query,
        sort: 'relevance',
        t: 'all',
        limit: limit.toString(),
        ...(subreddit && { restrict_sr: 'true' })
      });

      const response = await fetch(`${searchUrl}?${params}`, {
        headers: {
          'User-Agent': this.userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`);
      }

      const data: RedditSearchResponse = await response.json();
      return data.data.children.map(child => child.data);
    } catch (error) {
      console.error('Error searching Reddit posts:', error);
      throw error;
    }
  }

  /**
   * Get comments for a specific Reddit post
   */
  async getPostComments(subreddit: string, postId: string, limit: number = 100): Promise<RedditComment[]> {
    try {
      const url = `${this.baseUrl}/r/${subreddit}/comments/${postId}.json?limit=${limit}`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Reddit returns an array where [0] is the post, [1] is comments
      const commentsData = data[1]?.data?.children || [];
      
      return commentsData
        .filter((child: any) => child.data.body && child.data.body !== '[deleted]')
        .map((child: any) => ({
          id: child.data.id,
          body: child.data.body,
          author: child.data.author,
          score: child.data.score,
          created_utc: child.data.created_utc,
          permalink: child.data.permalink,
        }));
    } catch (error) {
      console.error('Error fetching Reddit comments:', error);
      throw error;
    }
  }

  /**
   * Get trending posts from specific subreddits
   */
  async getTrendingPosts(subreddits: string[], limit: number = 10): Promise<RedditPost[]> {
    try {
      const allPosts: RedditPost[] = [];
      
      for (const subreddit of subreddits) {
        const url = `${this.baseUrl}/r/${subreddit}/hot.json?limit=${limit}`;
        
        const response = await fetch(url, {
          headers: {
            'User-Agent': this.userAgent,
          },
        });

        if (response.ok) {
          const data: RedditSearchResponse = await response.json();
          allPosts.push(...data.data.children.map(child => child.data));
        }
      }

      // Sort by score and return top posts
      return allPosts
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      throw error;
    }
  }

  /**
   * Extract product mentions from text using simple keyword matching
   * This is a basic implementation - can be enhanced with NLP later
   */
  extractProductMentions(text: string, productKeywords: string[]): boolean {
    const lowerText = text.toLowerCase();
    return productKeywords.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
  }
}

export const redditAPI = new RedditAPI();

// Popular subreddits for product reviews and discussions
export const PRODUCT_SUBREDDITS = [
  'BuyItForLife',
  'reviews',
  'ProductPorn',
  'shutupandtakemymoney',
  'gadgets',
  'technology',
  'buildapc',
  'MechanicalKeyboards',
  'headphones',
  'audiophile',
  'skincareaddiction',
  'malefashionadvice',
  'femalefashionadvice',
  'fitness',
  'homegym',
  'cooking',
  'buyitforlife',
];

export type { RedditPost, RedditComment };
