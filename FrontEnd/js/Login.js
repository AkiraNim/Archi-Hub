const ADMIN_CREDENCIAIS = {
    email: "admin@archhub.com",
    senha: "415263"
};

function loginSimulado() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    if (email === ADMIN_CREDENCIAIS.email && senha === ADMIN_CREDENCIAIS.senha) {
        window.location.href = "AdminBoard.html";
    } else {
        alert("Credenciais inválidas.");
    }
}