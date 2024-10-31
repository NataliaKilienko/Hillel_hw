"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function DeprecatedMethod(options) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.warn(`Warning: ${propertyKey} is deprecated. ${options.reason}`);
            if (options.replacementMethod) {
                console.warn(`Please use ${options.replacementMethod} instead.`);
            }
            return originalMethod.apply(this, args);
        };
    };
}
class SomeClass {
    oldMethod() {
        console.log("Old method.");
    }
    newMethod() {
        console.log("New method.");
    }
}
__decorate([
    DeprecatedMethod({ reason: "This method is outdated.", replacementMethod: "newMethod" })
], SomeClass.prototype, "oldMethod", null);
const example = new SomeClass();
example.oldMethod();
function MinLength(min) {
    return function (target, propertyKey) {
        let value;
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue) => {
                if (newValue.length < min) {
                    throw new Error(`${propertyKey} should have at least ${min} characters.`);
                }
                value = newValue;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
function MaxLength(max) {
    return function (target, propertyKey) {
        let value;
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue) => {
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
function Email(target, propertyKey) {
    let value;
    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue) => {
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
    username;
    email;
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }
}
__decorate([
    MinLength(3),
    MaxLength(25)
], User.prototype, "username", void 0);
__decorate([
    Email
], User.prototype, "email", void 0);
