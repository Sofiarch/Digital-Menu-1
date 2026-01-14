import React from 'react';
import { ButtonBase } from '@mui/material';
import styles from './MenuCard.module.css';

function MenuCard({ item, lang, onClick }) {
  const getName = () => {
    if (item.name && typeof item.name === 'object') {
      return item.name[lang] || item.name.en || "Unknown";
    }
    return item.name;
  };

  const getDesc = () => {
    if (item.description && typeof item.description === 'object') {
      return item.description[lang] || item.description.en || "";
    }
    return item.description;
  };

  return (
    <ButtonBase 
      className={styles.card} 
      onClick={() => onClick(item)}
      style={{
        borderRadius: '20px',
        display: 'block',
        textAlign: 'left',
        width: '100%'
      }}
    >
      <img src={item.image} alt={getName()} className={styles.bgImage} />
      <div className={styles.overlay}>
        <h3>{getName()}</h3>
        <p>{getDesc()}</p>
      </div>
    </ButtonBase>
  );
}
export default MenuCard;