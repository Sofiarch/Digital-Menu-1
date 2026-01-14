import React from 'react';
import styles from './Footer.module.css';

function Footer({ lang }) {
  const t = {
    en: { text: "© 2026 All Rights Reserved. Built by" },
    ar: { text: "© 2026 جميع الحقوق محفوظة. تم التطوير بواسطة" }
  };

  const content = t[lang] || t.en;

  return (
    <footer className={styles.footer}>
      <p>
        {content.text} 
        <a 
          href="https://linex.digital" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.adminLink}
        >
           LineX
        </a>
      </p>
    </footer>
  );
}

export default Footer;