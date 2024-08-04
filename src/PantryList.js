// src/PantryList.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';  // Adjusted import path
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore';

const PantryList = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantryItems'), (snapshot) => {
      const newItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(newItems);
    });

    return () => unsubscribe();
  }, []);

  const handleAddItem = async () => {
    if (itemName.trim() === '') return;
    await addDoc(collection(db, 'pantryItems'), { name: itemName, quantity: itemQuantity });
    setItemName('');
    setItemQuantity(1);
  };

  const handleIncreaseQuantity = async (id, quantity) => {
    await updateDoc(doc(db, 'pantryItems', id), { quantity: quantity + 1 });
  };

  const handleDecreaseQuantity = async (id, quantity) => {
    if (quantity > 1) {
      await updateDoc(doc(db, 'pantryItems', id), { quantity: quantity - 1 });
    }
  };

  const handleRemoveItem = async (id) => {
    await deleteDoc(doc(db, 'pantryItems', id));
  };

  return (
    <div id='parent'>
      <h1>Pantry List</h1>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={handleAddItem}>Add Item</button>
     
      <ul>
        {items.map(item => (
           <div id='list'>
          <li key={item.id}>
          <div id="item-details">
            {item.name} - {item.quantity}
            </div>
            <div id='manage'>
            <button id='add' onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>+</button>
            <button id='subtract' onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>-</button> 
            <button id='remove' onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </li>
          </div>
        ))}
      </ul>
      
    </div>
  );
};

export default PantryList;
