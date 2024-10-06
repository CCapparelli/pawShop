var formCadastrar    = $('#formCadastrar');
var txtUserName      = $('#txtUserName');
var txtUserEmail     = $('#txtUserEmail');
var txtPassword     = $('#txtPassword');
var txtPassword2    = $('#txtPassword2');
var chkTermos       = $('#chkTermos');

formCadastrar.on('submit', (e) => {
    e.preventDefault();
    cadastrar();
});

function cadastrar() {
    try {
        assurePasswords();

        var user = new User(txtUserName.val(),txtUserEmail.val(),txtPassword.val());
        cadastrarUsuario(user);
        
        alert(`${user.name} cadastrado com sucesso.`);
        window.location.href = 'index.html';
    }
    catch(error) {
        alert(error.message);
    }
}

function assurePasswords() {
    var pass1 = txtPassword.val();
    var pass2 = txtPassword2.val();
    
    if (pass1 !== pass2) {
        throw new Error('Senhas não conferem');
    }
}