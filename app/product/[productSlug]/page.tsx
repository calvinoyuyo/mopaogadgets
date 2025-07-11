import {
  StockAvailabillity,
  UrgencyText,
  SingleProductRating,
  ProductTabs,
  SingleProductDynamicFields,
  AddToWishlistBtn,
  HotDeals,
} from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquarePinterest } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  // sending API request for a single product with a given product slug
  const data = await fetch(
    `http://localhost:3001/api/slugs/${params.productSlug}`
  );
  const product = await data.json();

  // sending API request for more than 1 product image if it exists
  const imagesData = await fetch(
    `http://localhost:3001/api/images/${product.id}`
  );
  const images = await imagesData.json();

  if (!product || product.error) {
    notFound();
  }

  // Create WhatsApp message
  const whatsappMessage = `Hello Mopao Gadgets 👋, I'm interested in:
- Product: ${product?.title}
- Price: KSh ${product?.price}
- Link: https://mopao.co.ke/product/${params.productSlug}

Is it currently available?`;

  const whatsappUrl = `https://wa.me/254726376277?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-center gap-x-16 pt-10 max-lg:flex-col items-center gap-y-5 px-5">
          <div className="max-w-md">
            {/* Main Image */}
            <div className="mb-4">
              <Image
                src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
                width={400}
                height={400}
                alt="main image"
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {images && images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {/* Main image thumbnail */}
                <div className="relative">
                  <Image
                    src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
                    width={80}
                    height={80}
                    alt="main image thumbnail"
                    className="w-full h-20 object-cover rounded-lg cursor-pointer border-2 border-mopao-green"
                  />
                </div>
                
                {/* Additional image thumbnails */}
                {images?.map((imageItem: ImageItem) => (
                  <div key={imageItem.imageID} className="relative">
                    <Image
                      src={`/${imageItem.image}`}
                      width={80}
                      height={80}
                      alt="product thumbnail"
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:border-2 hover:border-mopao-green transition-all"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-7 text-black max-[500px]:text-center">
            <SingleProductRating rating={product?.rating} />
            <h1 className="text-2xl">{product?.title}</h1>
            <p className="text-lg font-semibold">KSh{product?.price}</p>
            <StockAvailabillity stock={94} inStock={product?.inStock} />
            <SingleProductDynamicFields product={product} />
            
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center gap-x-2 font-roboto"
            >
              <FaWhatsapp className="text-xl" />
              Buy via WhatsApp
            </a>
            
            <div className="flex flex-col gap-y-2 max-[500px]:items-center">
              <AddToWishlistBtn product={product} slug={params.productSlug} />
              <p className="text-lg">
                SKU: <span className="ml-1">abccd-18</span>
              </p>
              <div className="text-lg flex gap-x-2">
                <span>Share:</span>
                <div className="flex items-center gap-x-1 text-2xl">
                  <FaSquareFacebook />
                  <FaSquareXTwitter />
                  <FaSquarePinterest />
                </div>
              </div>
              <div className="flex gap-x-2">
                <Image
                  src="/visa.svg"
                  width={50}
                  height={50}
                  alt="visa icon"
                  className="w-auto h-auto"
                />
                <Image
                  src="/mastercard.svg"
                  width={50}
                  height={50}
                  alt="mastercard icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/ae.svg"
                  width={50}
                  height={50}
                  alt="americal express icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/paypal.svg"
                  width={50}
                  height={50}
                  alt="paypal icon"
                  className="w-auto h-auto"
                />
                <Image
                  src="/dinersclub.svg"
                  width={50}
                  height={50}
                  alt="diners club icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/discover.svg"
                  width={50}
                  height={50}
                  alt="discover icon"
                  className="h-auto w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <ProductTabs product={product} />
        </div>
        
        {/* Hot Deals Section */}
        <HotDeals />
      </div>
    </div>
  );
};

export default SingleProductPage;
