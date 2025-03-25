// types/pharmacope.ts
import { BaseProduct } from '@/types/base_products'

  export interface PharmacopeProduct extends BaseProduct{
    monograph_code: string;
    purity_criteria: { [key: string]: string };
    quality_tests: { [key: string]: string };
    is_active: boolean;
    created_at: string; // ISO date
    updated_at: string; // ISO date
  }