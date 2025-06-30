
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/context/WishlistContext';

interface ProductActionsProps {
  productId: string;
  productName: string;
  price: number;
  inStock?: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({ productId, productName, price, inStock = true }) => {
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isInWishlistAlready = isInWishlist(productId);

  const handleWishlistToggle = () => {
    if (isInWishlistAlready) {
      removeFromWishlist(productId);
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(productId);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `Check out this amazing product: ${productName} - ₹${price.toFixed(2)}. View more details at: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button 
          variant={isInWishlistAlready ? "default" : "outline"} 
          className="flex-1"
          onClick={handleWishlistToggle}
        >
          <Heart className={`mr-2 h-4 w-4 ${isInWishlistAlready ? 'fill-current' : ''}`} />
          {isInWishlistAlready ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleWhatsAppShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share on WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
