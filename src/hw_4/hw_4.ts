interface IPrintable {
    print(): void;
}

abstract class Shape {
    public readonly color: string;
    public readonly name: string;

    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }

    abstract calculateArea(): number;
}

class Circle extends Shape {
    private radius: number;

    constructor(color: string, radius: number) {
        super(color, "Circle");
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape implements IPrintable {
    protected width: number;
    protected height: number;

    constructor(color: string, width: number, height: number) {
        super(color, "Rectangle");
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    print(): void {
        console.log(`Rectangle area = ${this.width} * ${this.height}`);
    }
}

class Square extends Shape implements IPrintable {
    private sideLength: number;

    constructor(color: string, sideLength: number) {
        super(color, "Square");
        this.sideLength = sideLength;
    }

    calculateArea(): number {
        return this.sideLength * this.sideLength;
    }

    print(): void {
        console.log(`Square area = ${this.sideLength} * ${this.sideLength}`);
    }
}

class Triangle extends Shape {
    private base: number;
    private height: number;

    constructor(color: string, base: number, height: number) {
        super(color, "Triangle");
        this.base = base;
        this.height = height;
    }

    calculateArea(): number {
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
