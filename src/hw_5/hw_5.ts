// 1

interface StringOrNumberIndex {
    [key: string]: number | string;
}

const itemQuantities: StringOrNumberIndex = {
    pens: 20,
    notebooks: "15 packs",
    erasers: 30
};

// 2

interface FunctionIndex {
    [key: string]: (...args: any[]) => void;
}

const eventHandlers: FunctionIndex = {
    showAlert: (message: string) => alert(message),
    multiplyNumbers: (x: number, y: number) => console.log(x * y)
};

// 3

interface ArrayLikeObject {
    [index: number]: string;
}

const favoriteBooks: ArrayLikeObject = {
    0: "1984",
    1: "To Kill a Mockingbird",
    2: "The Great Gatsby"
};

// 4

interface MixedObject {
    id: number;
    name: string;
    [key: string]: number | string;
}

const productDetails: MixedObject = {
    id: 101,
    name: "Laptop",
    price: 1200,
    stock: 50,
    description: "A powerful gaming laptop"
};

// 5

interface Person {
    id: number;
    fullName: string;
    [key: string]: string | number; 
}

interface Employee extends Person {
    position: string;
    salary: number;
}

const manager: Employee = {
    id: 102,
    fullName: "John Doe",
    position: "Project Manager",
    salary: 80000,
    department: "Development", 
    country: "Ukraine" 
};

// 6

function validateNumericValues(obj: { [key: string]: number }, keys: string[]): boolean {
    return keys.every(key => typeof obj[key] === "number");
}

const shoppingCart = {
    apples: 4,
    oranges: 3,
    watermelons: 2
};

console.log(validateNumericValues(shoppingCart, ["apples", "oranges"])); // true
console.log(validateNumericValues(shoppingCart, ["apples", "invalidKey"])); // false
