import React from 'react';

const DesainHome: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Logo atau Brand di atas */}
        <h1 className="text-2xl font-bold mb-2">Perfume E-Commerce</h1>

        {/* Navigation Menu */}
        <nav className="flex justify-between w-full">
          {/* Menu Home & Products di kiri */}
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">Products</a></li>
          </ul>

          {/* Auth Menu (Sign-in & Sign-up) di kanan */}
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Sign-in</a></li>
            <li><a href="#" className="hover:text-gray-400">Sign-up</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default DesainHome;
