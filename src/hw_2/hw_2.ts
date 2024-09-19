class School { 
    private _areas: Area[] = [];
    private _lecturers: Lecturer[] = [];

    addArea(area: Area): void {
     this._areas.push(area);
      }

    removeArea(areaName: string): void {
        this._areas = this._areas.filter(area => area.name !== areaName);
      }

    addLecturer(lecturer: Lecturer): void { 
        this._lecturers.push(lecturer);
      }

    removeLecturer(lecturerName: string): void {
        this._lecturers = this._lecturers.filter(lect => lect.fullName !== lecturerName);
      }

    get areas(): Area[] {
        return this._areas;
      }
    
    get lecturers(): Lecturer[] {
        return this._lecturers;
      }
    
}

class Area {
    private _levels: Level[] = [];
    private _name: string;
  
    constructor(name: string) {
      this._name = name;
    }
  
    get name(): string {
      return this._name;
    }
  
    addLevel(level: Level): void {
      this._levels.push(level);
    }
  
    removeLevel(levelName: string): void {
      this._levels = this._levels.filter(level => level.name !== levelName);
    }
  
    get levels(): Level[] {
      return this._levels;
    }
  }
  
class Level {
    private _groups: Group[] = [];
    private _name: string;
    private _description: string;
  
    constructor(name: string, description: string) {
      this._name = name;
      this._description = description;
    }
  
    get name(): string {
      return this._name;
    }
  
    get description(): string {
      return this._description;
    }
  
    addGroup(group: Group): void {
      this._groups.push(group);
    }
  
    removeGroup(groupName: string): void {
      this._groups = this._groups.filter(group => group.name !== groupName);
    }

  
    get groups(): Group[] {
      return this._groups;
    }
  }

  class Group {
    private _students: Student[] = [];
    private _area: string;
    private _status: string;
    private _directionName: string;
    private _levelName: string;
    private _name: string;
  
    constructor(name: string,directionName: string, levelName: string, area: string, status: string) {
      this._name = name;
      this._directionName = directionName;
      this._levelName = levelName;
      this._area = area;
      this._status = status;  
    }
    
    get name(): string {
      return this._name;
    }
  
    get area(): string {
      return this._area;
    }
  
    get status(): string {
      return this._status;
    }
  
    set status(value: string) {
      this._status = value;
    }
  
    addStudent(student: Student): void {
      this._students.push(student);
    }
  
    removeStudent(studentName: string): void {
      this._students = this._students.filter(student => student.fullName !== studentName);
    }
  
    showPerformance(): Student[] {
      return [...this._students].sort((a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating());
    }
  }
  
class Student {
    private _firstName: string;
    private _lastName: string;
    private _birthYear: number;
    private _grades: Record<string, number> = {}; 
    private _visits: Record<string, boolean> = {}; 
  
    constructor(firstName: string, lastName: string, birthYear: number) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._birthYear = birthYear;
    }
  
    get fullName(): string {
      return `${this._lastName} ${this._firstName}`;
    }
  
    set fullName(value: string) {
      [this._lastName, this._firstName] = value.split(' ');
    }
  
    get age(): number {
      return new Date().getFullYear() - this._birthYear;
    }
  
    setGrade(subject: string, grade: number): void {
      this._grades[subject] = grade;
    }
  
    setVisit(lesson: string, present: boolean): void {
      this._visits[lesson] = present;
    }
  
    getPerformanceRating(): number {
      const gradeValues = Object.values(this._grades);
  
      if (gradeValues.length === 0) return 0;
  
      const averageGrade =
        gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
  
      const attendancePercentage =
        (Object.values(this._visits).filter(present => present).length /
          Object.keys(this._visits).length) *
        100;
  
      return (averageGrade + attendancePercentage) / 2;
    }
  }
  
  class Lecturer {
    private _firstName: string;
    private _lastName: string;
    private _position: string;
    private _company: string;
    private _experience: number;
    private _courses: string[];
    private _contacts: string[];
  
    constructor(
      firstName: string,
      lastName: string,
      position: string,
      company: string,
      experience: number,
      courses: string[],
      contacts: string[]
    ) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._position = position;
      this._company = company;
      this._experience = experience;
      this._courses = courses;
      this._contacts = contacts;
    }
  
    get fullName(): string {
      return `${this._lastName} ${this._firstName}`;
    }
  }