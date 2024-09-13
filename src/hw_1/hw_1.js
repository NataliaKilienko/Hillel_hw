"use strict";
class School {
    directions = [];
    addDirection(direction) {
        this.directions.push(direction);
    }
}
class Direction {
    _name;
    levels = [];
    get name() {
        return this._name;
    }
    constructor(name) {
        this._name = name;
    }
    addLevel(level) {
        this.levels.push(level);
    }
}
class Level {
    _name;
    _program;
    groups = [];
    constructor(name, program) {
        this._name = name;
        this._program = program;
    }
    get name() {
        return this._name;
    }
    get program() {
        return this._program;
    }
    addGroup(group) {
        this.groups.push(group);
    }
}
class Group {
    _students = [];
    directionName;
    levelName;
    get students() {
        return this._students;
    }
    constructor(directionName, levelName) {
        this.directionName = directionName;
        this.levelName = levelName;
    }
    addStudent(student) {
        this._students.push(student);
    }
    showPerformance() {
        const sortedStudents = [...this.students].sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
        return sortedStudents;
    }
}
class Student {
    _firstName;
    _lastName;
    _birthYear;
    grades = {};
    attendance = [];
    constructor(firstName, lastName, birthYear) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    get fullName() {
        return `${this._lastName} ${this._firstName}`;
    }
    set fullName(value) {
        [this._lastName, this._firstName] = value.split(" ");
    }
    get age() {
        return new Date().getFullYear() - this._birthYear;
    }
    setGrade(subject, grade) {
        this.grades[subject] = grade;
    }
    markAttendance(present) {
        this.attendance.push(present);
    }
    getPerformanceRating() {
        const gradeValues = Object.values(this.grades);
        if (gradeValues.length === 0)
            return 0;
        const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (this.attendance.filter((present) => present).length / this.attendance.length) *
            100;
        return (averageGrade + attendancePercentage) / 2;
    }
}
