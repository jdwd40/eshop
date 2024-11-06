import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User } from '../types';

interface StoreState {
  cart: CartItem[];
  user: User | null;
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback). Touch Sensor controls to pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls.",
    price: 349.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    stock: 15,
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Michael Chen",
        rating: 5,
        comment: "Best noise-canceling headphones I've ever owned. The sound quality is incredible!",
        date: "2024-02-15"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Sarah Johnson",
        rating: 4,
        comment: "Great battery life and comfortable for long listening sessions.",
        date: "2024-02-10"
      }
    ]
  },
  {
    id: "2",
    name: "Handcrafted Leather Messenger Bag",
    description: "Premium full-grain leather messenger bag, perfect for professionals. Features multiple compartments including a padded laptop sleeve fitting up to 15\" laptops. Adjustable shoulder strap, brass hardware, and water-resistant lining. Each bag develops a unique patina over time, making it truly one of a kind.",
    price: 189.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000",
    stock: 8,
    rating: 4.9,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "David Miller",
        rating: 5,
        comment: "Exceptional quality and craftsmanship. Worth every penny!",
        date: "2024-02-18"
      }
    ]
  },
  {
    id: "3",
    name: "Smart Indoor Herb Garden",
    description: "Grow fresh herbs year-round with this automated indoor garden system. Features LED grow lights, automatic watering, and smart notifications. Includes pods for basil, thyme, mint, and parsley. Perfect for urban gardeners and cooking enthusiasts. Compatible with smart home systems.",
    price: 129.99,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1585400172949-b41256d86b89?auto=format&fit=crop&q=80&w=1000",
    stock: 12,
    rating: 4.7,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Emma Wilson",
        rating: 5,
        comment: "Amazing product! Fresh herbs all year round.",
        date: "2024-02-12"
      },
      {
        id: "r5",
        userId: "u5",
        userName: "James Thompson",
        rating: 4,
        comment: "Easy to set up and maintain. Great addition to my kitchen.",
        date: "2024-02-08"
      }
    ]
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      user: null,
      products: sampleProducts, // Initialize with sample products
      searchQuery: '',
      selectedCategory: '',
      isLoading: false,
      error: null,

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.max(0, Math.min(quantity, item.product.stock)),
                }
              : item
          ).filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),
      setUser: (user) => set({ user }),
      setProducts: (products) => set({ products }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCategory: (category) => set({ selectedCategory: category }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'shopping-cart',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);