import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('image');
const listDiv = document.getElementById('productList');

const productRef = collection(db, 'products');

document.getElementById('addProductBtn').onclick = async () => {
  const name = nameInput.value.trim();
  const price = parseInt(priceInput.value.trim());
  const image = imageInput.value.trim();

  if (!name || !price || !image) return alert("Fill all fields");

  await addDoc(productRef, { name, price, image });
  loadProducts();
};

async function loadProducts() {
  const snapshot = await getDocs(productRef);
  listDiv.innerHTML = '';
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <b>${data.name}</b> - GHS ${(data.price / 100).toFixed(2)}
      <button onclick="deleteProduct('${docSnap.id}')">❌</button>
    `;
    listDiv.appendChild(div);
  });
}

window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, 'products', id));
  loadProducts();
};

loadProducts();
