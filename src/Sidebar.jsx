import React, { useState } from 'react';
import { Fade, Zoom } from '@mui/material';
import styles from './Sidebar.module.css';

function Sidebar({ 
  categories, activeCategory, setActiveCategory, logoUrl, 
  theme, toggleTheme, lang, toggleLang, 
  searchTerm, setSearchTerm, toggleAdmin, getTrans,
  cartCount, openCart 
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer} onClick={toggleAdmin} title="Admin Panel">
        <Zoom in={true}>
          <img src={logoUrl} alt="Logo" className={styles.logo} />
        </Zoom>
      </div>
      
      <nav className={styles.navLinks}>
        {categories.map((cat, index) => (
          <Fade in={true} timeout={(index + 1) * 500} key={cat}>
            <button 
              className={`${styles.navBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {getTrans ? getTrans(cat) : cat}
              {activeCategory === cat && (
                <Zoom in={true}><span className={styles.dot}></span></Zoom>
              )}
            </button>
          </Fade>
        ))}
      </nav>

      <div className={styles.controls}>
        
        {/* NEW: SHOPPING CART BUTTON */}
        <div className={styles.controlItem}>
          <button className={styles.iconBtn} onClick={openCart}>
            <span className="material-icons">shopping_cart</span>
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </button>
        </div>

        <div className={styles.controlItem}>
          <button className={styles.iconBtn} onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <span className="material-icons">search</span>
          </button>
          <div className={`${styles.searchPopup} ${isSearchOpen ? styles.showSearch : ''}`}>
            <input 
              type="text" 
              placeholder={lang === 'en' ? "Search..." : "بحث..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus={isSearchOpen}
            />
          </div>
        </div>

        <div className={styles.controlItem}>
          <button className={styles.iconBtn} onClick={toggleTheme}>
            <span className="material-icons">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>
        </div>

        <div className={styles.controlItem}>
          <button className={styles.iconBtn} onClick={toggleLang}>
            <span className="material-icons">language</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;