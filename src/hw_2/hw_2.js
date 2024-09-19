"use strict";
class School {
    _areas = [];
    _lecturers = [];
    addArea(area) {
        this._areas.push(area);
    }
    removeArea(areaName) {
        this._areas = this._areas.filter(area => area.name !== areaName);
    }
    addLecturer(lecturer) {
        this._lecturers.push(lecturer);
    }
    removeLecturer(lecturerName) {
        this._lecturers = this._lecturers.filter(lect => lect.fullName !== lecturerName);
    }
    get areas() {
        return this._areas;
    }
    get lecturers() {
        return this._lecturers;
    }
}
class Area {
    _levels = [];
    _name;
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    addLevel(level) {
        this._levels.push(level);
    }
    removeLevel(levelName) {
        this._levels = this._levels.filter(level => level.name !== levelName);
    }
    get levels() {
        return this._levels;
    }
}
class Level {
    _groups = [];
    _name;
    _description;
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    addGroup(group) {
        this._groups.push(group);
    }
    removeGroup(groupName) {
        this._groups = this._groups.filter(group => group.name !== groupName);
    }
    get groups() {
        return this._groups;
    }
}
class Group {
    _students = [];
    _area;
    _status;
    _directionName;
    _levelName;
    _name;
    constructor(name, directionName, levelName, area, status) {
        this._name = name;
        this._directionName = directionName;
        this._levelName = levelName;
        this._area = area;
        this._status = status;
    }
    get name() {
        return this._name;
    }
    get area() {
        return this._area;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    addStudent(student) {
        this._students.push(student);
    }
    removeStudent(studentName) {
        this._students = this._students.filter(student => student.fullName !== studentName);
    }
    showPerformance() {
        return [...this._students].sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    }
}
class Student {
    _firstName;
    _lastName;
    _birthYear;
    _grades = {};
    _visits = {};
    constructor(firstName, lastName, birthYear) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    get fullName() {
        return `${this._lastName} ${this._firstName}`;
    }
    set fullName(value) {
        [this._lastName, this._firstName] = value.split(' ');
    }
    get age() {
        return new Date().getFullYear() - this._birthYear;
    }
    setGrade(subject, grade) {
        this._grades[subject] = grade;
    }
    setVisit(lesson, present) {
        this._visits[lesson] = present;
    }
    getPerformanceRating() {
        const gradeValues = Object.values(this._grades);
        if (gradeValues.length === 0)
            return 0;
        const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (Object.values(this._visits).filter(present => present).length /
            Object.keys(this._visits).length) *
            100;
        return (averageGrade + attendancePercentage) / 2;
    }
}
class Lecturer {
    _firstName;
    _lastName;
    _position;
    _company;
    _experience;
    _courses;
    _contacts;
    constructor(firstName, lastName, position, company, experience, courses, contacts) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._position = position;
        this._company = company;
        this._experience = experience;
        this._courses = courses;
        this._contacts = contacts;
    }
    get fullName() {
        return `${this._lastName} ${this._firstName}`;
    }
}
