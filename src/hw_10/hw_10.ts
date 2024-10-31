function DeprecatedMethod(reason: string, replacementMethod?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.warn(`Warning: ${propertyKey} is deprecated. ${reason}`);
            if (replacementMethod) {
                console.warn(`Please use ${replacementMethod} instead.`);
            }
            return originalMethod.apply(this, args);
        };
    };
}

class SomeClass {
    @DeprecatedMethod("This method is outdated.", "newMethod")
    oldMethod() {
        console.log("Old method.");
    }

    newMethod() {
        console.log("New method.");
    }
}

// const example = new SomeClass();
// example.oldMethod();

function MinLength(min: number) {
    return function (target: any, propertyKey: string){
        let value: string;

        Object.defineProperty(target,propertyKey, {
            get: () => value,
            set: (newValue: string) => {
                if (newValue.length < min) {
                    throw new Error(`${propertyKey} should have at least ${min} characters.`)
                }
                value = newValue;
            },
            enumerable: true,
            configurable: true,
        });
    };
}

function MaxLength(max: number) {
    return function (target: any, propertyKey: string){
        let value: string;

        Object.defineProperty(target,propertyKey, {
            get: () => value,
            set: (newValue: string) => {
                if (newValue.length > max) {
                    throw new Error(`${propertyKey} should have no more than ${max} characters.`);
                }
                value = newValue;
            },
            enumerable: true,
            configurable: true,
        });
    };
}

function Email(target: any, propertyKey: string) {
    let value: string;

    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newValue)) {
                throw new Error(`${propertyKey} should be a valid email address.`);
            }
            value = newValue;
        },
        enumerable: true,
        configurable: true,
    });
}

class User {
    @MinLength(3)
    @MaxLength(25)
    username: string;

    @Email
    email: string;

    constructor(username: string, email: string) {
        this.username = username; 
        this.email = email;
    }
}
