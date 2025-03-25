export interface Customer {
    id: string;
    email: string;
    phone?: string;
    address?: string;
    orders_count: number;
    created_at: string;
  }