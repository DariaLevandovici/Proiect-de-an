import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, Plus, MessageSquare, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router';

export function WaiterDashboard() {
  const { user, logout, tables, updateTableStatus, orders, updateOrderStatus } = useApp();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [orderComment, setOrderComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSendToKitchen = (orderId: string) => {
    if (orderComment.trim()) {
      alert(`Order ${orderId} sent to kitchen with comment: ${orderComment}`);
      setOrderComment('');
      setShowCommentModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Waiter Dashboard</h1>
            <p className="text-gray-400">Welcome, {user?.name}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard/waiter/create-order')}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create New Order
            </button>
            <button
              onClick={() => navigate('/dashboard/waiter/bill')}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors"
            >
              <Receipt className="w-4 h-4" />
              Generate Bill
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Table Management */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Table Status</h2>
            <div className="grid grid-cols-3 gap-4">
              {tables.map(table => (
                <button
                  key={table.id}
                  onClick={() => {
                    setSelectedTable(table.id);
                    updateTableStatus(table.id, table.status === 'free' ? 'occupied' : 'free');
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    table.status === 'occupied'
                      ? 'bg-red-900/30 border-red-600'
                      : 'bg-green-900/30 border-green-600'
                  } ${selectedTable === table.id ? 'ring-4 ring-blue-600/30' : ''}`}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">#{table.number}</p>
                    <p className="text-sm text-gray-400">{table.seats} seats</p>
                    <p className={`text-xs mt-2 font-semibold ${
                      table.status === 'occupied' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {table.status.toUpperCase()}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-600"></div>
                <span className="text-sm text-gray-400">Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-600"></div>
                <span className="text-sm text-gray-400">Occupied</span>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Active Orders</h2>
            <div className="space-y-4 max-h-[700px] overflow-y-auto">
              {orders.filter(o => o.status !== 'delivered').map(order => (
                <div key={order.id} className="bg-[#242424] rounded-2xl p-6 border border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Order #{order.id}</h3>
                      <p className="text-gray-400 text-sm capitalize">{order.type}</p>
                    </div>
                    <span className="text-blue-400 font-bold text-lg">{order.total} MDL</span>
                  </div>

                  {/* Order Status */}
                  <div className="mb-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-full border border-gray-700 focus:border-blue-600 outline-none"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="in-preparation">In Preparation</option>
                      <option value="ready">Ready</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <button className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-full transition-colors">
                    Send to Kitchen
                  </button>
                </div>
              ))}

              {orders.filter(o => o.status !== 'delivered').length === 0 && (
                <div className="bg-[#242424] rounded-2xl p-8 border border-gray-800 text-center">
                  <p className="text-gray-400">No active orders</p>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Recent History</h3>
              <div className="space-y-3">
                {orders.filter(o => o.status === 'delivered').slice(0, 3).map(order => (
                  <div key={order.id} className="bg-[#242424] rounded-lg p-4 border border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Order #{order.id}</span>
                      <span className="text-gray-400 text-sm">{order.total} MDL</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comment Modal */}
        {showCommentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#242424] rounded-2xl p-8 border border-gray-800 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-white mb-6">Add Order Comment</h3>
              <textarea
                value={orderComment}
                onChange={(e) => setOrderComment(e.target.value)}
                placeholder="Special instructions for the kitchen..."
                rows={4}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500 resize-none mb-6"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => selectedOrder && handleSendToKitchen(selectedOrder)}
                  className="flex-1 bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-full transition-colors"
                >
                  Send
                </button>
                <button
                  onClick={() => {
                    setShowCommentModal(false);
                    setOrderComment('');
                  }}
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