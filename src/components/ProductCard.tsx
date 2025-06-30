
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border-muted hover:border-brand-orange">
      <Link to={`/product/${product.id}`} className="flex-grow flex flex-col">
        <AspectRatio ratio={1/1}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="object-cover w-full h-full" 
          />
        </AspectRatio>
        <CardContent className="p-4 flex-grow">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'text-brand-yellow' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              {product.rating?.toFixed(1) || "New"}
            </span>
          </div>
          <h3 className="font-medium text-lg line-clamp-2 mb-2">{product.name}</h3>
          <p className="font-bold text-brand-orange">₹{product.price.toFixed(2)}</p>
          {!product.inStock && (
            <div className="mt-2 text-sm text-red-500">Out of stock</div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
