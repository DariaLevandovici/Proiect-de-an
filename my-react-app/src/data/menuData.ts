export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  dietary: string[];
}

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: 101,
    name: 'Eggs Benedict',
    description: 'Poached eggs, Canadian bacon, hollandaise sauce on English muffin',
    price: 95,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop',
    ingredients: ['eggs', 'bacon', 'butter', 'lemon', 'english muffin'],
    dietary: []
  },
  {
    id: 102,
    name: 'Avocado Toast',
    description: 'Smashed avocado, cherry tomatoes, feta cheese on sourdough',
    price: 75,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    ingredients: ['avocado', 'tomatoes', 'feta', 'bread'],
    dietary: ['vegetarian']
  },
  {
    id: 103,
    name: 'Pancake Stack',
    description: 'Fluffy pancakes with maple syrup, berries, and whipped cream',
    price: 85,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    ingredients: ['flour', 'milk', 'eggs', 'berries', 'maple syrup'],
    dietary: ['vegetarian']
  },
  // Starters
  {
    id: 201,
    name: 'Bruschetta Classica',
    description: 'Toasted bread with tomatoes, garlic, basil and olive oil',
    price: 85,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
    ingredients: ['bread', 'tomatoes', 'garlic', 'basil', 'olive oil'],
    dietary: ['vegan']
  },
  {
    id: 202,
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 95,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    ingredients: ['lettuce', 'parmesan', 'croutons', 'anchovies', 'eggs'],
    dietary: []
  },
  {
    id: 203,
    name: 'Hummus Platter',
    description: 'Creamy hummus with pita bread, olives, and vegetables',
    price: 70,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1683725519288-eab9fa352335?q=80&w=950&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['chickpeas', 'tahini', 'lemon', 'garlic', 'pita'],
    dietary: ['vegan']
  },

  // Vegan
  {
    id: 301,
    name: 'Buddha Bowl',
    description: 'Quinoa, roasted vegetables, avocado, tahini dressing',
    price: 125,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    ingredients: ['quinoa', 'sweet potato', 'chickpeas', 'avocado', 'tahini'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 302,
    name: 'Vegan Burger',
    description: 'Plant-based patty, lettuce, tomato, vegan mayo, sweet potato fries',
    price: 145,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
    ingredients: ['plant protein', 'lettuce', 'tomato', 'vegan mayo', 'sweet potato'],
    dietary: ['vegan']
  },
  {
    id: 303,
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms and herbs',
    price: 155,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1637361874063-e5e415d7bcf7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['arborio rice', 'mushrooms', 'white wine', 'vegetable stock', 'herbs'],
    dietary: ['vegan', 'gluten-free']
  },

  // Main Dishes
  {
    id: 401,
    name: 'Ribeye Steak',
    description: 'Premium 350g ribeye, grilled vegetables, truffle sauce',
    price: 385,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1628497622768-78d74888e965?w=400&h=300&fit=crop',
    ingredients: ['beef', 'vegetables', 'truffle', 'butter'],
    dietary: ['gluten-free']
  },
  {
    id: 402,
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with guanciale, eggs, pecorino',
    price: 165,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    ingredients: ['pasta', 'guanciale', 'eggs', 'pecorino', 'black pepper'],
    dietary: []
  },
  {
    id: 403,
    name: 'Grilled Salmon',
    description: 'Atlantic salmon, asparagus, lemon butter sauce',
    price: 295,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    ingredients: ['salmon', 'asparagus', 'lemon', 'butter', 'dill'],
    dietary: ['gluten-free']
  },
  {
    id: 404,
    name: 'Lobster Linguine',
    description: 'Fresh lobster, cherry tomatoes, white wine, garlic',
    price: 425,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
    ingredients: ['lobster', 'pasta', 'tomatoes', 'white wine', 'garlic'],
    dietary: []
  },
  {
    id: 405,
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast, marinara sauce, mozzarella, pasta',
    price: 185,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop',
    ingredients: ['chicken', 'mozzarella', 'tomato sauce', 'pasta', 'parmesan'],
    dietary: []
  },

  // Desserts
  {
    id: 501,
    name: 'Tiramisu',
    description: 'Classic Italian coffee-flavored dessert',
    price: 75,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    ingredients: ['mascarpone', 'coffee', 'ladyfingers', 'cocoa', 'eggs'],
    dietary: ['vegetarian']
  },
  {
    id: 502,
    name: 'Chocolate Fondant',
    description: 'Warm chocolate cake with molten center, vanilla ice cream',
    price: 85,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    ingredients: ['chocolate', 'butter', 'eggs', 'flour', 'vanilla ice cream'],
    dietary: ['vegetarian']
  },
  {
    id: 503,
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    price: 80,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1621866908241-bc59b9dbfe7c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['cream cheese', 'sugar', 'eggs', 'berries', 'graham crackers'],
    dietary: ['vegetarian']
  },

  // Drinks
  {
    id: 601,
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 35,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
    ingredients: ['oranges'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 602,
    name: 'Espresso',
    description: 'Strong Italian coffee',
    price: 25,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
    ingredients: ['coffee beans'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 603,
    name: 'Craft Beer',
    description: 'Local craft beer selection',
    price: 45,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop',
    ingredients: ['malt', 'hops', 'yeast', 'water'],
    dietary: []
  },
  {
    id: 604,
    name: 'House Wine',
    description: 'Red or white wine selection',
    price: 55,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
    ingredients: ['grapes'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 104,
    name: 'English Breakfast',
    description: 'Traditional full English breakfast with sausages, beans, and eggs',
    price: 110,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
    ingredients: ['sausages', 'eggs', 'baked beans', 'toast', 'mushrooms'],
    dietary: []
  },
  {
    id: 105,
    name: 'French Toast',
    description: 'Brioche bread soaked in egg and milk, served with cinnamon and syrup',
    price: 80,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1484723091791-001c221eb47b?w=400&h=300&fit=crop',
    ingredients: ['brioche', 'eggs', 'milk', 'cinnamon', 'maple syrup'],
    dietary: ['vegetarian']
  },
  {
    id: 106,
    name: 'Smoothie Bowl',
    description: 'Berry smoothie base topped with granola, coconut flakes, and fresh fruit',
    price: 90,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400&h=300&fit=crop',
    ingredients: ['mixed berries', 'banana', 'granola', 'coconut', 'almond milk'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 204,
    name: 'Calamari Fritti',
    description: 'Crispy fried squid rings served with garlic aioli and lemon',
    price: 135,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599487405270-8cd522cc03f4?w=400&h=300&fit=crop',
    ingredients: ['squid', 'flour', 'lemon', 'garlic', 'mayonnaise'],
    dietary: []
  },
  {
    id: 205,
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, ripe tomatoes, sweet basil, and balsamic reduction',
    price: 110,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?w=400&h=300&fit=crop',
    ingredients: ['mozzarella', 'tomatoes', 'basil', 'balsamic vinegar', 'olive oil'],
    dietary: ['vegetarian', 'gluten-free']
  },
  {
    id: 206,
    name: 'Beef Carpaccio',
    description: 'Thinly sliced raw beef topped with arugula, parmesan shavings, and capers',
    price: 165,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1541525381831-29471f008f36?w=400&h=300&fit=crop',
    ingredients: ['beef', 'arugula', 'parmesan', 'capers', 'olive oil'],
    dietary: ['gluten-free']
  },
  {
    id: 304,
    name: 'Vegan Tacos',
    description: 'Corn tortillas filled with jackfruit pulled "pork", pico de gallo, and avocado',
    price: 120,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    ingredients: ['jackfruit', 'corn tortillas', 'tomatoes', 'onions', 'avocado'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 305,
    name: 'Zucchini Noodles',
    description: 'Zoodles tossed in a rich tomato and walnut pesto sauce',
    price: 115,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    ingredients: ['zucchini', 'tomatoes', 'walnuts', 'basil', 'garlic'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 306,
    name: 'Vegan Brownie',
    description: 'Fudgy chocolate brownie made with sweet potato and almond flour',
    price: 70,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    ingredients: ['sweet potato', 'cocoa powder', 'almond flour', 'maple syrup'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 406,
    name: 'Rack of Lamb',
    description: 'Herb-crusted rack of lamb with garlic mashed potatoes and red wine reduction',
    price: 450,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1544025162-811114215b22?w=400&h=300&fit=crop',
    ingredients: ['lamb', 'potatoes', 'garlic', 'herbs', 'red wine'],
    dietary: ['gluten-free']
  },
  {
    id: 407,
    name: 'Duck Breast',
    description: 'Pan-seared duck breast with cherry sauce and roasted root vegetables',
    price: 360,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop',
    ingredients: ['duck', 'cherries', 'carrots', 'parsnips', 'butter'],
    dietary: ['gluten-free']
  },
  {
    id: 408,
    name: 'Seafood Paella',
    description: 'Traditional Spanish rice dish with saffron, mussels, shrimp, and chorizo',
    price: 395,
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1515443961218-a51367808e41?w=400&h=300&fit=crop',
    ingredients: ['rice', 'saffron', 'mussels', 'shrimp', 'chorizo'],
    dietary: []
  },
  {
    id: 504,
    name: 'Panna Cotta',
    description: 'Vanilla bean panna cotta topped with a vibrant passion fruit coulis',
    price: 85,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop',
    ingredients: ['cream', 'sugar', 'gelatin', 'vanilla bean', 'passion fruit'],
    dietary: ['gluten-free']
  },
  {
    id: 505,
    name: 'Creme Brulee',
    description: 'Classic French custard dessert with a hard caramel top',
    price: 95,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22cbc?w=400&h=300&fit=crop',
    ingredients: ['cream', 'egg yolks', 'sugar', 'vanilla'],
    dietary: ['vegetarian', 'gluten-free']
  },
  {
    id: 506,
    name: 'Gelato Selection',
    description: 'Three scoops of artisanal Italian gelato (chocolate, pistachio, strawberry)',
    price: 65,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=400&h=300&fit=crop',
    ingredients: ['milk', 'sugar', 'cocoa', 'pistachios', 'strawberries'],
    dietary: ['vegetarian', 'gluten-free']
  },
  {
    id: 605,
    name: 'Iced Matcha Latte',
    description: 'Premium ceremonial grade matcha over milk and ice',
    price: 55,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&h=300&fit=crop',
    ingredients: ['matcha powder', 'milk', 'ice', 'sugar'],
    dietary: ['vegetarian', 'gluten-free']
  },
  {
    id: 606,
    name: 'Sparkling Water',
    description: 'San Pellegrino sparkling water with a slice of lemon',
    price: 30,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1560512165-274e1e07b8b7?w=400&h=300&fit=crop',
    ingredients: ['mineral water', 'lemon'],
    dietary: ['vegan', 'gluten-free']
  },
  {
    id: 607,
    name: 'Mojito Mocktail',
    description: 'Refreshing blend of lime, fresh mint, sugar, and soda water',
    price: 45,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
    ingredients: ['lime', 'mint', 'sugar', 'soda water', 'ice'],
    dietary: ['vegan', 'gluten-free']
  }
];
