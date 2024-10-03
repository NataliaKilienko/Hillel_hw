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

function isPreHired(employee: PreHiredEmployee | Employee): employee is PreHiredEmployee {
    return (employee as Employee).department === undefined;
}

function isActiveEmployee(employee: Employee): boolean {
    return employee.status === EmployeeStatus.Active;
}

class AccountingDepartment extends BaseDepartment implements Accounting {
    constructor() {
        super("Accounting", "Finance");
    }

    calculateBalance(): number {
        return this.budget.debit - this.budget.credit;
    }

    processPayroll(): void {
        this.employees.forEach(employee => {
            if (isActiveEmployee(employee)) {
                this.paySalary(employee);  
            }
        });
        console.log("Payroll processed for active employees.");
    }
    
    paySalary(employee: Employee): void {
        if (isActiveEmployee(employee)) {
            console.log(`Paying internal salary for active employee ${employee.firstName} ${employee.lastName}`);
        } else {
            console.log(`${employee.firstName} ${employee.lastName} is not eligible for payroll.`);
        }
    }
}

class Company {
    private departments: Department[] = [];
    private preHiredEmployees: PreHiredEmployee[] = [];

    addDepartment(department: Department): void {
        this.departments.push(department);
    }

    addPreHiredEmployee(employee: PreHiredEmployee): void {
        this.preHiredEmployees.push(employee);
    }

    hireEmployee(preHired: PreHiredEmployee, department: Department): Employee {
        if (isPreHired(preHired)) {
            const newEmployee: Employee = {
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

const preHired: PreHiredEmployee = {
    firstName: "Nataliia",
    lastName: "Killienko",
    salary: 50000,
    bankAccountNumber: "11-22-333-22"
}

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
