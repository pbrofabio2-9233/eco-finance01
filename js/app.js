import { db, auth } from "./storage.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {

  const saveBtn = document.getElementById("saveBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // MENU
  document.querySelectorAll("nav button[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;

      document.querySelectorAll("main section").forEach(sec => {
        sec.style.display = "none";
      });

      document.getElementById(page).style.display = "block";
    });
  });

  // SALVAR
  saveBtn.addEventListener("click", saveTransaction);

  // LOGOUT
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadTransactions();
  } else {
    window.location.href = "login.html";
  }
});

async function saveTransaction() {
  const description = document.getElementById("description").value;
  const value = Number(document.getElementById("value").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

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

  document.getElementById("description").value = "";
  document.getElementById("value").value = "";
}

function loadTransactions() {
  const list = document.getElementById("transactionsList");
  const summary = document.getElementById("summary");

  const q = query(
    collection(db, "users", currentUser.uid, "transactions"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    let total = 0;

    snapshot.forEach((doc) => {
      const t = doc.data();
      total += t.type === "entrada" ? t.value : -t.value;

      const div = document.createElement("div");
      div.className = "transaction";

      div.innerHTML = `
        <span>${t.description} (${t.category})</span>
        <strong>${t.type === "entrada" ? "+" : "-"} R$ ${t.value}</strong>
      `;

      list.appendChild(div);
    });

    summary.textContent =
      snapshot.size === 0
        ? "Nenhuma transação registrada."
        : `Saldo atual: R$ ${total}`;
  });
}