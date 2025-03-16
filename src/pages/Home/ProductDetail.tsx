import React from 'react';
import Header from '../../components/Header/DesainHome';
import Footer from '../../components/Header/FooterHome';

const ProductDetail: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Product Detail</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src="https://via.placeholder.com/400" alt="Product" className="w-full h-96 object-cover rounded-lg" />
          <div>
            <h3 className="text-xl font-semibold">Perfume 1</h3>
            <p className="text-gray-700">$50</p>
            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus at sapien tincidunt tincidunt.</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;