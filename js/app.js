import { db, auth } from "./storage.js";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const saveBtn = document.getElementById("saveBtn");
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadTransactions();
  }
});

saveBtn.addEventListener("click", async () => {
  if (!currentUser) {
    alert("Usuário não autenticado");
    return;
  }

  const description = document.getElementById("description").value;
  const value = Number(document.getElementById("value").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  await addDoc(
    collection(db, "users", currentUser.uid, "transactions"),
    {
      description,
      value,
      type,
      category,
      createdAt: new Date()
    }
  );

  alert("Transação salva com sucesso!");
});

function loadTransactions() {
  const q = query(
    collection(db, "users", currentUser.uid, "transactions"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    console.log("Transações:", snapshot.size);
  });
}