// *********************
// Role of the component: Hot Deals section displaying featured products
// Name of the component: HotDeals.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HotDeals />
// Input parameters: no input parameters
// Output: Hot deals section with 6 products and view all button
// *********************

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFire, FaArrowRight } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  price: number;
  mainImage: string;
  slug: string;
  description: string;
}

const HotDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch hot deals (recent products)
  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        const data = await response.json();
        // Get the 6 most recent products for hot deals
        const hotDeals = data
          .sort((a: Product, b: Product) => b.id - a.id)
          .slice(0, 6);
        setProducts(hotDeals);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot deals:", error);
        setLoading(false);
      }
    };

    fetchHotDeals();
  }, []);

  if (loading) {
    return (
      <div className="bg-mopao-grey py-16">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mopao-green mx-auto"></div>
            <p className="text-mopao-text mt-4 font-roboto">Loading hot deals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-mopao-grey py-16">
      <div className="max-w-screen-2xl mx-auto px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-x-3">
            <FaFire className="text-red-500 text-2xl hot-pulse" />
            <h2 className="text-3xl font-bold text-mopao-green font-roboto">
              HOT DEALS
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="flex items-center gap-x-2 bg-mopao-green text-white px-6 py-3 rounded-lg hover:bg-mopao-text transition-all duration-300 font-roboto"
          >
            <span>View All</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-3">
              <Link href={`/product/${product.slug}`}>
                <div className="relative">
                  <Image
                    src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
                    width={200}
                    height={200}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {/* Hot Badge */}
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold hot-pulse">
                    HOT!
                  </div>
                </div>
              </Link>
              
              <div className="p-3">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-xs font-semibold text-mopao-text mb-2 hover:text-mopao-green transition-colors overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {product.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-mopao-green">
                    KSh {product.price.toLocaleString()}
                  </span>
                  
                  <Link href={`/product/${product.slug}`}>
                    <button className="bg-mopao-green text-white px-2 py-1 rounded text-xs hover:bg-mopao-text transition-colors">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotDeals; 