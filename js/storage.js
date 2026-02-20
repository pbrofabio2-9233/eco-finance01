// js/storage.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 🔥 CONFIG DO SEU FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAPEv9rP_Ek60NrGfMJnEO3dPzFM4j36cI",
  authDomain: "master-finance-bce36.firebaseapp.com",
  projectId: "master-finance-bce36",
  storageBucket: "master-finance-bce36.firebasestorage.app",
  messagingSenderId: "241893077182",
  appId: "1:241893077182:web:b8100d0ca968ba90a42eef"
};

// 🔥 Inicialização
const app = initializeApp(firebaseConfig);

// 🔥 Serviços
export const db = getFirestore(app);
export const auth = getAuth(app);