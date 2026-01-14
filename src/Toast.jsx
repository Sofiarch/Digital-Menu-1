import React, { useEffect } from 'react';
import styles from './Toast.module.css';

function Toast({ toasts, removeToast }) {
  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000); 
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <span className="material-icons">
        {toast.type === 'success' ? 'check_circle' : 'error'}
      </span>
      <p>{toast.message}</p>
      <button onClick={() => removeToast(toast.id)}>×</button>
    </div>
  );
}

export default Toast;