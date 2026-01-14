import React, { useState } from 'react';
import styles from './Checkout.module.css';

function Checkout({ cart, updateCartQty, removeFromCart, clearCart, backToMenu, lang }) {
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; 
  const total = subtotal + tax;

  const t = {
    en: {
      title: "Checkout",
      empty: "Your cart is empty",
      back: "Back to Menu",
      summary: "Order Summary",
      details: "Delivery Details",
      name: "Full Name",
      address: "Address",
      phone: "Phone Number",
      placeOrder: "Place Order",
      total: "Total",
      tax: "Tax (5%)",
      subtotal: "Subtotal",
      success: "Order Placed Successfully!",
      successMsg: "Thank you for your order. We are preparing it now."
    },
    ar: {
      title: "الدفع",
      empty: "عربة التسوق فارغة",
      back: "العودة للقائمة",
      summary: "ملخص الطلب",
      details: "تفاصيل التوصيل",
      name: "الاسم الكامل",
      address: "العنوان",
      phone: "رقم الهاتف",
      placeOrder: "تأكيد الطلب",
      total: "الإجمالي",
      tax: "ضريبة (5%)",
      subtotal: "المجموع الفرعي",
      success: "تم الطلب بنجاح!",
      successMsg: "شكراً لطلبك. نحن نقوم بتحضيره الآن."
    }
  }[lang];

  const handleOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      backToMenu();
    }, 3000);
  };

  const getName = (item) => (typeof item.name === 'string' ? item.name : item.name[lang] || item.name.en);

  if (isOrdered) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h2>{t.success}</h2>
        <p>{t.successMsg}</p>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.header}>
        <button onClick={backToMenu} className={styles.backBtn}>← {t.back}</button>
        <h1>{t.title}</h1>
      </div>

      <div className={styles.layout}>
        {}
        <div className={styles.cartSection}>
          <h2>{t.summary}</h2>
          {cart.length === 0 ? (
            <p className={styles.emptyMsg}>{t.empty}</p>
          ) : (
            <div className={styles.cartList}>
              {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt="" />
                  <div className={styles.itemInfo}>
                    <h3>{getName(item)}</h3>
                    <p>${item.price}</p>
                  </div>
                  <div className={styles.controls}>
                    <button onClick={() => updateCartQty(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQty(item.id, 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: FORM & TOTAL */}
        <div className={styles.formSection}>
          <h2>{t.details}</h2>
          <form onSubmit={handleOrder} className={styles.form}>
            <input 
              required 
              placeholder={t.name} 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
            />
            <input 
              required 
              placeholder={t.phone} 
              value={form.phone} 
              onChange={e => setForm({...form, phone: e.target.value})} 
            />
            <textarea 
              required 
              placeholder={t.address} 
              value={form.address} 
              onChange={e => setForm({...form, address: e.target.value})} 
            />

            <div className={styles.priceSummary}>
              <div className={styles.row}><span>{t.subtotal}</span><span>${subtotal.toFixed(2)}</span></div>
              <div className={styles.row}><span>{t.tax}</span><span>${tax.toFixed(2)}</span></div>
              <div className={`${styles.row} ${styles.total}`}><span>{t.total}</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button type="submit" className={styles.placeOrderBtn} disabled={cart.length === 0}>
              {t.placeOrder}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;