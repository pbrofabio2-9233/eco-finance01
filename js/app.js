console.log("app.js carregado");
import { auth, db } from "./firebase.js";
import { collection, addDoc, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");

const saveBtn = document.getElementById("save");
const logoutBtn = document.getElementById("logout");

let userId = null;

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    userId = user.uid;
    loadTransactions();
  }
});

logoutBtn.onclick = () => signOut(auth);

saveBtn.onclick = async () => {
  const desc = document.getElementById("desc").value;
  const value = Number(document.getElementById("value").value);
  const type = document.getElementById("type").value;

  if (!desc || !value) return;

  await addDoc(collection(db, "transactions"), {
    userId,
    desc,
    value,
    type,
    date: new Date()
  });
};

function loadTransactions() {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));

  onSnapshot(q, snapshot => {
    list.innerHTML = "";
    let income = 0, expense = 0;

    snapshot.forEach(doc => {
      const t = doc.data();
      const li = document.createElement("li");
      li.innerText = `${t.desc} - R$ ${t.value}`;
      list.appendChild(li);

      t.type === "income" ? income += t.value : expense += t.value;
    });

    incomeEl.innerText = income;
    expenseEl.innerText = expense;
    balanceEl.innerText = income - expense;
  });
}