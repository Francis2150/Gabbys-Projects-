// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn_QB-tl2nUFkHXwdlEh7G_REUI5_rO6U",
  authDomain: "gabbytrial-4a9a9.firebaseapp.com",
  projectId: "gabbytrial-4a9a9",
  storageBucket: "gabbytrial-4a9a9.appspot.com",
  messagingSenderId: "507301585683",
  appId: "1:507301585683:web:0fce82879396f8366db0e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);  // <-- Add this

export { db, storage };  // <-- Export storage too
