import { db, storage } from './firebase-config.js';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageFileInput = document.getElementById('imageFile');  // Make sure input type="file" id="imageFile"
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');

const productRef = collection(db, 'products');

addProductBtn.onclick = async () => {
  console.log('Add button clicked');
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value.trim());
  const file = imageFileInput.files[0];
  console.log({ name, price, file });

  if (!name || isNaN(price) || !file) {
    alert('Please fill all fields and select an image file.');
    return;
  }

  try {
    // Prevent duplicates by name
    const q = query(productRef, where('name', '==', name));
    const existing = await getDocs(q);
    console.log('Existing docs:', existing.size);
    if (!existing.empty) {
      alert('Product with this name already exists.');
      return;
    }

    // Upload image file to Firebase Storage
    const storageRef = ref(storage, `product-images/${Date.now()}_${file.name}`);
    const uploadSnapshot = await uploadBytes(storageRef, file);
    console.log('Upload successful', uploadSnapshot);

    // Get downloadable URL
    const imageUrl = await getDownloadURL(uploadSnapshot.ref);
    console.log('Image URL:', imageUrl);

    // Add product data to Firestore
    await addDoc(productRef, { name, price: Math.round(price * 100), image: imageUrl });

    alert('Product added successfully!');

    // Clear inputs
    nameInput.value = '';
    priceInput.value = '';
    imageFileInput.value = '';

    // Reload product list
    loadProducts();
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Failed to add product.');
  }
};


async function loadProducts() {
  const snapshot = await getDocs(productRef);
  productList.innerHTML = '';

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${data.image}" alt="${data.name}" />
      <h3>${data.name}</h3>
      <p>GHS ${(data.price / 100).toFixed(2)}</p>
      <button onclick="deleteProduct('${docSnap.id}')">❌ Delete</button>
    `;
    productList.appendChild(div);
  });
}

window.deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    await deleteDoc(doc(db, 'products', id));
    loadProducts();
  }
};

// Load existing products on page load
loadProducts();
