import { menuItems } from '../../../data/menuData';
import { MenuCarousel } from './MenuCarousel';
import { ProductCard } from './ProductCard';

import { useApp } from '../../../context/AppContext';

const categories = ['Breakfast', 'Starters', 'Vegan', 'Main Dishes', 'Desserts', 'Drinks'];

export function MenuSection() {
  const { searchQuery } = useApp();

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    const filteredItems = menuItems.filter((item) => 
      item.name.toLowerCase().includes(query) || 
      (item.description && item.description.toLowerCase().includes(query))
    );

    return (
      <section id="menu" className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Search Results</h2>
            <p className="text-gray-400 text-lg">Showing results for "{searchQuery}"</p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No results found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="h-full">
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

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
            <MenuCarousel items={menuItems.filter((item) => item.category === category)} />
          </div>
        ))}
      </div>
    </section>
  );
}