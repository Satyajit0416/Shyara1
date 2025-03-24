import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Admin() {
  const addProduct = async () => {
    const newProduct = {
      name: "Shyara Saree",
      price: 2999,
      category: "Ethnic Wear",
      image: "https://via.placeholder.com/150",
      description: "Beautiful saree for festive wear.",
      size: ["One Size"],
      color: "Red",
    };
    try {
      await addDoc(collection(db, 'products'), newProduct);
      console.log('Product added:', newProduct.name);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Admin Panel</h2>
      <button className="btn btn-primary" onClick={addProduct}>
        Add New Product
      </button>
    </div>
  );
}

export default Admin;