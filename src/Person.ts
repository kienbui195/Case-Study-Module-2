export class Person {
    private _name: string;
    private _dob: string;
    private _job: string;
    private _gender: string;

    constructor(name: string, dob: string, job: string, gender: string) {
        this._name = name; 
        this._dob = dob;
        this._job = job;
        this._gender = gender;
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

    getGender(): string {
        return this._gender;
    }

    setGender(value: string) {
        this._gender = value;
    }

    getAge(): number {
        if (((new Date().getFullYear()) - +this._dob) > 0)
            return (new Date().getFullYear() - +this._dob);
        else return this.getAge();
    }
}