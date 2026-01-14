import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import SubCategoryNav from './SubCategoryNav';
import Footer from './Footer';
import AdminPanel from './AdminPanel';
import MenuGrid from './MenuGrid';
import Checkout from './Checkout';
import AdminLogin from './AdminLogin';
import Toast from './Toast';
import { MENU_ITEMS, MENU_STRUCTURE, CATEGORY_TRANSLATIONS } from './data';

function App() {
  const [view, setView] = useState('customer');
  const [showLogin, setShowLogin] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('FOOD');
  const [activeSub, setActiveSub] = useState('PIZZA');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');

  // --- DATA STATE ---
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menuItems');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && typeof parsed[0].name === 'string') return MENU_ITEMS;
        return parsed;
      } catch (e) { return MENU_ITEMS; }
    }
    return MENU_ITEMS;
  });

  const [structure, setStructure] = useState(() => {
    const saved = localStorage.getItem('menuStructure');
    return saved ? JSON.parse(saved) : MENU_STRUCTURE;
  });

  const [translations, setTranslations] = useState(() => {
    const saved = localStorage.getItem('categoryTranslations');
    return saved ? JSON.parse(saved) : CATEGORY_TRANSLATIONS;
  });

  // --- TOAST STATE ---
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- CART STATE ---
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
    const itemName = item.name[lang] || item.name.en || item.name;
    addToast(`${itemName} added to cart!`, 'success');
  };

  const updateCartQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    addToast("Item removed", "info");
  };
  
  const clearCart = () => setCart([]);

  // --- BRANDING STATE ---
  const [logo, setLogo] = useState(() => localStorage.getItem('appLogo') || "https://cdn-icons-png.flaticon.com/512/1046/1046784.png");
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accentColor') || "#3d2b3d");
  const [secondaryColor, setSecondaryColor] = useState(() => localStorage.getItem('secondaryColor') || "#1b1b1b");

  // --- EFFECTS ---
  useEffect(() => {
    document.body.className = `${theme === 'dark' ? 'dark-mode' : ''} ${lang === 'ar' ? 'rtl' : ''}`;
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }, [theme, lang, accentColor, secondaryColor]);

  useEffect(() => { localStorage.setItem('menuItems', JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem('menuStructure', JSON.stringify(structure)); }, [structure]);
  useEffect(() => { localStorage.setItem('categoryTranslations', JSON.stringify(translations)); }, [translations]);
  useEffect(() => { localStorage.setItem('appLogo', logo); }, [logo]);
  useEffect(() => { localStorage.setItem('accentColor', accentColor); }, [accentColor]);
  useEffect(() => { localStorage.setItem('secondaryColor', secondaryColor); }, [secondaryColor]);

  useEffect(() => {
    const cats = Object.keys(structure);
    if (!cats.includes(activeCategory) && cats.length > 0) setActiveCategory(cats[0]);
  }, [structure, activeCategory]);

  useEffect(() => {
    const availableSubs = structure[activeCategory];
    if (availableSubs && !availableSubs.includes(activeSub)) {
      if (availableSubs.length > 0) setActiveSub(availableSubs[0]);
    }
  }, [activeCategory, structure, activeSub]);

  const getTrans = (key) => translations[lang]?.[key] || key;

  const currentItems = menuItems.filter(item => {
    if (!item) return false;
    const nameEn = (typeof item.name === 'object' ? item.name.en : item.name) || "";
    const nameAr = (typeof item.name === 'object' ? item.name.ar : "") || "";
    const searchLower = searchTerm.toLowerCase();
    
    const matchesCategory = item.category === activeCategory && item.subCategory === activeSub;
    const matchesSearch = nameEn.toLowerCase().includes(searchLower) || nameAr.includes(searchLower);
    return searchTerm ? matchesSearch : matchesCategory;
  });

  return (
    <div className="app-container">
      <Toast toasts={toasts} removeToast={removeToast} />

      <Sidebar 
        categories={Object.keys(structure)}
        activeCategory={activeCategory} 
        setActiveCategory={(newCat) => {
          setView('customer');
          setActiveCategory(newCat);
          if (structure[newCat]?.length > 0) setActiveSub(structure[newCat][0]);
        }}
        logoUrl={logo}
        theme={theme} toggleTheme={() => setTheme(p => p === 'light' ? 'dark' : 'light')}
        lang={lang} toggleLang={() => setLang(p => p === 'en' ? 'ar' : 'en')}
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        toggleAdmin={() => setShowLogin(true)}
        getTrans={getTrans}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setView('checkout')}
      />
      
      {showLogin && (
        <AdminLogin 
          onClose={() => setShowLogin(false)}
          onLogin={() => {
            setShowLogin(false);
            setView('admin');
            addToast("Welcome Admin!", "success");
          }}
          lang={lang}
          accentColor={accentColor}
          addToast={addToast}
        />
      )}

      <main className="content">
        {view === 'customer' && (
          <>
            {!searchTerm && structure[activeCategory] && (
              <SubCategoryNav 
                activeSub={activeSub} 
                setActiveSub={setActiveSub}
                subCategories={structure[activeCategory]}
                getTrans={getTrans}
              />
            )}
            
            {searchTerm && <h2>{lang === 'en' ? 'Search:' : 'بحث:'} "{searchTerm}"</h2>}
            
            <MenuGrid items={currentItems} lang={lang} addToCart={addToCart} />
            
            {/* PASS LANG PROP HERE */}
            <Footer setView={() => setShowLogin(true)} lang={lang} />
          </>
        )}

        {view === 'checkout' && (
          <Checkout 
            cart={cart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            backToMenu={() => setView('customer')}
            lang={lang}
          />
        )}

        {view === 'admin' && (
          <AdminPanel 
            backToMenu={() => setView('customer')}
            menuItems={menuItems} setMenuItems={setMenuItems}
            structure={structure} setStructure={setStructure}
            logo={logo} setLogo={setLogo}
            accentColor={accentColor} setAccentColor={setAccentColor}
            secondaryColor={secondaryColor} setSecondaryColor={setSecondaryColor}
            translations={translations} setTranslations={setTranslations}
            lang={lang}
            addToast={addToast}
          />
        )}
      </main>
    </div>
  );
}

export default App;