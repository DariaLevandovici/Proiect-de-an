import { Plus } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const menuItems: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: 'Bruschetta Classica',
    description: 'Toasted bread with tomatoes, garlic, basil and olive oil',
    price: 85,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 95,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Carpaccio di Manzo',
    description: 'Thin sliced beef, arugula, parmesan, lemon dressing',
    price: 125,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'
  },
  
  // Main Courses
  {
    id: 4,
    name: 'Ribeye Steak',
    description: 'Premium 350g ribeye, grilled vegetables, truffle sauce',
    price: 385,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1628497622768-78d74888e965?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with guanciale, eggs, pecorino',
    price: 165,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Grilled Salmon',
    description: 'Atlantic salmon, asparagus, lemon butter sauce',
    price: 295,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Osso Buco',
    description: 'Braised veal shank, saffron risotto, gremolata',
    price: 345,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Margherita Pizza',
    description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil',
    price: 145,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    name: 'Lobster Linguine',
    description: 'Fresh lobster, cherry tomatoes, white wine, garlic',
    price: 425,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop'
  },

  // Desserts
  {
    id: 10,
    name: 'Tiramisu',
    description: 'Classic Italian coffee-flavored dessert',
    price: 75,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
  },
  {
    id: 11,
    name: 'Panna Cotta',
    description: 'Vanilla cream with berry coulis',
    price: 65,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'
  },
  {
    id: 12,
    name: 'Chocolate Fondant',
    description: 'Warm chocolate cake with molten center, vanilla ice cream',
    price: 85,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop'
  },
];

export function MenuSection() {
  const categories = ['Starters', 'Main Courses', 'Desserts'];

  return (
    <section id="menu" className="py-16 bg-[#1a1a1a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Menu</h2>
          <p className="text-gray-400 text-lg">Discover our curated selection of premium dishes</p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-gray-800">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#242424] rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-800 hover:border-blue-700"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-white">{item.name}</h4>
                        <span className="text-blue-400 font-bold text-lg">{item.price} MDL</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <button className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
