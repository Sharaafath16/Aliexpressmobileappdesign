import { supabase, Review } from '../lib/supabase';

export async function getReviewsByProduct(productId: number): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
}

export async function createReview(reviewData: {
  product_id: number;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  images?: string[];
}): Promise<Review | null> {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating review:', error);
    return null;
  }

  return data;
}
