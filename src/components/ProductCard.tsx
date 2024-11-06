import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart } = useStore();
  const isInCart = cart.some(item => item.product.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.stock < 5 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Only {product.stock} left
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{product.reviews.length} reviews</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0 || isInCart}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : isInCart
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {product.stock === 0 ? (
              'Out of Stock'
            ) : isInCart ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {isInCart && (
          <Link
            to="/cart"
            className="mt-2 block text-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            View in Cart
          </Link>
        )}
      </div>
    </motion.div>
  );
}