export const categories = ['All', 'Asian', 'Pizza', 'Burgers', 'Juice', 'Sushi', 'Desserts'];

export const restaurants = [
  {
    id: '1',
    name: 'Asian Wok',
    cuisine: 'Asian · Chinese · Thai',
    rating: 4.8,
    reviewCount: 342,
    deliveryTime: '20-30',
    deliveryFee: 1.99,
    minOrder: 10,
    category: 'Asian',
    emoji: '🥢',
    coverEmoji: '🍜',
    coverColor: ['#FF6B35', '#F7931E'],
    tags: ['Popular', 'Top Rated'],
    isOpen: true,
    menu: [
      {
        category: 'Starters',
        items: [
          { id: 'a1', name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chili dip', price: 5.99, emoji: '🥟' },
          { id: 'a2', name: 'Wonton Soup', description: 'Silky wontons in a rich chicken broth', price: 6.49, emoji: '🍜' },
          { id: 'a3', name: 'Edamame', description: 'Steamed salted soybean pods', price: 3.99, emoji: '🫛' },
        ],
      },
      {
        category: 'Main Course',
        items: [
          { id: 'a4', name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts and veggies', price: 13.99, emoji: '🍗' },
          { id: 'a5', name: 'Pad Thai Noodles', description: 'Classic Thai noodles with shrimp, tofu and peanuts', price: 12.99, emoji: '🍝' },
          { id: 'a6', name: 'Beef Fried Rice', description: 'Wok-tossed rice with tender beef strips', price: 11.99, emoji: '🍚' },
          { id: 'a7', name: 'Mongolian Beef', description: 'Tender beef in savory hoisin sauce with scallions', price: 15.99, emoji: '🥩' },
          { id: 'a8', name: 'Vegetable Tofu', description: 'Silken tofu with seasonal vegetables in garlic sauce', price: 10.99, emoji: '🥦' },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { id: 'a9', name: 'Mango Sticky Rice', description: 'Sweet glutinous rice with fresh mango and coconut cream', price: 6.99, emoji: '🥭' },
          { id: 'a10', name: 'Sesame Balls', description: 'Fried glutinous rice balls filled with red bean paste', price: 4.99, emoji: '🟤' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Juice Land',
    cuisine: 'Juices · Smoothies · Health',
    rating: 4.6,
    reviewCount: 218,
    deliveryTime: '10-20',
    deliveryFee: 0.99,
    minOrder: 8,
    category: 'Juice',
    emoji: '🥤',
    coverEmoji: '🍹',
    coverColor: ['#11998e', '#38ef7d'],
    tags: ['Healthy', 'Fast Delivery'],
    isOpen: true,
    menu: [
      {
        category: 'Fresh Juices',
        items: [
          { id: 'j1', name: 'Orange Blast', description: 'Freshly squeezed Valencia oranges', price: 4.99, emoji: '🍊' },
          { id: 'j2', name: 'Green Detox', description: 'Spinach, cucumber, green apple and ginger', price: 5.99, emoji: '🥬' },
          { id: 'j3', name: 'Watermelon Cooler', description: 'Fresh watermelon with a hint of mint and lime', price: 5.49, emoji: '🍉' },
          { id: 'j4', name: 'Carrot Glow', description: 'Carrot, orange and turmeric blend', price: 5.49, emoji: '🥕' },
        ],
      },
      {
        category: 'Smoothies',
        items: [
          { id: 'j5', name: 'Berry Blast', description: 'Strawberry, blueberry, raspberry with almond milk', price: 6.99, emoji: '🍓' },
          { id: 'j6', name: 'Mango Tango', description: 'Mango, banana, passion fruit and coconut water', price: 6.99, emoji: '🥭' },
          { id: 'j7', name: 'Peanut Butter Banana', description: 'Banana, peanut butter, oats and honey', price: 7.49, emoji: '🍌' },
          { id: 'j8', name: 'Avocado Dream', description: 'Avocado, banana, spinach and honey', price: 7.99, emoji: '🥑' },
        ],
      },
      {
        category: 'Boosts',
        items: [
          { id: 'j9', name: 'Protein Boost', description: 'Add whey or plant protein to any drink', price: 1.99, emoji: '💪' },
          { id: 'j10', name: 'Chia Seeds Add-on', description: 'Sprinkled chia seeds for extra fiber', price: 0.99, emoji: '🌱' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Pizza Palace',
    cuisine: 'Italian · Pizza · Pasta',
    rating: 4.7,
    reviewCount: 509,
    deliveryTime: '25-40',
    deliveryFee: 1.49,
    minOrder: 15,
    category: 'Pizza',
    emoji: '🍕',
    coverEmoji: '🍕',
    coverColor: ['#c94b4b', '#4b134f'],
    tags: ['Best Seller', 'Family Meals'],
    isOpen: true,
    menu: [
      {
        category: 'Pizzas',
        items: [
          { id: 'p1', name: 'Margherita', description: 'Classic tomato base, fresh mozzarella and basil', price: 12.99, emoji: '🍕' },
          { id: 'p2', name: 'Pepperoni Feast', description: 'Loaded with premium pepperoni and mozzarella', price: 15.99, emoji: '🍕' },
          { id: 'p3', name: 'BBQ Chicken', description: 'Smoky BBQ sauce, grilled chicken and red onions', price: 16.99, emoji: '🍕' },
          { id: 'p4', name: 'Veggie Supreme', description: 'Bell peppers, mushrooms, olives and sundried tomatoes', price: 14.99, emoji: '🍕' },
        ],
      },
      {
        category: 'Pasta',
        items: [
          { id: 'p5', name: 'Spaghetti Bolognese', description: 'Slow-cooked beef ragu with al dente spaghetti', price: 13.99, emoji: '🍝' },
          { id: 'p6', name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with garlic and chili', price: 11.99, emoji: '🍝' },
          { id: 'p7', name: 'Fettuccine Alfredo', description: 'Creamy parmesan sauce with grilled chicken', price: 14.99, emoji: '🍝' },
        ],
      },
      {
        category: 'Sides',
        items: [
          { id: 'p8', name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs', price: 4.99, emoji: '🥖' },
          { id: 'p9', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons and Caesar dressing', price: 7.99, emoji: '🥗' },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Burger Barn',
    cuisine: 'Burgers · Fast Food · American',
    rating: 4.5,
    reviewCount: 627,
    deliveryTime: '15-25',
    deliveryFee: 1.29,
    minOrder: 12,
    category: 'Burgers',
    emoji: '🍔',
    coverEmoji: '🍔',
    coverColor: ['#f7971e', '#ffd200'],
    tags: ['Popular', 'Late Night'],
    isOpen: true,
    menu: [
      {
        category: 'Burgers',
        items: [
          { id: 'b1', name: 'Classic Smash Burger', description: 'Double smashed beef patty with special sauce and pickles', price: 11.99, emoji: '🍔' },
          { id: 'b2', name: 'BBQ Bacon Burger', description: 'Crispy bacon, cheddar, BBQ sauce and onion rings', price: 14.99, emoji: '🍔' },
          { id: 'b3', name: 'Mushroom Swiss', description: 'Sautéed mushrooms and melted Swiss cheese', price: 13.49, emoji: '🍔' },
          { id: 'b4', name: 'Spicy Jalapeño', description: 'Jalapeños, pepper jack cheese and chipotle mayo', price: 13.99, emoji: '🍔' },
          { id: 'b5', name: 'Veggie Burger', description: 'Black bean patty with avocado and fresh veggies', price: 12.99, emoji: '🥗' },
        ],
      },
      {
        category: 'Sides',
        items: [
          { id: 'b6', name: 'Loaded Fries', description: 'Crispy fries with cheese, bacon bits and sour cream', price: 6.99, emoji: '🍟' },
          { id: 'b7', name: 'Onion Rings', description: 'Golden battered onion rings with ranch dip', price: 5.99, emoji: '🧅' },
          { id: 'b8', name: 'Coleslaw', description: 'Creamy homemade coleslaw', price: 3.49, emoji: '🥗' },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { id: 'b9', name: 'Thick Milkshake', description: 'Chocolate, vanilla or strawberry', price: 5.99, emoji: '🥤' },
          { id: 'b10', name: 'Soft Drink', description: 'Coke, Pepsi, Sprite or Fanta', price: 2.49, emoji: '🥤' },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Sushi Spot',
    cuisine: 'Japanese · Sushi · Ramen',
    rating: 4.9,
    reviewCount: 183,
    deliveryTime: '30-45',
    deliveryFee: 2.49,
    minOrder: 20,
    category: 'Sushi',
    emoji: '🍣',
    coverEmoji: '🍣',
    coverColor: ['#1a1a2e', '#16213e'],
    tags: ['Premium', 'Top Rated'],
    isOpen: false,
    menu: [
      {
        category: 'Rolls',
        items: [
          { id: 's1', name: 'Dragon Roll', description: 'Shrimp tempura inside, avocado on top with eel sauce', price: 16.99, emoji: '🍣' },
          { id: 's2', name: 'Spicy Tuna Roll', description: 'Fresh tuna with spicy mayo and cucumber', price: 14.99, emoji: '🍣' },
          { id: 's3', name: 'California Roll', description: 'Crab, avocado and cucumber with sesame seeds', price: 11.99, emoji: '🍣' },
          { id: 's4', name: 'Rainbow Roll', description: 'California roll topped with assorted sashimi', price: 18.99, emoji: '🍣' },
        ],
      },
      {
        category: 'Ramen',
        items: [
          { id: 's5', name: 'Tonkotsu Ramen', description: 'Rich pork bone broth with chashu, egg and nori', price: 15.99, emoji: '🍜' },
          { id: 's6', name: 'Miso Ramen', description: 'Miso-based broth with corn, butter and tofu', price: 14.49, emoji: '🍜' },
        ],
      },
      {
        category: 'Nigiri & Sashimi',
        items: [
          { id: 's7', name: 'Salmon Nigiri', description: 'Fresh Atlantic salmon on seasoned rice (2 pcs)', price: 7.99, emoji: '🐟' },
          { id: 's8', name: 'Tuna Sashimi', description: 'Premium bluefin tuna sliced fresh (5 pcs)', price: 16.99, emoji: '🐟' },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Dessert Den',
    cuisine: 'Desserts · Cakes · Ice Cream',
    rating: 4.7,
    reviewCount: 294,
    deliveryTime: '15-25',
    deliveryFee: 1.99,
    minOrder: 10,
    category: 'Desserts',
    emoji: '🍰',
    coverEmoji: '🍰',
    coverColor: ['#ee9ca7', '#ffdde1'],
    tags: ['Sweet Treats', 'Popular'],
    isOpen: true,
    menu: [
      {
        category: 'Cakes & Pastries',
        items: [
          { id: 'd1', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center and vanilla ice cream', price: 8.99, emoji: '🎂' },
          { id: 'd2', name: 'New York Cheesecake', description: 'Classic baked cheesecake with berry compote', price: 7.99, emoji: '🍰' },
          { id: 'd3', name: 'Tiramisu', description: 'Classic Italian dessert with mascarpone and espresso', price: 8.49, emoji: '☕' },
          { id: 'd4', name: 'Cinnamon Roll', description: 'Freshly baked with cream cheese frosting', price: 5.99, emoji: '🌀' },
        ],
      },
      {
        category: 'Ice Cream',
        items: [
          { id: 'd5', name: 'Sundae Supreme', description: '3 scoops with hot fudge, whipped cream and cherry', price: 7.99, emoji: '🍨' },
          { id: 'd6', name: 'Gelato Trio', description: 'Three flavors of authentic Italian gelato', price: 8.99, emoji: '🍦' },
          { id: 'd7', name: 'Waffle Cone', description: 'Your choice of 2 scoops in a crispy waffle cone', price: 5.99, emoji: '🍦' },
        ],
      },
      {
        category: 'Hot Drinks',
        items: [
          { id: 'd8', name: 'Hot Chocolate', description: 'Rich and creamy with whipped cream and marshmallows', price: 4.99, emoji: '☕' },
          { id: 'd9', name: 'Bubble Tea', description: 'Taro, matcha or classic milk tea with tapioca pearls', price: 5.99, emoji: '🧋' },
        ],
      },
    ],
  },
];
