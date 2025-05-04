import { v4 as uuidv4 } from 'uuid';
import { Shop, Product, Order, Review, Report } from './types';
import { generateTrackingCode } from '@/utils/trackingCode';

export const getShops = (): Shop[] => {
  const shops = localStorage.getItem('shops');
  return shops ? JSON.parse(shops) : [];
};

export const saveShops = (shops: Shop[]) => {
  localStorage.setItem('shops', JSON.stringify(shops));
};

export const getProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const getReviews = (): Review[] => {
  const reviews = localStorage.getItem('reviews');
  return reviews ? JSON.parse(reviews) : [];
};

export const saveReviews = (reviews: Review[]) => {
  localStorage.setItem('reviews', JSON.stringify(reviews));
};

export const getReports = (): Report[] => {
  const reports = localStorage.getItem('reports');
  return reports ? JSON.parse(reports) : [];
};

export const saveReports = (reports: Report[]) => {
  localStorage.setItem('reports', JSON.stringify(reports));
};

export const initializeData = () => {
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
      createdAt: new Date('2025-04-01').toISOString(),
    },
    {
      id: uuidv4(),
      name: 'Boutique B',
      subcategories: ['Pantalons'],
      image: 'shop2.jpg',
      email: 'shop2@example.com',
      contact: '+33 1 98 76 54 32',
      description: 'Boutique de mode',
      ownerEmail: 'vendor2@example.com',
      status: 'approved',
      createdAt: new Date('2025-04-02').toISOString(),
    },
  ];
  localStorage.setItem('shops', JSON.stringify(shops));

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
      createdAt: new Date('2025-04-03').toISOString(),
      sold: 0,
    },
    {
      id: uuidv4(),
      type: 'Commercial',
      name: 'Pantalon Noir',
      description: 'Pantalon élégant noir',
      category: 'Vêtements',
      subcategory: 'Pantalons',
      weight: '0.5',
      size: 'L',
      variants: [
        {
          size: 'L',
          colors: [{ color: 'Noir', stock: '30' }],
          price: '45.00',
        },
      ],
      shopId: shops[1].id,
      expirationDate: '2025-12-31',
      ownership: 'client',
      clientEmail: 'vendor2@example.com',
      createdAt: new Date('2025-04-04').toISOString(),
      sold: 0,
    },
  ];
  localStorage.setItem('products', JSON.stringify(products));

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
      createdAt: new Date('2025-04-10').toISOString(),
      statusHistory: [
        { status: 'pending', date: new Date('2025-04-10').toISOString() },
      ],
      reviews: [],
      reports: [],
    },
    {
      id: uuidv4(),
      clientEmail: 'user@example.com',
      shopId: shops[1].id,
      products: [
        { productId: products[1].id, variantIndex: 0, quantity: 1 },
      ],
      totalAmount: 45.00,
      status: 'shipped',
      trackingCode: generateTrackingCode(),
      shippingAddress: '456 Avenue des Champs-Élysées, 75008 Paris',
      createdAt: new Date('2025-04-09').toISOString(),
      updatedAt: new Date('2025-04-11').toISOString(),
      statusHistory: [
        { status: 'pending', date: new Date('2025-04-09').toISOString() },
        { status: 'shipped', date: new Date('2025-04-11').toISOString() },
      ],
      reviews: [],
      reports: [],
    },
    {
      id: uuidv4(),
      clientEmail: 'user2@example.com',
      shopId: shops[0].id,
      products: [
        { productId: products[0].id, variantIndex: 0, quantity: 3 },
      ],
      totalAmount: 60.00,
      status: 'delivered',
      trackingCode: generateTrackingCode(),
      shippingAddress: '789 Boulevard Saint-Germain, 75006 Paris',
      createdAt: new Date('2025-04-05').toISOString(),
      updatedAt: new Date('2025-04-12').toISOString(),
      statusHistory: [
        { status: 'pending', date: new Date('2025-04-05').toISOString() },
        { status: 'shipped', date: new Date('2025-04-07').toISOString() },
        { status: 'delivered', date: new Date('2025-04-12').toISOString() },
      ],
      reviews: [],
      reports: [],
    },
    {
      id: uuidv4(),
      clientEmail: 'user2@example.com',
      shopId: shops[1].id,
      products: [
        { productId: products[1].id, variantIndex: 0, quantity: 2 },
      ],
      totalAmount: 90.00,
      status: 'canceled',
      trackingCode: generateTrackingCode(),
      shippingAddress: '101 Rue de Rivoli, 75001 Paris',
      createdAt: new Date('2025-04-08').toISOString(),
      updatedAt: new Date('2025-04-10').toISOString(),
      statusHistory: [
        { status: 'pending', date: new Date('2025-04-08').toISOString() },
        {
          status: 'canceled',
          date: new Date('2025-04-10').toISOString(),
          comment: 'Annulé par le client',
        },
      ],
      reviews: [],
      reports: [],
    },
  ];
  localStorage.setItem('orders', JSON.stringify(orders));

  localStorage.setItem('reviews', JSON.stringify([]));
  localStorage.setItem('reports', JSON.stringify([]));
};