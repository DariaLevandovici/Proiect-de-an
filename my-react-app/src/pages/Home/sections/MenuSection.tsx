import { menuItems } from '../../../data/menuData';
import { AddToCartButton } from '../../../components/AddToCartButton';

const categories = ['Starters', 'Main Dishes', 'Desserts'];

export function MenuSection() {

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
                .slice(0, 3)
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
                      <AddToCartButton item={item} />
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