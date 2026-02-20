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

let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {

  const saveBtn = document.getElementById("saveBtn");

  if (!saveBtn) {
    console.error("Botão salvar não encontrado");
    return;
  }

  saveBtn.addEventListener("click", saveTransaction);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadTransactions();
  }
});

async function saveTransaction() {
  if (!currentUser) {
    alert("Usuário não autenticado");
    return;
  }

  const description = document.getElementById("description")?.value;
  const value = Number(document.getElementById("value")?.value);
  const type = document.getElementById("type")?.value;
  const category = document.getElementById("category")?.value;

  if (!description || !value) {
    alert("Preencha todos os campos");
    return;
  }

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
}

function loadTransactions() {
  const list = document.getElementById("transactionsList");

  const q = query(
    collection(db, "users", currentUser.uid, "transactions"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();

      const div = document.createElement("div");
      div.className = "transaction";

      div.innerHTML = `
        <span>${data.description} (${data.category})</span>
        <strong>${data.type === "entrada" ? "+" : "-"} R$ ${data.value}</strong>
      `;

      list.appendChild(div);
    });

    console.log("Transações:", snapshot.size);
  });
}