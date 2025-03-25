export interface ClientDashboard {
    orders: {
      id: string;
      code: string;
      total: number;
      status: string;
    }[];
    subscription: {
      is_active: boolean;
      end_date: string;
    } | null;
    cart: {
      id: string;
      item_count: number;
    } | null;
  }
  
  export interface SellerDashboard {
    sales: {
      total: number;
      by_product: { product_id: string; amount: number }[];
    };
    low_stock: {
      product_id: string;
      stock: number;
    }[];
    product_stats: {
      product_id: string;
      views: number;
      sales: number;
    }[];
  }
  
  export interface VisitorDashboard {
    popular_products: {
      id: string;
      name: string;
      image: string;
    }[];
    recent_reviews: {
      product_id: string;
      note: number;
      commentaire: string;
    }[];
  }
  
  export interface AdminDashboard {
    total_sales: number;
    user_count: number;
    order_stats: {
      pending: number;
      shipped: number;
      delivered: number;
      cancelled: number;
    };
    review_stats: {
      total: number;
      avg_rating: number;
      by_rating: { [key: string]: number };
    };
  }