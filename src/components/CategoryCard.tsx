
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`}>
      <Card className="hover:shadow-lg transition-shadow overflow-hidden">
        <AspectRatio ratio={16/9}>
          <img 
            src={category.image || "/placeholder.svg"} 
            alt={category.name} 
            className="object-cover w-full h-full" 
          />
        </AspectRatio>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg">{category.name}</h3>
          {category.description && (
            <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
