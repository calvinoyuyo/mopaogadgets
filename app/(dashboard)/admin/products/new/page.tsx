"use client";
import { DashboardSidebar } from "@/components";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
  }>({
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const addProduct = async () => {
    if (
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === ""
    ) {
      toast.error("Please enter values in input fields");
      return;
    }

    const requestOptions: any = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`http://localhost:3001/api/products`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw Error("There was an error while creating product");
        }
      })
      .then((data) => {
        // Upload additional images if any
        if (uploadedImages.length > 0) {
          uploadedImages.forEach((imageName, index) => {
            uploadAdditionalImage(imageName, data.id);
          });
        }
        toast.success("Product added successfully");
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: "",
        });
        setAdditionalImages([]);
        setUploadedImages([]);
      })
      .catch((error) => {
        toast.error("There was an error while creating product");
      });
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("http://localhost:3001/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("File upload unsuccessfull");
      }
    } catch (error) {
      console.error("Error happend while sending request:", error);
    }
  };

  const uploadAdditionalImage = async (imageName: string, productId: string) => {
    const formData = new FormData();
    formData.append("uploadedFile", imageName);
    formData.append("productId", productId);

    try {
      const response = await fetch("http://localhost:3001/api/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Additional image uploaded successfully");
      } else {
        console.error("Additional image upload failed");
      }
    } catch (error) {
      console.error("Error uploading additional image:", error);
    }
  };

  const handleAdditionalImageUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("http://localhost:3001/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedImages([...uploadedImages, file.name]);
        setAdditionalImages([...additionalImages, file.name]);
        toast.success("Additional image uploaded successfully");
      } else {
        toast.error("Additional image upload failed");
      }
    } catch (error) {
      toast.error("Error uploading additional image");
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = additionalImages.filter((_, i) => i !== index);
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    setAdditionalImages(newImages);
    setUploadedImages(newUploadedImages);
  };

  const fetchCategories = async () => {
    fetch(`http://localhost:3001/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: data[0]?.id,
        });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Add new product</h1>
        
        {/* Basic Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product name:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={product?.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product slug:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={convertSlugToURLFriendly(product?.slug)}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    slug: convertSlugToURLFriendly(e.target.value),
                  })
                }
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category:</span>
              </div>
              <select
                className="select select-bordered w-full"
                value={product?.categoryId}
                onChange={(e) =>
                  setProduct({ ...product, categoryId: e.target.value })
                }
              >
                {categories &&
                  categories.map((category: any) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product price:</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full"
                value={product?.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Manufacturer:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={product?.manufacturer}
                onChange={(e) =>
                  setProduct({ ...product, manufacturer: e.target.value })
                }
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Is product in stock?</span>
              </div>
              <select
                className="select select-bordered w-full"
                value={product?.inStock}
                onChange={(e) =>
                  setProduct({ ...product, inStock: Number(e.target.value) })
                }
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </label>
          </div>
        </div>

        {/* Main Image Upload */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Main Product Image</h3>
          <div className="flex items-center gap-4">
            <input
              type="file"
              className="file-input file-input-bordered file-input-lg w-full max-w-sm"
              onChange={(e: any) => {
                uploadFile(e.target.files[0]);
                setProduct({ ...product, mainImage: e.target.files[0].name });
              }}
            />
            {product?.mainImage && (
              <div className="relative">
                <Image
                  src={`/` + product?.mainImage}
                  alt={product?.title}
                  className="w-24 h-24 object-cover rounded-lg"
                  width={96}
                  height={96}
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Images Upload */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Product Images</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-sm"
                onChange={(e: any) => {
                  handleAdditionalImageUpload(e.target.files[0]);
                }}
              />
              <button
                type="button"
                className="btn btn-circle btn-sm btn-primary"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = (e: any) => {
                    handleAdditionalImageUpload(e.target.files[0]);
                  };
                  input.click();
                }}
              >
                <FaPlus />
              </button>
            </div>
            
            {/* Display uploaded additional images */}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {additionalImages.map((imageName, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={`/${imageName}`}
                      alt={`Additional image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                      width={96}
                      height={96}
                    />
                    <button
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="border-t pt-6">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Product description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              value={product?.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></textarea>
          </label>
        </div>

        <div className="flex gap-x-2">
          <button
            onClick={addProduct}
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 rounded-lg"
          >
            Add product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
