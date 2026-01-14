export const MENU_STRUCTURE = {
  FOOD: ['PIZZA', 'BURGER', 'PASTA'],
  DRINKS: ['COLD', 'HOT'],
  DESSERT: ['CAKE', 'ICE_CREAM']
};

export const CATEGORY_TRANSLATIONS = {
  en: {
    FOOD: "Food", PIZZA: "Pizza", BURGER: "Burger", PASTA: "Pasta",
    DRINKS: "Drinks", COLD: "Cold Drinks", HOT: "Hot Drinks",
    DESSERT: "Dessert", CAKE: "Cakes", ICE_CREAM: "Ice Cream"
  },
  ar: {
    FOOD: "طعام", PIZZA: "بيتزا", BURGER: "برجر", PASTA: "معكرونة",
    DRINKS: "مشروبات", COLD: "مشروبات باردة", HOT: "مشروبات ساخنة",
    DESSERT: "حلويات", CAKE: "كيك", ICE_CREAM: "آيس كريم"
  }
};

export const MENU_ITEMS = [
  
  {
    id: 2,
    name: { en: "Pepperoni Passion", ar: "عشاق البيبروني" },
    description: { 
      en: "Double pepperoni slices on a bed of extra cheese and oregano.", 
      ar: "شرائح بيبروني مزدوجة على طبقة من الجبن الإضافي والزعتر البري." 
    },
    price: 15,
    category: "FOOD",
    subCategory: "PIZZA",
    // Optimized: w=500, q=60
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60"
  },

  // 3. Truffle Mushroom
  {
    id: 3,
    name: { en: "Truffle Mushroom", ar: "ترافل مشروم" },
    description: { 
      en: "Wild mushrooms, truffle oil, white cream base, and parmesan.", 
      ar: "فطر بري، زيت الكمأة، قاعدة كريمة بيضاء، وجبنة بارميزان." 
    },
    price: 18,
    category: "FOOD",
    subCategory: "PIZZA",
    // Optimized: w=500, q=60
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60"
  },

  // 4. BBQ Chicken Legend
  {
    id: 4,
    name: { en: "BBQ Chicken Legend", ar: "دجاج باربيكيو الأسطورية" },
    description: { 
      en: "Grilled chicken breast, red onions, sweet corn, and smoky BBQ drizzle.", 
      ar: "صدر دجاج مشوي، بصل أحمر، ذرة حلوة، وصلصة باربيكيو مدخنة." 
    },
    price: 16,
    category: "FOOD",
    subCategory: "PIZZA",
    // Optimized: w=500, q=60
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60"
  },

  // 5. Veggie Supreme
  {
    id: 5,
    name: { en: "Veggie Supreme", ar: "خضار سوبريم" },
    description: { 
      en: "Bell peppers, olives, mushrooms, onions, and fresh tomatoes.", 
      ar: "فلفل رومي، زيتون، فطر، بصل، وطماطم طازجة." 
    },
    price: 14,
    category: "FOOD",
    subCategory: "PIZZA",
    // Optimized: w=500, q=60
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=500&q=60"
  },

  // 6. Spicy Mexicano
  {
    id: 6,
    name: { en: "Spicy Mexicano", ar: "مكسيكانو حار" },
    description: { 
      en: "Spicy beef, jalapeños, red beans, and hot chili sauce.", 
      ar: "لحم بقري حار، هالبينو، فاصولياء حمراء، وصلصة الفلفل الحار." 
    },
    price: 17,
    category: "FOOD",
    subCategory: "PIZZA",
    // Optimized: w=500, q=60
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=500&q=60"
  }
];