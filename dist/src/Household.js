"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Household = void 0;
class Household {
    constructor(numberOfMember, numberOfHouse) {
        this._listPerson = [];
        this._numberOfMember = numberOfMember;
        this._numberOfHouse = numberOfHouse;
    }
    getNumberOfMember() {
        return this._numberOfMember;
    }
    setNumberOfMember(value) {
        this._numberOfMember = value;
    }
    getNumberOfHouse() {
        return this._numberOfHouse;
    }
    setNumberOfHouse(value) {
        this._numberOfHouse = value;
    }
    getListPerson() {
        return this._listPerson;
    }
    setListPerson(data) {
        this._listPerson.push(data);
    }
}
exports.Household = Household;
