import React, { useState } from 'react';
import styles from './AdminLogin.module.css';

function AdminLogin({ onClose, onLogin, lang, accentColor, addToast }) { 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const t = {
    en: { title: "Admin Access", placeholder: "Enter Password", btn: "Login" },
    ar: { title: "دخول المسؤول", placeholder: "أدخل كلمة المرور", btn: "دخول" }
  }[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1234') {
      onLogin();
    } else {
      setError(true);
      if (addToast) addToast("Incorrect Password", "error"); 
      setPassword('');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h2>{t.title}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="password" 
            placeholder={t.placeholder} 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={error ? styles.errorInput : ''}
            autoFocus
          />
          <button 
            type="submit" 
            className={styles.loginBtn}
            style={{ backgroundColor: accentColor }}
          >
            {t.btn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;