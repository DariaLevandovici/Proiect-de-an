import { Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../ui/button';

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
      <Button
        onClick={() => addToCart(item)}
        className="h-12 w-full"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </Button>
    );
  }

  return (
    <div className="w-full bg-[#1e1e1e] border border-blue-700 text-white rounded-full h-[48px] flex items-center justify-between px-1 transition-all overflow-hidden">
      <Button
        onClick={() => updateCartQuantity(item.id, quantity - 1)}
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-xl text-gray-300 hover:bg-gray-800 flex-shrink-0"
      >
        <Minus className="w-4 h-4 text-gray-300" />
      </Button>

      <span className="font-bold flex-1 text-center select-none text-lg text-white">{quantity}</span>

      <Button
        onClick={() => updateCartQuantity(item.id, quantity + 1)}
        size="icon"
        className="h-10 w-10 rounded-xl flex-shrink-0"
      >
        <Plus className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
}
