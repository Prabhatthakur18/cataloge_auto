
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

const NavCart = () => {
  const { 
    getCartItemsWithDetails, 
    getItemCount, 
    getCartTotal, 
    removeFromCart 
  } = useCart();

  const cartItems = getCartItemsWithDetails();
  const itemCount = getItemCount();
  const total = getCartTotal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {cartItems.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-[300px] overflow-auto">
              {cartItems.map(item => (
                <DropdownMenuItem key={item.productId} className="flex items-center p-4 focus:bg-transparent cursor-default">
                  <div className="w-12 h-12 flex-shrink-0 mr-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <Link to={`/product/${item.productId}`} className="text-sm font-medium hover:text-primary">
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {item.quantity} × ${item.product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="ml-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromCart(item.productId);
                      }}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    >
                      ✕
                    </Button>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            
            <DropdownMenuSeparator />
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Link to="/cart" className="w-full">
                  <Button className="w-full">View Cart</Button>
                </Link>
                <Button variant="outline" className="w-full">Checkout</Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavCart;
