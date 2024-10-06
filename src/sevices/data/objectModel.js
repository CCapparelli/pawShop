class Product {
    constructor(id, img, titulo, descricao, preco) {
        this.id = id;
        this.img = img;
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco = preco;
    }
}

class ShoppingCartItem {
    constructor(productId, qtd) {
        this.productId = productId;
        this.qtd = Number(qtd);
    }
}

class Catalog {
    constructor() {
        this.items = [];
    }
    add(item) {
        var x = this.ProductById(item);
        if (x) {
            x.qtd = x.qtd + 1;
        } else {
            this.items.push(item);
        }
    }
    
    increase(id) {
        var item = this.byId(id);
        item.qtd++;
    }
    
    decrease(id) {
        var item = this.byId(id);
        if (item.qtd > 1) {
            item.qtd--;
        }
    }
    
    remove(item) {
        var idx  = this.items.indexOf(item);
        this.items.splice(idx, 1);
    }

    ProductById = (id) => this.items.filter(x => x.id === id)[0];
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }
    add(item) {
        var x = this.byProductId(item.ProductId);
        if (x) {
            x.qtd = x.qtd + 1;
        } else {
            this.items.push(item);
        }
    }
    total() {
        var result = 0;
        this.items.forEach(x => {
            var product = catalog.ProductById(x.productId);
            result = result + (x.qtd * product.preco);
        });
        return result;
    }
    
    increase(id) {
        var item = this.byProductId(id);
        item.qtd++;
    }
    
    decrease(id) {
        var item = this.byProductId(id);
        if (item.qtd > 1) {
            item.qtd--;
        }
    }
    
    remove(item) {
        var idx  = this.items.indexOf(item);
        this.items.splice(idx, 1);
    }

    byProductId = (id) => this.items.filter(x => x.productId === id)[0];
}

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Users {
    constructor() {
        this.items = [];
    }

    toJsonString = () => JSON.stringify(this.items);

    add(item) {
        var x = this.UserByName(item.name);
        if (x) {
            throw new Error('Usuário já cadastrado.');
        } 
        x = this.UserByEmail(item.email);
        if (x) {
            throw new Error('Email já cadastrado.');
        } 
        this.items.push(item);
    }
    
    remove(item) {
        var idx  = this.items.indexOf(item);
        this.items.splice(idx, 1);
    }

    UserByName  = (value) => this.items.filter(x => x.name === value)[0];
    UserByEmail = (value) => this.items.filter(x => x.email === value)[0];
    UserByNameOrEmail = (value) => this.items.filter(x => (x.name === value) | (x.email === value))[0];
}