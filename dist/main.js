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
const District_1 = require("./src/District");
const Household_1 = require("./src/Household");
const Person_1 = require("./src/Person");
const rl = __importStar(require("readline-sync"));
let listManager = new District_1.DistrictManager();
let choice = -1;
let choiceAddInfo = -1;
let choiceShowInfo = -1;
let choiceDeleteInfo = -1;
let choiceManger = -1;
function mainMenu() {
    console.log();
    console.log(`======= Main Menu =======`);
    console.log(`1. Thêm thông tin`);
    console.log(`2. Hiển thị thông tin`);
    console.log(`3. Sửa thông tin`);
    console.log(`4. Xóa thông tin`);
    console.log(`5. Quản lý thông tin`);
    console.log(`0. Thoát`);
    choice = +rl.question(`Mời bạn nhập lựa chọn: `);
}
function addMenu() {
    console.log();
    console.log(`======= Thêm thông tin =======`);
    console.log(`1. Thêm thông tin mới`);
    console.log(`2. Thêm thông tin vào tư liệu sẵn có`);
    console.log(`0. Trở về`);
    choiceAddInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
}
function showMenu() {
    console.log();
    console.log(`======= Hiển thị thông tin ========`);
    console.log(`1. Hiển thị danh sách hộ dân`);
    console.log(`2. Hiển thị thông tin người dân chi tiết theo từng hộ dân`);
    console.log(`0. Trở về`);
    choiceShowInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
}
function deleteMenu() {
    console.log();
    console.log(`======= Xóa thông tin ========`);
    console.log(`1. Xóa thông tin hộ dân khỏi danh sách quản lý`);
    console.log(`2. Xóa thông tin người dân khỏi hộ dân`);
    console.log(`0. Trở về`);
    choiceDeleteInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
}
function managerMenu() {
    console.log();
    console.log(`======= Quản lý ========`);
    console.log(`1. Danh sách thiếu niên đến tuổi nhập ngũ`);
    console.log(`2. Danh sách hưu trí hiện tại của địa phương`);
    console.log(`0. Trở về`);
    choiceManger = +rl.question(`Mời bạn nhập lựa chọn: `);
}
function addPersonInfo() {
    let name = rl.question(`Nhập tên thành viên: `);
    let dob = rl.question(`Nhập năm sinh: `);
    let job = rl.question(`Nhập nghề nghiệp: `);
    let gender = rl.question(`Nhập giới tính: `);
    let person = new Person_1.Person(name, dob, job, gender);
    return person;
}
//main
while (choice !== 0) {
    mainMenu();
    switch (choice) {
        case 1:
            addMenu();
            switch (choiceAddInfo) {
                case 1:
                    console.log();
                    console.log(`====== Thêm thông tin hộ dân mới ======`);
                    let numberOfHouse = rl.question(`Nhập số nhà: `);
                    let numberOfMember = rl.question(`Nhập số thành viên muốn thêm: `);
                    let household = new Household_1.Household(numberOfMember, numberOfHouse);
                    for (let i = 1; i <= +numberOfMember; i++) {
                        console.log();
                        let person = addPersonInfo();
                        household.setListPerson(person);
                    }
                    listManager.addInfo(household);
                    break;
                case 2:
                    console.log();
                    console.log(`======= Thêm thông tin vào hộ dân sẵn có =======`);
                    let numberOfHouseNeed = rl.question(`Nhập số nhà muốn thêm thông tin thành viên: `);
                    let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
                    if (listManager.findByNumberOfHouse(numberOfHouseNeed) !== -1) {
                        let input = rl.question(`Nhập số lượng thành viên muốn thêm: `);
                        for (let i = 0; i < +input; i++) {
                            let person = addPersonInfo();
                            listManager.getListManager()[index].setListPerson(person);
                        }
                    }
                    else
                        console.log(`Không có trong danh sách!`);
                    break;
                case 0:
                    break;
            }
            break;
        case 2:
            showMenu();
            switch (choiceShowInfo) {
                case 1:
                    console.log();
                    console.log(`===== Hiển thị danh sách hộ dân trong toàn khu phố =====`);
                    for (const item of listManager.getListManager()) {
                        console.log();
                        console.log(`Số nhà ${item.getNumberOfHouse()} - Số nhân khẩu: ${item.getListPerson().length}`);
                    }
                    break;
                case 2:
                    console.log();
                    console.log(`===== Hiển thị thông tin người dân theo từng hộ dân =====`);
                    let numberOfHouse_Need = rl.question(`Nhập số nhà muốn xem thông tin người dân: `);
                    let index = listManager.findByNumberOfHouse(numberOfHouse_Need);
                    if (index !== -1) {
                        console.table(listManager.getListManager()[index].getListPerson());
                    }
                    else
                        console.log(`Không tồn tại số nhà!`);
                    break;
                case 0:
                    break;
            }
            break;
        case 3:
            console.log();
            console.log(`===== Sửa thông tin hộ dân =====`);
            let number_OfHouseNeed = rl.question(`Nhập số nhà muốn sửa thông tin: `);
            let index = listManager.findByNumberOfHouse(number_OfHouseNeed);
            if (index !== -1) {
                console.log();
                console.table(listManager.getListManager()[index].getListPerson());
                let numberOfHouse = rl.question(`Nhập số nhà mới: `);
                let numberOfMember = rl.question(`Nhập số thành viên mới: `);
                let household = new Household_1.Household(numberOfMember, numberOfHouse);
                for (let i = 1; i <= +numberOfMember; i++) {
                    console.log();
                    let person = addPersonInfo();
                    household.setListPerson(person);
                }
                listManager.getListManager().splice(index, 1, household);
            }
            break;
        case 4:
            deleteMenu();
            switch (choiceDeleteInfo) {
                case 1:
                    console.log();
                    console.log(`===== Xóa thông tin hộ dân =====`);
                    let number = rl.question(`Nhập số nhà muốn xóa: `);
                    let index = listManager.findByNumberOfHouse(number);
                    listManager.getListManager().splice(index, 1);
                    break;
                case 2:
                    console.log();
                    console.log(`===== Xóa thông tin người dân =====`);
                    let temparr = [];
                    let number2 = rl.question(`Nhập số nhà: `);
                    let name2 = rl.question(`Nhập tên muốn xóa: `);
                    let index_manager = listManager.findByNumberOfHouse(number2);
                    let tempindex = -1;
                    if (index_manager !== -1) {
                        temparr = listManager.getListManager()[index_manager].findByName(name2);
                        console.table(temparr);
                        let index_person = rl.question(`Chọn index thông tin nhân vật muốn xóa: `);
                        listManager.getListManager()[index_manager].getListPerson().forEach((item, index) => {
                            if (temparr[+index_person].getName() == item.getName()
                                && temparr[+index_person].getDob() == item.getDob()
                                && temparr[+index_person].getJob() == item.getJob()
                                && temparr[+index_person].getGender() == item.getGender()) {
                                tempindex = index;
                            }
                        });
                        listManager.getListManager()[index_manager].getListPerson().splice(tempindex, 1);
                    }
                    break;
                case 0:
                    break;
            }
            break;
        case 5:
            managerMenu();
            switch (choiceManger) {
                case 1:
                    console.log();
                    console.log(`===== Danh sách các thiếu niên đạt tiêu chuẩn đi nhập ngũ =====`);
            }
    }
}
