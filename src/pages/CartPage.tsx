
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const CartPage = () => {
  const { 
    getCartItemsWithDetails, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal,
    clearCart,
    getItemCount
  } = useCart();

  const cartItems = getCartItemsWithDetails();
  const itemCount = getItemCount();
  const cartTotal = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="flex justify-center mb-4">
          <ShoppingBag size={64} className="text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-semibold">Items ({itemCount})</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-1" />
                Clear Cart
              </Button>
            </div>
            
            {cartItems.map(item => (
              <div key={item.productId} className="flex items-center space-x-4 py-4 border-b">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <AspectRatio ratio={1/1}>
                    <Link to={`/product/${item.productId}`}>
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="object-cover w-full h-full rounded" 
                      />
                    </Link>
                  </AspectRatio>
                </div>
                
                {/* Product Info */}
                <div className="flex-grow">
                  <Link to={`/product/${item.productId}`} className="font-medium hover:text-primary">
                    {item.product.name}
                  </Link>
                  <div className="text-muted-foreground text-sm">
                    Price: ${item.product.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-l"
                    >
                      -
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center border-t border-b">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Price and Remove */}
                <div className="flex flex-col items-end space-y-2">
                  <div className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-4 sticky top-6">
            <h2 className="text-xl font-semibold border-b pb-4">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full mt-4">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="pt-4 border-t">
              <Link to="/">
                <Button variant="outline" className="w-full">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
