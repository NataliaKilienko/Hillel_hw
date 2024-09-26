"use strict";
class Shape {
    color;
    name;
    constructor(color, name) {
        this.color = color;
        this.name = name;
    }
}
class Circle extends Shape {
    radius;
    constructor(color, radius) {
        super(color, "Circle");
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(color, width, height) {
        super(color, "Rectangle");
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
    print() {
        console.log(`Rectangle area = ${this.width} * ${this.height}`);
    }
}
class Square extends Shape {
    sideLength;
    constructor(color, sideLength) {
        super(color, "Square");
        this.sideLength = sideLength;
    }
    calculateArea() {
        return this.sideLength * this.sideLength;
    }
    print() {
        console.log(`Square area = ${this.sideLength} * ${this.sideLength}`);
    }
}
class Triangle extends Shape {
    base;
    height;
    constructor(color, base, height) {
        super(color, "Triangle");
        this.base = base;
        this.height = height;
    }
    calculateArea() {
        return 0.5 * this.base * this.height;
    }
}
const circle = new Circle("Red", 5);
console.log(`${circle.name} area:`, circle.calculateArea());
const rectangle = new Rectangle("Blue", 4, 6);
console.log(`${rectangle.name} area:`, rectangle.calculateArea());
rectangle.print();
const square = new Square("Green", 4);
console.log(`${square.name} area:`, square.calculateArea());
square.print();
const triangle = new Triangle("Yellow", 5, 10);
console.log(`${triangle.name} area:`, triangle.calculateArea());
