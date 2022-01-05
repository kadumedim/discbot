const { DocumentStore } = require('ravendb');
const store = new DocumentStore('http://192.168.0.16:8080', 'discbot');
store.initialize();
const session = store.openSession();

let product1 = {
    title: 'iPhone X',
    price: 999.99,
    id: 1,
    '@metadata': {
        '@collection': 'Phones'
    }
};
let product2 = {
    title: 'iPhone 11',
    price: 999.99,
    id: 2,
    '@metadata': {
        '@collection': 'Phones'
    }
};
let product3 = {
    title: 'iPhone 12',
    price: 999.99,
    id: 3,
    '@metadata': {
        '@collection': 'Phones'
    }
};

session.store(product1, '1');
session.store(product2, '2');
session.store(product3, '3');
console.log(product1.id); // Products/1-A
console.log(product2.id); // Products/1-A
console.log(product3.id); // Products/1-A
session.saveChanges();