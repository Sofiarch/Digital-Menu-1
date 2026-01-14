import React, { useState } from 'react';
import styles from './MenuGrid.module.css';
import MenuCard from './MenuCard';
import ItemDetail from './ItemDetail';

function MenuGrid({ items, lang, addToCart }) { 
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className={styles.grid}>
        {items.map(item => (
          <MenuCard 
            key={item.id} 
            item={item} 
            lang={lang} 
            onClick={setSelectedItem} 
          />
        ))}
      </div>

      {selectedItem && (
        <ItemDetail 
          item={selectedItem} 
          lang={lang} 
          addToCart={addToCart} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </>
  );
}

export default MenuGrid;