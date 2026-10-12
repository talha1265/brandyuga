export interface Lead {
  id: string;
  type: 'trial' | 'contact' | 'referral' | 'quick_consult';
  name: string;
  email: string;
  phone: string;
  service?: string;
  details?: string;
  referrer_name?: string;
  referrer_phone?: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  created_at: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  hindi_tagline: string;
  description: string;
  category: 'core' | 'creative' | 'marketing' | 'operations' | 'legal';
  icon: string;
  badge?: string;
  features: string[];
  deliverables: string[];
  order_index: number;
  is_active: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  live_url: string;
  tags: string[];
  featured: boolean;
  order_index: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  read_time: string;
  published: boolean;
  created_at: string;
}

export interface AdminStats {
  totalLeads: number;
  newLeads: number;
  trialRequests: number;
  referralRequests: number;
  contactMessages: number;
  totalProjects: number;
  totalServices: number;
  totalSubscriptions?: number;
  totalRevenue?: number;
}

export type SubscriptionPlanId = 'marketplace_duo_3m' | 'marketplace_trio_3m';

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  badge?: string;
  tagline: string;
  durationMonths: number;
  price: number; // in INR
  originalPrice?: number;
  platforms: string[]; // e.g. ['Flipkart', 'Amazon'] or ['Flipkart', 'Amazon', 'Meesho']
  features: string[];
  recommended?: boolean;
}

export interface SubscriptionOrder {
  id: string;
  txnid: string;
  planId: SubscriptionPlanId;
  planName: string;
  platforms: string[];
  durationMonths: number;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  brandName?: string;
  gstNumber?: string;
  status: 'initiated' | 'pending' | 'success' | 'failed' | 'cancelled';
  payuPaymentId?: string;
  payuMode?: 'test' | 'live' | 'simulated';
  paymentDate?: string;
  created_at: string;
}

