import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCardHome: React.FC<ProductCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-gray-700">${price}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCardHome;