import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// SUA CONFIG DO FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyAPEv9rP_Ek60NrGfMJnEO3dPzFM4j36cI",
  authDomain: "master-finance-bce36.firebaseapp.com",
  projectId: "master-finance-bce36",
  storageBucket: "master-finance-bce36.firebasestorage.app",
  messagingSenderId: "241893077182",
  appId: "1:241893077182:web:b8100d0ca968ba90a42eef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const totalReceitasEl = document.getElementById("totalReceitas");
const totalDespesasEl = document.getElementById("totalDespesas");
const saldoEl = document.getElementById("saldo");
const listaEl = document.getElementById("listaTransacoes");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Usuário não logado!");
    return;
  }

  const transacoesRef = collection(db, "users", user.uid, "transacoes");
  const snapshot = await getDocs(transacoesRef);

  let totalReceitas = 0;
  let totalDespesas = 0;

  listaEl.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    if (data.tipo === "receita") {
      totalReceitas += data.valor;
    } else {
      totalDespesas += data.valor;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      ${data.descricao} - R$ ${data.valor} 
      <span class="${data.tipo === "receita" ? "receita" : "despesa"}">
        (${data.tipo})
      </span>
    `;
    listaEl.appendChild(li);
  });

  const saldo = totalReceitas - totalDespesas;

  totalReceitasEl.innerText = "R$ " + totalReceitas.toFixed(2);
  totalDespesasEl.innerText = "R$ " + totalDespesas.toFixed(2);
  saldoEl.innerText = "R$ " + saldo.toFixed(2);
});