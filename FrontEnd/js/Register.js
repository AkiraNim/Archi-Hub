// Register.js
const firebaseConfig = {
  apiKey: "AIzaSyCEMIc5wkuvTqa49c7qn7DTP-w7WfIEdNo",
  authDomain: "archhub-a7ecb.firebaseapp.com",
  databaseURL: "https://archhub-a7ecb-default-rtdb.firebaseio.com",
  projectId: "archhub-a7ecb",
  storageBucket: "archhub-a7ecb.appspot.com",
  messagingSenderId: "101462436940",
  appId: "1:101462436940:web:c7e12cf6f3b77487acd8e9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.querySelector(".btn-enter button");

  registerBtn.addEventListener("click", function () {
    const username = document.querySelector("input[name='Username']").value;
    const password = document.querySelector("input[name='Password']").value;

    if (!username || !password ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const novoUsuarioRef = db.ref("usuarios").push();
    novoUsuarioRef
      .set({
        Username: username,
        Password: password
      })
      .then(() => {
        alert("Usuário cadastrado com sucesso.");
        window.location.href = "AdminBoard.html";
      })
      .catch((error) => {
        alert("Erro ao cadastrar: " + error.message);
      });
  });
});