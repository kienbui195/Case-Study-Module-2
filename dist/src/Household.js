"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Household = void 0;
class Household {
    constructor(numberOfMember, numberOfHouse) {
        this._listPerson = [];
        this._numberOfMember = numberOfMember;
        this._numberOfHouse = numberOfHouse;
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
    findByName(data) {
        let temp = [];
        this._listPerson.forEach((value) => {
            if (value.getName() === data) {
                temp.push(value);
            }
        });
        return temp;
    }
}
exports.Household = Household;
