import React, { useState } from 'react';
import { Slide } from '@mui/material';
import styles from './ItemDetail.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ItemDetail({ item, onClose, lang, addToCart }) { 
  const [quantity, setQuantity] = useState(1);
  const totalPrice = item.price * quantity;

  const labels = {
    en: { order: "Add to Cart" }, 
    ar: { order: "أضف للسلة" }
  };
  
  const t = labels[lang] || labels.en;

  const getName = () => (item.name && typeof item.name === 'object' ? item.name[lang] || item.name.en : item.name);
  const getDesc = () => (item.description && typeof item.description === 'object' ? item.description[lang] || item.description.en : item.description);

  
  const handleAddToCart = () => {
    addToCart(item, quantity);
    onClose(); 
  };

  return (
    <div className={styles.overlayWrapper}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className={styles.container}>
          
          <div className={styles.imageHeader}>
            <button className={styles.backBtn} onClick={onClose}>
              <span className="material-icons">arrow_back</span>
            </button>
            <img src={item.image} alt={getName()} />
          </div>

          <div className={styles.contentCard}>
            <div className={styles.header}>
              <div><h2>{getName()}</h2></div>
            </div>

            <div className={styles.controls}>
              <div className={styles.counter}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><RemoveIcon/></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><AddIcon/></button>
              </div>
              <span className={styles.price}>${totalPrice}</span>
            </div>
            
            <p className={styles.longDesc}>{getDesc()}</p>

            <div className={styles.footer}>
              {/* Call the new handler */}
              <button className={styles.orderBtn} onClick={handleAddToCart}>
                {t.order} - ${totalPrice}
              </button>
            </div>
          </div>

        </div>
      </Slide>
    </div>
  );
}
export default ItemDetail;