function cadastrarUsuario(user) {
    try {
        cadastro.add(user);
        save(src_users, cadastro.toJsonString());
    }
    catch (error) {
        throw new Error(`Usuário não cadastrado: ${error.message}`);
    }
}

// Function to download data to a file
function save(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

// function download(data, filename, type) {
//     var file = new Blob([data], {type: type});
//     if (window.navigator.msSaveOrOpenBlob) {
//         window.navigator.msSaveOrOpenBlob(file, filename);
//     } else { 
//         var url = URL.createObjectURL(file);
//         var a = document.createElement("a");
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
        
//         a.click();
//         setTimeout(function() {
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(url);  
//         }, 0); 
//     }
// }

function procurarPor(input, senha) {
    try {
        var user = cadastro.UserByNameOrEmail(input);
        if (!user) {
            throw new Error('Nome ou email inválidos.');
        }
        if (user.senha !== senha) {
            throw new Error('Senha inválida.');
        }
        return user;
    }
    catch (error) {
        throw new Error(`Usuário não localizado: ${error.message}`);
    }
}