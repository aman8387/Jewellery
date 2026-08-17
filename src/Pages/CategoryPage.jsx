import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';

export default function CategoryPage() {
  // Captures ":categoryName" from the URL (e.g., 'rings', 'necklaces')
  const { categoryName } = useParams();

  // Filter products matching the URL parameter
  const filteredProducts = products.filter(
    (item) => item.category === categoryName.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-stone-800 capitalize mb-8">
        {categoryName} Collection
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-stone-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-stone-200 p-4 rounded">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover mb-4" 
              />
              <h2 className="text-sm font-semibold text-stone-700">{product.name}</h2>
              <p className="text-xs text-stone-500 mt-1">{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}