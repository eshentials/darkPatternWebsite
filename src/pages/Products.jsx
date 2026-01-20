import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, getCategories } from '../data/products';
import { logTaskStart } from '../utils/dpriLogger';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  
  const categories = ['All', ...getCategories()];

  useEffect(() => {
    logTaskStart('T1', 'task1-start');
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? products 
      : products.filter(p => p.category === selectedCategory);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filtered = [...filtered].sort((a, b) => {
          const discountA = (a.originalPrice - a.price) / a.originalPrice;
          const discountB = (b.originalPrice - b.price) / b.originalPrice;
          return discountB - discountA;
        });
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50" data-task-id="T1" data-task-start="true" id="task1-start">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Products</h1>
          <p className="text-gray-600">
            Discover amazing deals on {products.length} unique items
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="w-full md:w-64">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Results count */}
        <div className="mt-8 text-center text-gray-600">
          Showing {filteredAndSortedProducts.length} products
        </div>
      </div>
    </div>
  );
};

export default Products;

