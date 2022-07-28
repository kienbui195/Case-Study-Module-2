import {Person} from "./Person";

export class Household {
    private _numberOfMember: string;
    private _numberOfHouse: string;
    protected _listPerson: Person[] = [];

    constructor(numberOfMember: string, numberOfHouse: string) {
        this._numberOfMember = numberOfMember;
        this._numberOfHouse = numberOfHouse;
    }

    getNumberOfMember(): string {
        return this._numberOfMember;
    }

    setNumberOfMember(value: string) {
        this._numberOfMember = value;
    }

    getNumberOfHouse(): string {
        return this._numberOfHouse;
    }

    setNumberOfHouse(value: string) {
        this._numberOfHouse = value;
    }

    getListPerson() {
        return this._listPerson;
    }

    setListPerson(data: Person) {
        this._listPerson.push(data);
    }
}