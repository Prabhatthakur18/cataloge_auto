import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory, getSubcategories } from '@/data/mockData';
import { categories } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { ChevronRight } from 'lucide-react';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Find the current category
  const category = categories.find(cat => cat.id === categoryId);

  // Get subcategories if any
  const subcategories = categoryId ? getSubcategories(categoryId) : [];

  // Get products in current category
  const products = categoryId ? getProductsByCategory(categoryId) : [];

  if (!category) {
    return <div className="text-center py-12">Category not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs">
        <ul className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
          </li>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {(category?.parentId
            ? categories.find(cat => cat.id === category.parentId)
            : null) && (
            <>
              <li>
                <Link
                  to={`/category/${
                    (category?.parentId
                      ? categories.find(cat => cat.id === category.parentId)
                      : null).id
                  }`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {(
                    category?.parentId
                      ? categories.find(cat => cat.id === category.parentId)
                      : null
                  ).name}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </>
          )}
          <li className="font-medium">{category.name}</li>
        </ul>
      </div>

      {/* Category Header */}
      <div className="bg-muted rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse {category.name} Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subcategories.map(subcategory => (
              <CategoryCard key={subcategory.id} category={subcategory} />
            ))}
          </div>
        </section>
      )}

      {/* Products Section */}
      <section>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : subcategories.length === 0 ? (
          <div className="flex justify-center items-center h-48 bg-muted rounded-lg">
            <p className="text-2xl font-semibold text-muted-foreground">Coming Soon!</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default CategoryPage;
