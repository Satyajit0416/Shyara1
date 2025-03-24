// const { initializeApp } = require('firebase/app');
// const { getFirestore, collection, getDocs, addDoc, updateDoc, doc } = require('firebase/firestore');

// const firebaseConfig = {
//   apiKey: "AIzaSyCe90FaYPSZwc4ITVCoe_MiCcFCCA25-JI",
//   authDomain: "shyara-fc8f6.firebaseapp.com",
//   databaseURL: "https://shyara-fc8f6-default-rtdb.firebaseio.com",
//   projectId: "shyara-fc8f6",
//   storageBucket: "shyara-fc8f6.appspot.com",
//   messagingSenderId: "952670844305",
//   appId: "1:952670844305:web:d582ed5ce5c4972d565630",
//   measurementId: "G-P0GS7P2JNR"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const sampleProducts = [
//   {
//     name: "Shyara Kurti",
//     price: 1499,
//     category: "Ethnic Wear",
//     image: "https://images.unsplash.com/photo-1602578558279-87d3f6e53e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // External URL
//     description: "Stylish kurti for casual wear.",
//     size: ["S", "M", "L"],
//     color: "Blue",
//   },
//   {
//     name: "Shyara Lehenga",
//     price: 4999,
//     category: "Ethnic Wear",
//     image: "https://images.unsplash.com/photo-1607892842228-6e5ebede9e00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // External URL
//     description: "Elegant lehenga for special occasions.",
//     size: ["M", "L"],
//     color: "Green",
//   },
//   {
//     name: "Shyara Maxi Dress",
//     price: 1999,
//     category: "Western Wear",
//     image: "https://images.unsplash.com/photo-1591369822418-7c2a8f65c6fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // External URL
//     description: "Chic maxi dress for summer vibes.",
//     size: ["S", "M"],
//     color: "Black",
//   },
//   // Example: Same naam ka product with new image
//   {
//     name: "Shyara Kurti",
//     price: 1499,
//     category: "Ethnic Wear",
//     image: "https://images.unsplash.com/photo-1602578558280-3e3e6e53e6a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Naya URL for update
//     description: "Stylish kurti for casual wear.",
//     size: ["S", "M", "L"],
//     color: "Blue",
//   },
// ];

// async function updateOrAddProducts() {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'products'));
//     const existingProducts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//     for (const product of sampleProducts) {
//       const matchedProduct = existingProducts.find((p) => p.name === product.name);

//       if (matchedProduct) {
//         const productRef = doc(db, 'products', matchedProduct.id);
//         await updateDoc(productRef, { image: product.image });
//         console.log(`Updated image for ${product.name}: ${product.image}`);
//       } else {
//         await addDoc(collection(db, 'products'), product);
//         console.log(`Added new product: ${product.name} with image URL: ${product.image}`);
//       }
//     }
//     console.log('All products processed successfully!');
//   } catch (error) {
//     console.error('Error processing products:', error);
//   }
// }

// updateOrAddProducts();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, updateDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCe90FaYPSZwc4ITVCoe_MiCcFCCA25-JI",
  authDomain: "shyara-fc8f6.firebaseapp.com",
  databaseURL: "https://shyara-fc8f6-default-rtdb.firebaseio.com",
  projectId: "shyara-fc8f6",
  storageBucket: "shyara-fc8f6.appspot.com",
  messagingSenderId: "952670844305",
  appId: "1:952670844305:web:d582ed5ce5c4972d565630",
  measurementId: "G-P0GS7P2JNR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleProducts = [
  { name: "Shyara Kurti", price: 1499, category: "Ethnic Wear", image: "https://images.unsplash.com/photo-1602578558279-87d3f6e53e6a", description: "Stylish kurti for casual wear.", size: ["S", "M", "L"], color: "Blue" },
  { name: "Shyara Lehenga", price: 4999, category: "Ethnic Wear", image: "https://images.unsplash.com/photo-1607892842228-6e5ebede9e00", description: "Elegant lehenga for special occasions.", size: ["M", "L"], color: "Green" },
  { name: "Shyara Maxi Dress", price: 1999, category: "Western Wear", image: "https://images.unsplash.com/photo-1591369822418-7c2a8f65c6fb", description: "Chic maxi dress for summer vibes.", size: ["S", "M"], color: "Black" },
];

async function addProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    if (querySnapshot.docs.length > 0) {
      console.log('Products already exist, skipping...');
      return;
    }
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), product);
      console.log(`Added: ${product.name}`);
    }
    console.log('All products added!');
  } catch (error) {
    console.error('Error adding products:', error);
  }
}

addProducts();