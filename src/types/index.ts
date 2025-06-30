
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  categoryId: string;
  additionalInfo?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userName: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
