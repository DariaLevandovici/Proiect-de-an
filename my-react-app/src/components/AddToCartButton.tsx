import { Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AddToCartButtonProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { cart, addToCart, updateCartQuantity } = useApp();
  
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  if (quantity === 0) {
    return (
      <button 
        onClick={() => addToCart(item)}
        className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 h-[48px] rounded-full transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
    );
  }

  return (
    <div className="w-full bg-[#1e1e1e] border border-blue-700 text-white rounded-full h-[48px] flex items-center justify-between px-1 transition-all overflow-hidden">
      <button 
        onClick={() => updateCartQuantity(item.id, quantity - 1)}
        className="w-10 h-10 rounded-full hover:bg-gray-800 flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Minus className="w-4 h-4 text-gray-300" />
      </button>
      
      <span className="font-bold flex-1 text-center select-none text-lg text-white">{quantity}</span>
      
      <button 
        onClick={() => updateCartQuantity(item.id, quantity + 1)}
        className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Plus className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
