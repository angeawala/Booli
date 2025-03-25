export interface Subscription {
    id: string;
    user: string;
    code_verification: string;
    is_active: boolean;
    start_date: string;
    end_date: string;
    device_token: string;
  }