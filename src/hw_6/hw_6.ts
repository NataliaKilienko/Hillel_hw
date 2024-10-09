enum EmployeeStatus {
    Active,
    Inactive,
    OnLeave
}

interface PreHiredEmployee {
    firstName: string;
    lastName: string;
    salary: number;
    bankAccountNumber: string;
}

interface Employee extends PreHiredEmployee {
    paymentInfo: string;
    status: EmployeeStatus;
    department: Department;
}

interface Department {
    name: string;
    domain: string;
    employees: Employee[];
    budget: Budget;

    calculateBalance(): number;
    addEmployee(employee: Employee): void;
    removeEmployee(employee: Employee): void;
    isEmployeeInDepartment(employee: Employee): boolean;
}

interface Accounting extends Department {
    processPayroll(): void;
    paySalary(employee: Employee | PreHiredEmployee): void;
}

interface Budget {
    debit: number;
    credit: number;
}

abstract class BaseDepartment implements Department {
    public employees: Employee[] = [];
    public budget: Budget = { debit: 0, credit: 0 };

    constructor(public name: string, public domain: string) {}

    abstract calculateBalance(): number;

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    removeEmployee(employee: Employee): void {
        this.employees = this.employees.filter(e => e !== employee);
    }

    isEmployeeInDepartment(employee: Employee): boolean {
        return this.employees.includes(employee);
    }
}

class DepartmentImpl extends BaseDepartment {
    calculateBalance(): number {
        return this.budget.credit - this.budget.debit;
    }
}

class AccountingDepartment extends BaseDepartment implements Accounting {
    constructor() {
        super("Accounting", "Finance");
    }

    calculateBalance(): number {
        return this.budget.credit - this.budget.debit;
    }

    processPayroll(): void {
        this.salaryPayment(); 
        console.log("Payroll processed for active employees.");
    }

    paySalary(employee: Employee | PreHiredEmployee): void {
        if (isEmployee(employee)) {
            employee.status === EmployeeStatus.Active
                ? this.internalPayment(employee)
                : console.log(`${employee.firstName} ${employee.lastName} is not eligible for payroll.`);
        } else {
            this.externalPayment(employee);
        }
    }    
     
    salaryPayment(): void {
        this.employees.forEach(employee => this.paySalary(employee));
    }
    
    internalPayment(employee: Employee): void {
        console.log(`Internal payment for active employee ${employee.firstName} ${employee.lastName}`);
    }
    
    externalPayment(preHire: PreHiredEmployee): void {
        console.log(`External payment for pre-hired employee ${preHire.firstName} ${preHire.lastName}`);
    }
}


function isPreHired(employee: PreHiredEmployee | Employee): employee is PreHiredEmployee {
    return (employee as Employee).department === undefined;
}

function isActiveEmployee(employee: Employee): boolean {
    return employee.status === EmployeeStatus.Active;
}

function isEmployee(employee: PreHiredEmployee | Employee): employee is Employee {
    return (employee as Employee).department !== undefined;
}

class Company {
    name: string;
    departments: Department[] = [];
    preHiredEmployees: PreHiredEmployee[] = [];
    allEmployees: (Employee | PreHiredEmployee)[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addDepartment(department: Department): void {
        this.departments.push(department);
        this.updateAllEmployees();
    }

    addPreHiredEmployee(employee: PreHiredEmployee): void {
        this.preHiredEmployees.push(employee);
        this.updateAllEmployees();
    }

    hireEmployee(preHired: PreHiredEmployee, department: Department): Employee {
        if (!isPreHired(preHired)) {
            throw new Error("Invalid pre-hired employee");
        }

        const newEmployee: Employee = {
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

    getAllEmployees(): (Employee | PreHiredEmployee)[] {
        return this.allEmployees;
    }

    private updateAllEmployees(): void {
        const departmentEmployees = this.departments.flatMap(dept => dept.employees);
        this.allEmployees = [...this.preHiredEmployees, ...departmentEmployees];
    }
}

const company = new Company("Test Company");
const accounting = new AccountingDepartment();
const department = new DepartmentImpl("IT", "Technology");

company.addDepartment(accounting);
company.addDepartment(department);

const preHired: PreHiredEmployee = {
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
