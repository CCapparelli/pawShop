var formLogin    = $('#formLogin');
var txtUserInput = $('#txtUserInput');
var txtPassword  = $('#txtPassword');
var chkLembrar   = $('#chkLembrar');

formLogin.on('submit', (e) => {
    e.preventDefault();
    entrar();
});

function entrar() {
    var input = txtUserInput.val();
    var senha = txtPassword.val();
    try {
        currentUser = procurarPor(input, senha);
        if (currentUser) {
            window.location.href = '/';
        }
        else {
            alert('Ooops! Algo deu errado.')
        }
    }
    catch(error) {
        alert(error.message);
    }
}


