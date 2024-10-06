const src_users = 'cadastro.json';

var currentUser;
var currentMode = 'light';
var cadastro    = new Users();


// https://drive.google.com/file/d/1RyhbFNkWbxr2MWOPWY72loG2cWt77VW7/view?usp=sharing

var offUserTitle = $('#offUserTitle');

function setup() {
    offUserTitle.innerHtml = currentUser ? currentUser.name : 'User name';
    

    fetch(src_users).then((res)  => res.text())
                    .then((txt) => {
                        var items = JSON.parse(txt);
                        cadastro.items = items;
                    })
                    .catch((e) => { 
                        console.error(e);
                        cadastro.items = [];
                    });
    
}

setup();