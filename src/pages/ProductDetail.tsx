import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Star, 
  Heart,
  Share2,
  ChevronRight,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const tabs = ['Description', 'Specifications', 'Reviews'];

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return <div>Product not found</div>;

  const images = [product.image, ...Array(3).fill(product.image)]; // Simulated multiple images
  const colors = ['Red', 'Blue', 'Black', 'White']; // Example colors
  const sizes = ['S', 'M', 'L', 'XL']; // Example sizes
  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <Link to="/products" className="text-gray-500 hover:text-indigo-600">Products</Link>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                  selectedImage === index ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < averageRating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews.length} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-500">SKU: {product.id}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="text-3xl font-bold text-indigo-600 mb-6">
            ${product.price.toFixed(2)}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Color</h3>
            <div className="flex space-x-3">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-indigo-600'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
            <div className="flex space-x-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
                    selectedSize === size
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Add to Cart
            </button>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            {[
              { icon: Truck, text: 'Free shipping on orders over $100' },
              { icon: ShieldCheck, text: 'Secure payment & money-back guarantee' },
              { icon: RefreshCw, text: '30-day return policy' },
            ].map((item, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <item.icon className="h-5 w-5 text-gray-400 mr-3" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'Description' && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'Specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Example specifications */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-b border-gray-200 pb-4">
                  <dt className="font-medium text-gray-900 mb-1">
                    Specification {i + 1}
                  </dt>
                  <dd className="text-gray-600">
                    Example specification detail information
                  </dd>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="space-y-8">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-4 text-sm text-gray-600">
                      {review.userName}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}