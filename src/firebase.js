import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDqGgSkXf8ZhCDyLLM-IRcwRzWFeUy6VBs",
  authDomain: "bloomify-be8d9.firebaseapp.com",
  projectId: "bloomify-be8d9",
  storageBucket: "bloomify-be8d9.firebasestorage.app",
  messagingSenderId: "18416450251",
  appId: "1:18416450251:web:2428f1dcd75444b901794e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore correctly
const db = getFirestore(app);

export { db };