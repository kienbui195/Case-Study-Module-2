"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(name, dob, job) {
        this._name = name;
        this._dob = dob;
        this._job = job;
    }
    getName() {
        return this._name;
    }
    setName(value) {
        this._name = value;
    }
    getDob() {
        return this._dob;
    }
    setDob(value) {
        this._dob = value;
    }
    getJob() {
        return this._job;
    }
    setJob(value) {
        this._job = value;
    }
}
exports.Person = Person;
