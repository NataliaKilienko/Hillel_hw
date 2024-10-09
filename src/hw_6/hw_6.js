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
class DepartmentImpl extends BaseDepartment {
    calculateBalance() {
        return this.budget.credit - this.budget.debit;
    }
}
class AccountingDepartment extends BaseDepartment {
    constructor() {
        super("Accounting", "Finance");
    }
    calculateBalance() {
        return this.budget.credit - this.budget.debit;
    }
    processPayroll() {
        this.salaryPayment();
        console.log("Payroll processed for active employees.");
    }
    paySalary(employee) {
        if (isEmployee(employee)) {
            employee.status === EmployeeStatus.Active
                ? this.internalPayment(employee)
                : console.log(`${employee.firstName} ${employee.lastName} is not eligible for payroll.`);
        }
        else {
            this.externalPayment(employee);
        }
    }
    salaryPayment() {
        this.employees.forEach(employee => this.paySalary(employee));
    }
    internalPayment(employee) {
        console.log(`Internal payment for active employee ${employee.firstName} ${employee.lastName}`);
    }
    externalPayment(preHire) {
        console.log(`External payment for pre-hired employee ${preHire.firstName} ${preHire.lastName}`);
    }
}
function isPreHired(employee) {
    return employee.department === undefined;
}
function isActiveEmployee(employee) {
    return employee.status === EmployeeStatus.Active;
}
function isEmployee(employee) {
    return employee.department !== undefined;
}
class Company {
    name;
    departments = [];
    preHiredEmployees = [];
    allEmployees = [];
    constructor(name) {
        this.name = name;
    }
    addDepartment(department) {
        this.departments.push(department);
        this.updateAllEmployees();
    }
    addPreHiredEmployee(employee) {
        this.preHiredEmployees.push(employee);
        this.updateAllEmployees();
    }
    hireEmployee(preHired, department) {
        if (!isPreHired(preHired)) {
            throw new Error("Invalid pre-hired employee");
        }
        const newEmployee = {
            ...preHired,
            paymentInfo: preHired.bankAccountNumber,
            status: EmployeeStatus.Active,
            department: department
        };
        department.addEmployee(newEmployee);
        this.preHiredEmployees = this.preHiredEmployees.filter(e => e !== preHired);
        this.updateAllEmployees();
        return newEmployee;
    }
    getAllEmployees() {
        return this.allEmployees;
    }
    updateAllEmployees() {
        const departmentEmployees = this.departments.flatMap(dept => dept.employees);
        this.allEmployees = [...this.preHiredEmployees, ...departmentEmployees];
    }
}
const company = new Company("Test Company");
const accounting = new AccountingDepartment();
const department = new DepartmentImpl("IT", "Technology");
company.addDepartment(accounting);
company.addDepartment(department);
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
console.log(`Removed employee: ${hiredEmployee.firstName} ${hiredEmployee.lastName}`);
const isStillInDepartment = accounting.isEmployeeInDepartment(hiredEmployee);
console.log(`Is ${hiredEmployee.firstName} still in the department? ${isStillInDepartment ? "Yes" : "No"}`);
accounting.paySalary(hiredEmployee);
console.log("All employees in the company:", company.getAllEmployees());
