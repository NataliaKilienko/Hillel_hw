"use strict";
// 1
const itemQuantities = {
    pens: 20,
    notebooks: "15 packs",
    erasers: 30
};
const eventHandlers = {
    showAlert: (message) => alert(message),
    multiplyNumbers: (x, y) => console.log(x * y)
};
const favoriteBooks = {
    0: "1984",
    1: "To Kill a Mockingbird",
    2: "The Great Gatsby"
};
const productDetails = {
    id: 101,
    name: "Laptop",
    price: 1200,
    stock: 50,
    description: "A powerful gaming laptop"
};
const manager = {
    id: 102,
    fullName: "John Doe",
    position: "Project Manager",
    salary: 80000,
    department: "Development",
    country: "Ukraine"
};
// 6
function validateNumericValues(obj, keys) {
    return keys.every(key => typeof obj[key] === "number");
}
const shoppingCart = {
    apples: 4,
    oranges: 3,
    watermelons: 2
};
console.log(validateNumericValues(shoppingCart, ["apples", "oranges"])); // true
console.log(validateNumericValues(shoppingCart, ["apples", "invalidKey"])); // false
