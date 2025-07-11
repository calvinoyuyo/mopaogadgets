// *********************
// Role of the component: Dynamic hero component that displays recent products as hot items
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 2.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Dynamic hero component with rotating product carousel
// *********************

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFire, FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  price: number;
  mainImage: string;
  slug: string;
  description: string;
}

const Hero = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch recent products
  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        const data = await response.json();
        // Sort by ID in descending order to get the most recent products
        const recentProducts = data
          .sort((a: Product, b: Product) => b.id - a.id)
          .slice(0, 5);
        setProducts(recentProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchRecentProducts();
  }, []);

  // Auto-rotate carousel every 15 seconds
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [products.length]);

  // Manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="h-[560px] w-full bg-mopao-bg max-lg:h-[720px] max-md:h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mopao-green mx-auto"></div>
          <p className="text-mopao-text mt-4 font-roboto">Loading hot products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="h-[560px] w-full bg-mopao-bg max-lg:h-[720px] max-md:h-[600px]">
        <div className="grid grid-cols-3 items-center justify-items-center px-8 gap-x-8 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-8 max-lg:gap-y-8">
          <div className="flex flex-col gap-y-4 max-lg:order-last col-span-2">
            <h1 className="text-5xl text-mopao-green font-bold mb-2 max-xl:text-4xl max-md:text-3xl max-sm:text-2xl font-roboto">
              PREMIUM GADGETS FOR EVERYONE
            </h1>
            <p className="text-mopao-text max-sm:text-sm font-roboto">
              Discover the latest in technology with our premium selection of gadgets and electronics. 
              Quality products at competitive prices, delivered right to your doorstep.
            </p>
            <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
              <Link href="/shop">
                <button className="bg-mopao-green text-white font-bold px-10 py-2 max-lg:text-lg max-sm:text-base hover:bg-mopao-text font-roboto">
                  SHOP NOW
                </button>
              </Link>
              <button className="bg-mopao-grey text-mopao-green font-bold px-10 py-2 max-lg:text-lg max-sm:text-base hover:bg-mopao-green hover:text-white font-roboto">
                LEARN MORE
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-y-4 max-lg:order-first">
            <Image
              src="/logo.png"
              width={300}
              height={300}
              alt="Mopao! logo"
              className="w-auto h-auto max-lg:w-64 max-md:w-48"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="h-[560px] w-full bg-mopao-bg max-lg:h-[720px] max-md:h-[600px] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-mopao-green/10 to-mopao-grey/10"></div>
      
      <div className="grid grid-cols-3 items-center justify-items-center px-8 gap-x-8 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-8 max-lg:gap-y-8 relative z-10">
        <div className="flex flex-col gap-y-4 max-lg:order-last col-span-2" key={`content-${currentIndex}`}>
          {/* Hot Badge */}
          <div className="flex items-center gap-x-2 mb-2 hero-fade-in">
            <FaFire className="text-red-500 text-xl hot-pulse" />
            <span className="text-red-500 font-bold text-lg font-roboto">HOT IN THE MARKET!</span>
          </div>
          
          <h1 className="text-5xl text-mopao-green font-bold mb-2 max-xl:text-4xl max-md:text-3xl max-sm:text-2xl font-roboto hero-fade-in">
            {currentProduct.title.toUpperCase()}
          </h1>
          
          <p className="text-mopao-text max-sm:text-sm font-roboto overflow-hidden text-ellipsis hero-fade-in" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {currentProduct.description || "Discover the latest in technology with our premium selection of gadgets and electronics."}
          </p>
          
          <div className="text-2xl font-bold text-mopao-green mb-4 font-roboto hero-fade-in">
            KSh {currentProduct.price.toLocaleString()}
          </div>
          
          <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1 hero-fade-in">
            <Link href={`/product/${currentProduct.slug}`}>
              <button className="bg-mopao-green text-white font-bold px-10 py-2 max-lg:text-lg max-sm:text-base hover:bg-mopao-text font-roboto transition-all duration-300 transform hover:scale-105">
                BUY NOW
              </button>
            </Link>
            <Link href="/shop">
              <button className="bg-mopao-grey text-mopao-green font-bold px-10 py-2 max-lg:text-lg max-sm:text-base hover:bg-mopao-green hover:text-white font-roboto transition-all duration-300">
                VIEW ALL
              </button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-y-4 max-lg:order-first relative" key={`image-${currentIndex}`}>
          {/* Product Image */}
          <div className="relative group hero-slide-in">
            <Image
              src={currentProduct.mainImage ? `/${currentProduct.mainImage}` : "/product_placeholder.jpg"}
              width={400}
              height={400}
              alt={currentProduct.title}
              className="w-auto h-auto max-lg:w-64 max-md:w-48 rounded-lg shadow-lg transition-all duration-500 transform group-hover:scale-105"
              priority
            />
            {/* Hot overlay */}
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold hot-pulse">
              HOT!
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-mopao-green p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
        aria-label="Previous product"
      >
        <FaArrowLeft className="text-xl" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-mopao-green p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
        aria-label="Next product"
      >
        <FaArrowRight className="text-xl" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-x-2 z-20">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-mopao-green scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-20">
        <div 
          className="h-full bg-mopao-green transition-all duration-1000 ease-linear"
          style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Hero;
