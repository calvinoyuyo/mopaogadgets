// *********************
// Role of the component: Product item component 
// Name of the component: ProductItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductItem product={product} color={color} />
// Input parameters: { product: Product; color: string; }
// Output: Product item component that contains product image, title, link to the single product page, price, button...
// *********************

import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductItemRating from "./ProductItemRating";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-4">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={
            product.mainImage
              ? `/${product.mainImage}`
              : "/product_placeholder.jpg"
          }
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto h-[180px] rounded-lg object-cover"
          alt={product?.title}
        />
      </Link>
      <Link
        href={`/product/${product.slug}`}
        className={
          color === "black"
            ? `text-sm text-black font-normal mt-2 uppercase text-center`
            : `text-sm text-white font-normal mt-2 uppercase text-center`
        }
      >
        {product.title}
      </Link>
      <p
        className={
          color === "black"
            ? "text-sm text-black font-semibold"
            : "text-sm text-white font-semibold"
        }
      >
        KSh {product.price}
      </p>

      <ProductItemRating productRating={product?.rating} />
      
      <Link
        href={`/product/${product?.slug}`}
        className="block flex justify-center items-center w-full uppercase bg-mopao-green text-white px-3 py-2 rounded-lg text-xs border border-mopao-green font-bold shadow-sm hover:bg-mopao-text transition-all duration-300"
      >
        <p>View product</p>
      </Link>
    </div>
  );
};

export default ProductItem;
