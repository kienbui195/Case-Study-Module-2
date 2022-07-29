"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPersonInfo = void 0;
const rl = __importStar(require("readline-sync"));
const Person_1 = require("../src/Person");
const RegEx_Age_1 = require("../checkFunction/RegEx_Age");
const RegEx_Job_1 = require("../checkFunction/RegEx_Job");
const RegEx_Gender_1 = require("../checkFunction/RegEx_Gender");
function addPersonInfo() {
    let dob, gender, job, name;
    name = rl.question(`Nhập tên thành viên: `);
    do {
        dob = rl.question(`Nhập năm sinh: `);
    } while ((0, RegEx_Age_1.checkAgeForm)(dob));
    do {
        job = rl.question(`Nhập nghề nghiệp: `);
    } while ((0, RegEx_Job_1.checkJobForm)(job));
    do {
        gender = rl.question(`Nhập giới tính: `);
    } while ((0, RegEx_Gender_1.checkGenderForm)(gender));
    let person = new Person_1.Person(name, dob, job, gender);
    return person;
}
exports.addPersonInfo = addPersonInfo;
