import {Person} from "./Person";

export class Household {
    private _numberOfMember: string;
    private _numberOfHouse: string;
    protected _listPerson: Person[] = [];

    constructor(numberOfMember: string, numberOfHouse: string) {
        this._numberOfMember = numberOfMember;
        this._numberOfHouse = numberOfHouse;
    }

    getNumberOfHouse(): string {
        return this._numberOfHouse;
    }

    setNumberOfHouse(value: string) {
        this._numberOfHouse = value;
    }

    getListPerson(): Person[] {
        return this._listPerson;
    }

    setListPerson(data: Person) {
        this._listPerson.push(data);
    }

    findByName(data: string): Person[] {
        let temp: Person[] = [];
        this._listPerson.forEach((value) => {
            if (value.getName() === data) {
                temp.push(value)
            }
        })
        return temp;
    }


}