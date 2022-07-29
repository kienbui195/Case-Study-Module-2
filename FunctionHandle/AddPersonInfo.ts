import * as rl from "readline-sync";
import {Person} from "../src/Person";
import {checkAgeForm} from "../checkFunction/RegEx_Age";
import {checkJobForm} from "../checkFunction/RegEx_Job";
import {checkGenderForm} from "../checkFunction/RegEx_Gender";

export function addPersonInfo() {
    let dob: string, gender: string, job: string, name: string;
    name = rl.question(`Nhập tên thành viên: `);
    do {
        dob = rl.question(`Nhập năm sinh: `);
    } while (checkAgeForm(dob));
    do {
        job = rl.question(`Nhập nghề nghiệp: `);
    } while (checkJobForm(job));
    do {
        gender = rl.question(`Nhập giới tính: `);
    } while (checkGenderForm(gender));
    let person = new Person(name, dob, job, gender);
    return person;
}