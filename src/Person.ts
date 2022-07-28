export class Person {
    private _name: string;
    private _dob: string;
    private _job: string;

    constructor(name: string, dob: string, job: string) {
        this._name = name; 
        this._dob = dob;
        this._job = job;
    }

    getName(): string {
        return this._name;
    }

    setName(value: string) {
        this._name = value;
    }

    getDob(): string {
        return this._dob;
    }

    setDob(value: string) {
        this._dob = value;
    }

    getJob(): string {
        return this._job;
    }

    setJob(value: string) {
        this._job = value;
    }
}