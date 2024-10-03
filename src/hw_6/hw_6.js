"use strict";
var EmployeeStatus;
(function (EmployeeStatus) {
    EmployeeStatus[EmployeeStatus["Active"] = 0] = "Active";
    EmployeeStatus[EmployeeStatus["Inactive"] = 1] = "Inactive";
    EmployeeStatus[EmployeeStatus["OnLeave"] = 2] = "OnLeave";
})(EmployeeStatus || (EmployeeStatus = {}));
class BaseDepartment {
    name;
    domain;
    employees = [];
    budget = { debit: 0, credit: 0 };
    constructor(name, domain) {
        this.name = name;
        this.domain = domain;
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    removeEmployee(employee) {
        this.employees = this.employees.filter(e => e !== employee);
    }
    isEmployeeInDepartment(employee) {
        return this.employees.includes(employee);
    }
}
function isPreHired(employee) {
    return employee.department === undefined;
}
function isActiveEmployee(employee) {
    return employee.status === EmployeeStatus.Active;
}
class AccountingDepartment extends BaseDepartment {
    constructor() {
        super("Accounting", "Finance");
    }
    calculateBalance() {
        return this.budget.debit - this.budget.credit;
    }
    processPayroll() {
        this.employees.forEach(employee => {
            if (isActiveEmployee(employee)) {
                this.paySalary(employee);
            }
        });
        console.log("Payroll processed for active employees.");
    }
    paySalary(employee) {
        if (isActiveEmployee(employee)) {
            console.log(`Paying internal salary for active employee ${employee.firstName} ${employee.lastName}`);
        }
        else {
            console.log(`${employee.firstName} ${employee.lastName} is not eligible for payroll.`);
        }
    }
}
class Company {
    departments = [];
    preHiredEmployees = [];
    addDepartment(department) {
        this.departments.push(department);
    }
    addPreHiredEmployee(employee) {
        this.preHiredEmployees.push(employee);
    }
    hireEmployee(preHired, department) {
        if (isPreHired(preHired)) {
            const newEmployee = {
                ...preHired,
                paymentInfo: preHired.bankAccountNumber,
                status: EmployeeStatus.Active,
                department: department
            };
            department.addEmployee(newEmployee);
            this.preHiredEmployees = this.preHiredEmployees.filter(e => e !== preHired);
            return newEmployee;
        }
        throw new Error("Invalid pre-hired employee");
    }
}
const accounting = new AccountingDepartment();
const company = new Company();
company.addDepartment(accounting);
const preHired = {
    firstName: "Nataliia",
    lastName: "Killienko",
    salary: 50000,
    bankAccountNumber: "11-22-333-22"
};
company.addPreHiredEmployee(preHired);
const hiredEmployee = company.hireEmployee(preHired, accounting);
console.log("Processing payroll in Accounting Department:");
accounting.processPayroll();
console.log("Setting employee status to OnLeave:");
hiredEmployee.status = EmployeeStatus.OnLeave;
console.log(`${hiredEmployee.firstName} is now on leave.`);
accounting.removeEmployee(hiredEmployee);
console.log(`Removed employee: ${hiredEmployee.firstName} ${hiredEmployee.lastName} :с`);
const isStillInDepartment = accounting.isEmployeeInDepartment(hiredEmployee);
console.log(`Is ${hiredEmployee.firstName} still in the department? ${isStillInDepartment ? "Yes c: " : "No :с "}`);
