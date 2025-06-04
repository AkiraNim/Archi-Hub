const ADMIN_CREDENCIAIS = {
    email: "admin@archihub.com",
    senha: "415263"
};

const USER_CREDENCIAIS = {
    email: "user@archihub.com",
    senha: "123456"
};

function loginSimulado() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    if (email === ADMIN_CREDENCIAIS.email && senha === ADMIN_CREDENCIAIS.senha) {
        window.location.href = "AdminBoard.html";
    } else if (email === USER_CREDENCIAIS.email && senha === USER_CREDENCIAIS.senha) {
        window.location.href = "UserBoard.html";
    } else {
        alert("Credenciais inválidas.");
    }
}