import React, { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';

function AdminPanel({ 
  backToMenu, 
  menuItems, setMenuItems, 
  structure, setStructure, 
  logo, setLogo, 
  accentColor, setAccentColor,
  secondaryColor, setSecondaryColor,
  translations, setTranslations,
  lang,
  addToast
}) {
  const [activeTab, setActiveTab] = useState('items');

  // Translations
  const t = {
    en: {
      title: "Admin Dashboard", exit: "Exit & Save",
      tabs: { items: "Items", cats: "Categories", brand: "Branding" },
      brand: { title: "Branding Settings", logoLabel: "Logo (URL or Upload)", colorLabel: "Primary Accent", secColorLabel: "Secondary (Dark) Accent" },
      cat: { title: "Manage Categories", addCat: "Add Main Category", addSub: "Add Sub Category" },
      labels: { upload: "Upload Image", or: "OR", imgUrl: "Image URL", processing: "Processing..." },
      placeholders: {
        nameEn: "Name (English)", nameAr: "Name (Arabic)",
        descEn: "Description (English)", descAr: "Description (Arabic)",
        price: "Price", imgUrl: "Image URL or Upload",
        catEn: "Category Name (English)", catAr: "Category Name (Arabic)",
        subEn: "Sub Name (English)", subAr: "Sub Name (Arabic)"
      }
    },
    ar: {
      title: "لوحة التحكم", exit: "حفظ وخروج",
      tabs: { items: "العناصر", cats: "التصنيفات", brand: "الهوية" },
      brand: { title: "إعدادات الهوية", logoLabel: "الشعار (رابط أو رفع)", colorLabel: "اللون الرئيسي", secColorLabel: "اللون الثانوي (الداكن)" },
      cat: { title: "إدارة التصنيفات", addCat: "إضافة تصنيف رئيسي", addSub: "إضافة تصنيف فرعي" },
      labels: { upload: "رفع صورة", or: "أو", imgUrl: "رابط الصورة", processing: "جاري المعالجة..." },
      placeholders: {
        nameEn: "الاسم (إنجليزي)", nameAr: "الاسم (عربي)",
        descEn: "الوصف (إنجليزي)", descAr: "الوصف (عربي)",
        price: "السعر", imgUrl: "رابط الصورة أو الرفع",
        catEn: "اسم التصنيف (إنجليزي)", catAr: "اسم التصنيف (عربي)",
        subEn: "اسم الفرعي (إنجليزي)", subAr: "اسم الفرعي (عربي)"
      }
    }
  }[lang];

  // STATE
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatAr, setNewCatAr] = useState('');
  const [newSubEn, setNewSubEn] = useState('');
  const [newSubAr, setNewSubAr] = useState('');
  const [selectedCatForSub, setSelectedCatForSub] = useState(Object.keys(structure)[0] || '');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [newItem, setNewItem] = useState({ 
    nameEn: '', nameAr: '', descEn: '', descAr: '', price: '', image: '', 
    category: Object.keys(structure)[0] || 'FOOD', 
    subCategory: (structure[Object.keys(structure)[0]] || [])[0] || '' 
  });

  useEffect(() => {
    if (!structure[newItem.category]) {
      const firstCat = Object.keys(structure)[0];
      if (firstCat) setNewItem(prev => ({ ...prev, category: firstCat, subCategory: structure[firstCat]?.[0] || '' }));
    }
  }, [structure]);

  // --- WEBP CONVERSION LOGIC ---
  const convertToWebP = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Resize large images
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = (scaleSize < 1) ? MAX_WIDTH : img.width;
          canvas.height = (scaleSize < 1) ? img.height * scaleSize : img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const webpData = canvas.toDataURL('image/webp', 0.7);
          resolve(webpData);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 1. Handle Item Image Upload
  const handleItemImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      try {
        const webpImage = await convertToWebP(file);
        setNewItem({ ...newItem, image: webpImage });
        if (addToast) addToast("Image processed successfully", "success");
      } catch (error) {
        if (addToast) addToast("Failed to process image", "error");
      }
      setIsProcessing(false);
    }
  };

  // 2. Handle Logo Upload (NEW)
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      try {
        const webpLogo = await convertToWebP(file);
        setLogo(webpLogo);
        if (addToast) addToast("Logo updated successfully", "success");
      } catch (error) {
        if (addToast) addToast("Failed to upload logo", "error");
      }
      setIsProcessing(false);
    }
  };

  // --- HANDLERS ---
  const handleAddItem = () => {
    if (!newItem.nameEn || !newItem.price) {
      if (addToast) addToast("Please fill Name and Price", "error");
      return;
    }
    const item = {
      id: Date.now(),
      name: { en: newItem.nameEn, ar: newItem.nameAr || newItem.nameEn },
      description: { en: newItem.descEn || '', ar: newItem.descAr || '' },
      price: Number(newItem.price),
      image: newItem.image,
      category: newItem.category,
      subCategory: newItem.subCategory
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ ...newItem, nameEn: '', nameAr: '', descEn: '', descAr: '', price: '', image: '' });
    if (addToast) addToast("Item added successfully", "success");
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Delete this item?")) {
      setMenuItems(menuItems.filter(i => i.id !== id));
      if (addToast) addToast("Item deleted", "info");
    }
  };

  const handleAddCategory = () => {
    if (!newCatEn) return;
    const key = newCatEn.toUpperCase().replace(/\s/g, '_');
    setStructure({ ...structure, [key]: [] });
    setTranslations(prev => ({ ...prev, en: { ...prev.en, [key]: newCatEn }, ar: { ...prev.ar, [key]: newCatAr || newCatEn } }));
    setNewCatEn(''); setNewCatAr('');
    if (addToast) addToast("Category added", "success");
  };

  const handleDeleteCategory = (catKey) => {
    if (window.confirm("Delete category?")) {
      const newStruct = { ...structure };
      delete newStruct[catKey];
      setStructure(newStruct);
      if (addToast) addToast("Category deleted", "info");
    }
  };

  const handleAddSubCategory = (catKey) => {
    if (!newSubEn) return;
    const subKey = newSubEn.toUpperCase().replace(/\s/g, '_');
    setStructure({ ...structure, [catKey]: [...(structure[catKey]||[]), subKey] });
    setTranslations(prev => ({ ...prev, en: { ...prev.en, [subKey]: newSubEn }, ar: { ...prev.ar, [subKey]: newSubAr || newSubEn } }));
    setNewSubEn(''); setNewSubAr('');
    if (addToast) addToast("Sub-category added", "success");
  };

  const handleDeleteSubCategory = (catKey, subKey) => {
    setStructure({ ...structure, [catKey]: structure[catKey].filter(s => s !== subKey) });
    if (addToast) addToast("Sub-category deleted", "info");
  };
  
  const getTrans = (key) => translations[lang]?.[key] || key;
  const getSafeName = (item) => (!item || !item.name) ? "Unknown" : (typeof item.name === 'string' ? item.name : item.name[lang] || item.name.en || "Unknown");

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h1>{t.title}</h1>
        <button className={styles.closeBtn} onClick={backToMenu}>{t.exit}</button>
      </div>

      <div className={styles.tabs}>
        <button className={activeTab === 'items' ? styles.activeTab : ''} onClick={() => setActiveTab('items')}>{t.tabs.items}</button>
        <button className={activeTab === 'categories' ? styles.activeTab : ''} onClick={() => setActiveTab('categories')}>{t.tabs.cats}</button>
        <button className={activeTab === 'branding' ? styles.activeTab : ''} onClick={() => setActiveTab('branding')}>{t.tabs.brand}</button>
      </div>

      {activeTab === 'items' && (
        <div className={styles.itemsLayout}>
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <h3>{t.tabs.items}</h3>
              
              <div className={styles.formRow}>
                <input placeholder={t.placeholders.nameEn} value={newItem.nameEn} onChange={e => setNewItem({...newItem, nameEn: e.target.value})} />
                <input placeholder={t.placeholders.nameAr} value={newItem.nameAr} onChange={e => setNewItem({...newItem, nameAr: e.target.value})} style={{direction:'rtl'}} />
              </div>

              <div className={styles.formRow}>
                 <textarea placeholder={t.placeholders.descEn} value={newItem.descEn} onChange={e => setNewItem({...newItem, descEn: e.target.value})} />
                 <textarea placeholder={t.placeholders.descAr} value={newItem.descAr} onChange={e => setNewItem({...newItem, descAr: e.target.value})} style={{direction:'rtl'}} />
              </div>

              <input type="number" placeholder={t.placeholders.price} value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
              
              {/* ITEM IMAGE UPLOAD */}
              <div className={styles.imageUploadRow}>
                <input 
                  placeholder={t.placeholders.imgUrl} 
                  value={newItem.image} 
                  onChange={e => setNewItem({...newItem, image: e.target.value})} 
                  className={styles.urlInput}
                  disabled={isProcessing}
                />
                <span className={styles.orText}>{t.labels.or}</span>
                <label className={`${styles.uploadBtn} ${isProcessing ? styles.disabled : ''}`}>
                  {isProcessing ? t.labels.processing : t.labels.upload}
                  <input type="file" accept="image/*" hidden onChange={handleItemImageUpload} disabled={isProcessing} />
                </label>
              </div>

              {newItem.image && (
                <div style={{textAlign: 'center', margin: '5px 0'}}>
                  <img src={newItem.image} alt="Preview" style={{height: '80px', borderRadius: '5px', border: '1px solid #ccc', objectFit: 'contain'}} />
                </div>
              )}

              <div className={styles.formRow}>
                  <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value, subCategory: (structure[e.target.value]||[])[0]||''})}>
                    {Object.keys(structure).map(cat => <option key={cat} value={cat}>{getTrans(cat)}</option>)}
                  </select>
                
                  <select value={newItem.subCategory} onChange={e => setNewItem({...newItem, subCategory: e.target.value})}>
                    {(structure[newItem.category] || []).map(sub => <option key={sub} value={sub}>{getTrans(sub)}</option>)}
                  </select>
              </div>

              <button className={styles.saveBtn} onClick={handleAddItem} disabled={isProcessing}>Save</button>
            </div>
          </div>
          <div className={styles.listContainer}>
            {menuItems.map(item => (
              <div key={item.id} className={styles.miniCard}>
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <img src={item.image} alt="" style={{background: '#eee'}} />
                  <div>
                    <strong>{getSafeName(item)}</strong>
                    <div style={{fontSize:'0.8rem', opacity:0.6}}>${item.price}</div>
                    <div style={{fontSize:'0.7rem', color: 'var(--accent-color)'}}>{getTrans(item.category)} &gt; {getTrans(item.subCategory)}</div>
                  </div>
                </div>
                <button className={styles.closeBtn} style={{width:'auto', padding:'5px 10px'}} onClick={() => handleDeleteItem(item.id)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className={styles.catLayout}>
          <h3>{t.cat.title}</h3>
          <div className={styles.addCatRow}>
            <input placeholder={t.placeholders.catEn} value={newCatEn} onChange={e => setNewCatEn(e.target.value)} />
            <input placeholder={t.placeholders.catAr} value={newCatAr} onChange={e => setNewCatAr(e.target.value)} style={{direction: 'rtl'}} />
            <button className={styles.saveBtn} onClick={handleAddCategory}>{t.cat.addCat}</button>
          </div>
          <hr className={styles.divider} />
          {Object.keys(structure).map(cat => (
            <div key={cat} className={styles.treeNode}>
              <div className={styles.catHeader}>
                <strong>{getTrans(cat)} <small style={{opacity:0.5}}>({cat})</small></strong>
                <button className={styles.deleteTextBtn} onClick={() => handleDeleteCategory(cat)}>Delete</button>
              </div>
              <div className={styles.subList}>
                {structure[cat].map(sub => (
                  <span key={sub} className={styles.tag}>
                    {getTrans(sub)}
                    <span onClick={() => handleDeleteSubCategory(cat, sub)} style={{marginLeft:'5px', cursor:'pointer', color:'red'}}>×</span>
                  </span>
                ))}
              </div>
              <div className={styles.addSubRow}>
                 <input placeholder={t.placeholders.subEn} value={selectedCatForSub === cat ? newSubEn : ''} onChange={e => { setSelectedCatForSub(cat); setNewSubEn(e.target.value); }} />
                 <input placeholder={t.placeholders.subAr} value={selectedCatForSub === cat ? newSubAr : ''} onChange={e => { setSelectedCatForSub(cat); setNewSubAr(e.target.value); }} style={{direction: 'rtl'}} />
                 <button className={styles.addTagBtn} onClick={() => handleAddSubCategory(cat)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'branding' && (
        <div className={styles.brandingContainer}>
           <h3>{t.brand.title}</h3>
           
           {/* LOGO UPLOAD SECTION */}
           <div className={styles.formGroup}>
             <label>{t.brand.logoLabel}</label>
             <div className={styles.imageUploadRow}>
               <input 
                 className={`${styles.fullInput} ${styles.urlInput}`}
                 value={logo} 
                 onChange={(e) => setLogo(e.target.value)} 
                 placeholder={t.placeholders.imgUrl}
                 disabled={isProcessing}
               />
               <span className={styles.orText}>{t.labels.or}</span>
               <label className={`${styles.uploadBtn} ${isProcessing ? styles.disabled : ''}`}>
                  {isProcessing ? t.labels.processing : t.labels.upload}
                  <input type="file" accept="image/*" hidden onChange={handleLogoUpload} disabled={isProcessing} />
               </label>
             </div>
             
             <div className={styles.preview}>
               <img src={logo} alt="Logo Preview" />
             </div>
           </div>
           
           <div className={styles.formGroup}>
             <label>{t.brand.colorLabel}</label>
             <div className={styles.colorPickerWrapper}>
               <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className={styles.colorInput} />
               <span>{accentColor}</span>
             </div>
           </div>
           <div className={styles.formGroup}>
             <label>{t.brand.secColorLabel}</label>
             <div className={styles.colorPickerWrapper}>
               <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className={styles.colorInput} />
               <span>{secondaryColor}</span>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;