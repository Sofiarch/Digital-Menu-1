import React from 'react';
import { Fade } from '@mui/material';
import styles from './SubCategoryNav.module.css';

function SubCategoryNav({ activeSub, setActiveSub, subCategories, getTrans }) {
  return (
    <div className={styles.subContainer}>
      {subCategories.map((sub, index) => (
        <Fade in={true} timeout={(index + 1) * 300} key={sub}>
          <button 
            className={`${styles.subBtn} ${activeSub === sub ? styles.active : ''}`}
            onClick={() => setActiveSub(sub)}
          >
            {getTrans ? getTrans(sub) : sub}
          </button>
        </Fade>
      ))}
    </div>
  );
}
export default SubCategoryNav;