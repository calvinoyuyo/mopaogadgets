// *********************
// Role of the component: products section intended to be on the home page
// Name of the component: ProductsSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductsSection slug={slug} />
// Input parameters: no input parameters
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";

const ProductsSection = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // sending API request for getting all products
  const data = await fetch(`${API_URL}/api/products`);
  const products = await data.json();
  return (
    <div className="bg-mopao-grey border-t-4 border-mopao-green">
      <div className="max-w-screen-2xl mx-auto pt-16">
        <Heading title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-8 gap-x-1 px-8 gap-y-6 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.map((product: Product) => (
            <ProductItem key={product.id} product={product} color="black" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
