import React from 'react';
import Header from '../../components/Header/DesainHome';
import ProductCard from '../../components/Header/ProductCardHome';
import Footer from '../../components/Header/FooterHome';

const Index: React.FC = () => {
  const products = [
    { id: 1, name: 'Perfume 1', price: 50, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Perfume 2', price: 60, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Perfume 3', price: 70, imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;