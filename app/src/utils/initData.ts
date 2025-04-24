import { v4 as uuidv4 } from 'uuid';
import { Shop, Product, Order } from '@/types';
import { generateTrackingCode } from '@/utils/trackingCode';

export const initializeData = () => {
  // Initialize shops
  const shops: Shop[] = [
    {
      id: uuidv4(),
      name: 'Boutique A',
      subcategories: ['T-Shirts'],
      image: 'shop1.jpg',
      email: 'shop1@example.com',
      contact: '+33 1 23 45 67 89',
      description: 'Boutique de vêtements',
      ownerEmail: 'vendor@example.com',
      status: 'approved',
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem('shops', JSON.stringify(shops));

  // Initialize products
  const products: Product[] = [
    {
      id: uuidv4(),
      type: 'Commercial',
      name: 'T-Shirt Bleu',
      description: 'T-Shirt en coton bleu',
      category: 'Vêtements',
      subcategory: 'T-Shirts',
      weight: '0.2',
      size: 'M',
      variants: [
        {
          size: 'M',
          colors: [{ color: 'Bleu', stock: '50' }],
          price: '20.00',
        },
      ],
      shopId: shops[0].id,
      expirationDate: '2025-12-31',
      ownership: 'client',
      clientEmail: 'vendor@example.com',
      createdAt: new Date().toISOString(),
      sold: 0,
    },
  ];
  localStorage.setItem('products', JSON.stringify(products));

  // Initialize orders
  const orders: Order[] = [
    {
      id: uuidv4(),
      clientEmail: 'user@example.com',
      shopId: shops[0].id,
      products: [
        { productId: products[0].id, variantIndex: 0, quantity: 2 },
      ],
      totalAmount: 40.00,
      status: 'pending',
      trackingCode: generateTrackingCode(),
      shippingAddress: '123 Rue de Paris, 75001 Paris',
      createdAt: new Date().toISOString(),
      statusHistory: [
        { status: 'pending', date: new Date().toISOString() },
      ],
    },
  ];
  localStorage.setItem('orders', JSON.stringify(orders));
};