"use strict";
const myCalculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : NaN
};
function calculate(calculator, operation, a, b) {
    switch (operation) {
        case "add":
            return calculator.add(a, b);
        case "subtract":
            return calculator.subtract(a, b);
        case "multiply":
            return calculator.multiply(a, b);
        case "divide":
            return calculator.divide(a, b);
        default:
            throw new Error("Unknown operation");
    }
}
const resultSubtract = calculate(myCalculator, "subtract", 10, 4);
console.log(resultSubtract);
const resultAdd = calculate(myCalculator, "add", 10, 4);
console.log(resultAdd);
const bookService = {
    getBookById: (bookId) => books.find(book => book.id === bookId),
    getBooksByAuthor: (authorId) => books.filter(book => book.authorId === authorId),
    getAuthorById: (authorId) => authors.find(author => author.id === authorId),
    linkBooksToAuthors: () => {
        authors.forEach(author => {
            author.books = books.filter(book => book.authorId === author.id);
        });
    }
};
const authors = [
    { id: 1, name: 'J.K. Rowling', birthYear: 1965 },
    { id: 2, name: 'George R.R. Martin', birthYear: 1948 },
    { id: 3, name: 'J.R.R. Tolkien', birthYear: 1892 }
];
const books = [
    { id: 1, title: 'Harry Potter and the Philosopher\'s Stone', publishedYear: 1997, authorId: 1 },
    { id: 2, title: 'Harry Potter and the Chamber of Secrets', publishedYear: 1998, authorId: 1 },
    { id: 3, title: 'A Game of Thrones', publishedYear: 1996, authorId: 2 },
    { id: 4, title: 'The Fellowship of the Ring', publishedYear: 1954, authorId: 3 },
    { id: 5, title: 'The Two Towers', publishedYear: 1954, authorId: 3 },
    { id: 6, title: 'The Return of the King', publishedYear: 1955, authorId: 3 }
];
bookService.linkBooksToAuthors();
const book = bookService.getBookById(4);
const author = bookService.getAuthorById(3);
console.log(book);
console.log(author);
