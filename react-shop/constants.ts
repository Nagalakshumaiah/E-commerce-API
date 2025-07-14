
import type { Product, User } from './types';
import { Role } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', role: Role.ADMIN },
  { id: 2, username: 'customer', role: Role.CUSTOMER },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic Leather Watch',
    category: 'Accessories',
    price: 12999,
    imageUrl: 'https://gradoutlet.com/wp-content/uploads/2020/08/sm-Casual-Leather-1.jpg',
    description: 'A timeless piece that complements any outfit. Genuine leather strap and stainless steel case.',
  },
  {
    id: 2,
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 7999,
    imageUrl: 'https://m.media-amazon.com/images/I/71nwl7hQRyL._AC_SL1500_.jpg',
    description: 'Immersive sound quality with noise-cancellation. Up to 20 hours of battery life.',
  },
  {
    id: 3,
    name: 'Modern Ceramic Vase',
    category: 'Home Goods',
    price: 3499,
    imageUrl: 'https://m.media-amazon.com/images/I/61bRwdMT1SL._AC_SL1500_.jpg',
    description: 'A minimalist ceramic vase to beautify your living space. Perfect for single stems or small bouquets.',
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 19999,
    imageUrl: 'https://m.media-amazon.com/images/I/71HqM2Ui7bL._AC_SL1500_.jpg',
    description: 'Support your back with this adjustable ergonomic chair, designed for long hours of comfort.',
  },
  {
    id: 5,
    name: 'Organic Green Tea Set',
    category: 'Groceries',
    price: 1999,
    imageUrl: 'https://extranaturecare.com/wp-content/uploads/2022/04/Bigelow-Premium-Organic-Green-Tea.jpg',
    description: 'A curated set of premium organic green teas, sourced from the finest gardens.',
  },
  {
    id: 6,
    name: 'Running Shoes',
    category: 'Apparel',
    price: 8999,
    imageUrl: 'https://media.gq.com/photos/63eba1b2275d2fef78a425c2/16:9/w_2560%2Cc_limit/nike-running-shoes-streakfly-invincible.jpg',
    description: 'Lightweight and responsive running shoes for your daily jog or marathon training.',
  },
  {
    id: 7,
    name: 'Hardcover Notebook',
    category: 'Stationery',
    price: 499,
    imageUrl: 'https://m.media-amazon.com/images/S/aplus-seller-content-images-us-east-1/ATVPDKIKX0DER/A3IJRFOZ0E34G4/B01NAT49WS/casy1O32Rv6d._UX970_TTW__.jpg',
    description: 'A durable hardcover notebook with 200 lined pages, perfect for journaling or note-taking.',
  },
  {
    id: 8,
    name: 'Stainless Steel Water Bottle',
    category: 'Accessories',
    price: 999,
    imageUrl: 'https://m.media-amazon.com/images/I/61Qq5V++7oL._SL1200_.jpg',
    description: 'Keep your drinks cold for 24 hours or hot for 12. BPA-free and eco-friendly.',
  },
  {
    id: 9,
    name: 'Smart Home Hub',
    category: 'Electronics',
    price: 9999,
    imageUrl: 'https://cdn.mos.cms.futurecdn.net/aQZKpJhbFC2qvztDL4dktC-1200-80.jpg',
    description: 'Control all your smart devices from one central hub with voice commands.',
  },
  {
    id: 10,
    name: 'Gourmet Coffee Beans',
    category: 'Groceries',
    price: 799,
    imageUrl: 'https://oldeworldcoffee.com/wp-content/uploads/2022/08/coffee-beans-and-cup-of-coffee-1030x687.png',
    description: 'A 12oz bag of single-origin arabica coffee beans with notes of chocolate and citrus.',
  },
  {
    id: 11,
    name: 'Yoga Mat',
    category: 'Sports',
    price: 2499,
    imageUrl: 'https://cfmnl.com/public/blog/the-best-cheap-yoga-mats.jpeg',
    description: 'Eco-friendly, non-slip yoga mat for a perfect and comfortable practice.',
  },
  {
    id: 12,
    name: 'Designer Sunglasses',
    category: 'Accessories',
    price: 14999,
    imageUrl: 'https://i5.walmartimages.com/asr/20f3090b-fac2-49f7-a202-7ec84ee6e2af.48c2f60cab16523787f9a0a5c68fa185.jpeg',
    description: 'Stylish sunglasses with 100% UV protection. Look cool and protect your eyes.',
  },
];
