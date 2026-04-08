import { useState } from 'react';
import { Plus, Minus, Trash2, ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { menuItems } from '../data/menuData';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function WaiterCreateOrder() {
  const navigate = useNavigate();
  const { tables, addOrder } = useApp();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderComment, setOrderComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);

  const categories = ['All', 'Breakfast', 'Starters', 'Vegan', 'Main Dishes', 'Desserts', 'Drinks'];

  const addItem = (item: typeof menuItems[0]) => {
    const existing = orderItems.find(i => i.id === item.id);
    if (existing) {
      setOrderItems(orderItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setOrderItems([...orderItems, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        quantity: 1 
      }]);
    }
  };

  const removeItem = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = () => {
    if (!selectedTable) {
      alert('Please select a table');
      return;
    }
    if (orderItems.length === 0) {
      alert('Please add items to the order');
      return;
    }

    addOrder({
      type: 'dine-in',
      items: orderItems as any,
      total,
      status: 'draft',
      tableNumber: selectedTable,
      comment: orderComment.trim() || undefined
    });

    alert(`Order created for Table ${selectedTable}`);
    navigate('/dashboard/waiter');
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard/waiter')}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-4xl font-bold text-white">Create New Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Selection */}
          <div className="lg:col-span-2">
            {/* Table Selection */}
            <div className="mb-6 bg-[#242424] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Select Table</h3>
              <div className="grid grid-cols-6 gap-3">
                {tables.filter(t => t.status === 'free').map(table => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table.number)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTable === table.number
                        ? 'bg-blue-900/30 border-blue-600'
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <p className="text-white font-bold text-center">{table.number}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-full border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6 flex gap-2 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="bg-[#242424] rounded-xl p-4 border border-gray-800 hover:border-blue-700 transition-all text-left"
                >
                  <div className="aspect-video mb-3 overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-white font-bold mb-1 text-sm">{item.name}</h4>
                  <p className="text-blue-400 font-bold">{item.price} MDL</p>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#242424] rounded-2xl p-6 border border-gray-800 sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>

              {selectedTable && (
                <div className="mb-6 p-4 bg-blue-900/20 border border-blue-800 rounded-xl">
                  <p className="text-blue-400 text-center font-bold text-lg">
                    Table {selectedTable}
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {orderItems.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No items added</p>
                ) : (
                  orderItems.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-white font-bold text-sm flex-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-gray-900 rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white font-bold text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-white font-bold">
                          {item.price * item.quantity} MDL
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-2xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-blue-400">{total} MDL</span>
                </div>
              </div>

              <button
                onClick={() => setShowCommentModal(true)}
                disabled={!selectedTable || orderItems.length === 0}
                className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-full font-bold transition-colors"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>

        {/* Comment Modal */}
        {showCommentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#242424] rounded-2xl p-8 border border-gray-800 max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-6">Add Special Instructions</h3>
              <textarea
                value={orderComment}
                onChange={(e) => setOrderComment(e.target.value)}
                placeholder="Enter any special instructions for the kitchen (optional)..."
                rows={4}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500 resize-none mb-6"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitOrder}
                  className="flex-1 bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-full transition-colors"
                >
                  Create Order
                </button>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-full transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}