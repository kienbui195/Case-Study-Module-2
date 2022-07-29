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
const rl = __importStar(require("readline-sync"));
const RegEx_NumberOfHouse_1 = require("./checkFunction/RegEx_NumberOfHouse");
const MainMenu_1 = require("./Menu/MainMenu");
const AddMenu_1 = require("./Menu/AddMenu");
const ShowMenu_1 = require("./Menu/ShowMenu");
const DeleteMenu_1 = require("./Menu/DeleteMenu");
const ManagerMenu_1 = require("./Menu/ManagerMenu");
const AddPersonInfo_1 = require("./FunctionHandle/AddPersonInfo");
const ChoiceMenu1_1 = require("./Enum/ChoiceMenu1");
const ChoiceAddMenu_1 = require("./Enum/ChoiceAddMenu");
const ChoiceShowMenu_1 = require("./Enum/ChoiceShowMenu");
const ChoiceDeleteMenu_1 = require("./Enum/ChoiceDeleteMenu");
const ChoiceManagerMenu_1 = require("./Enum/ChoiceManagerMenu");
let listManager = new District_1.DistrictManager();
let choice = -1;
let choiceAddInfo = -1;
let choiceShowInfo = -1;
let choiceDeleteInfo = -1;
let choiceManger = -1;
function addNewInfo() {
    console.log();
    console.log(`====== Thêm thông tin hộ dân mới ======`);
    let numberOfHouse;
    do {
        numberOfHouse = rl.question(`Nhập số nhà (Chỉ bao gồm chữ cái viết hoa/thường và số): `);
    } while ((0, RegEx_NumberOfHouse_1.checkNumberOfHouse)(numberOfHouse));
    let numberOfMember = rl.question(`Nhập số thành viên muốn thêm: `);
    let household = new Household_1.Household(numberOfMember, numberOfHouse);
    for (let i = 1; i <= +numberOfMember; i++) {
        console.log();
        let person = (0, AddPersonInfo_1.addPersonInfo)();
        household.setListPerson(person);
    }
    listManager.addInfo(household);
}
function addPlusInfo() {
    console.log();
    if (listManager.getListManager().length == 0) {
        console.log(`Không có thông tin. Mời bạn thêm thông tin!`);
    }
    else {
        console.log(`======= Thêm thông tin vào hộ dân sẵn có =======`);
        let numberOfHouseNeed = rl.question(`Nhập số nhà muốn thêm thông tin thành viên: `);
        let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
        if (listManager.findByNumberOfHouse(numberOfHouseNeed) !== -1) {
            let input = +rl.question(`Nhập số lượng thành viên muốn thêm: `);
            for (let i = 0; i < input; i++) {
                console.log();
                let person = (0, AddPersonInfo_1.addPersonInfo)();
                listManager.getListManager()[index].setListPerson(person);
            }
        }
        else
            console.log(`Không có trong danh sách!`);
    }
}
function Add_Info() {
    (0, AddMenu_1.addMenu)();
    choiceAddInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceAddInfo) {
        case ChoiceAddMenu_1.ChoiceAddMenu.ADDNEW:
            addNewInfo();
            break;
        case ChoiceAddMenu_1.ChoiceAddMenu.ADDPLUS:
            addPlusInfo();
            break;
        case ChoiceAddMenu_1.ChoiceAddMenu.GOBACK:
            break;
    }
}
function ShowListDistrict() {
    console.log();
    if (listManager.getListManager().length == 0) {
        console.log(`Không có thông tin. Mời nhập thêm thông tin`);
    }
    else {
        console.log(`===== Hiển thị danh sách hộ dân trong toàn khu phố =====`);
        for (const item of listManager.getListManager()) {
            console.log();
            console.log(`Số nhà ${item.getNumberOfHouse()} - Số nhân khẩu: ${item.getListPerson().length}`);
        }
    }
}
function ShowPerson() {
    console.log();
    console.log(`===== Hiển thị thông tin người dân theo từng hộ dân =====`);
    let numberOfHouse_Need = rl.question(`Nhập số nhà muốn xem thông tin người dân: `);
    let index = listManager.findByNumberOfHouse(numberOfHouse_Need);
    if (index !== -1) {
        console.table(listManager.getListManager()[index].getListPerson());
    }
    else
        console.log(`Không tồn tại số nhà!`);
}
function Show_Info() {
    (0, ShowMenu_1.showMenu)();
    choiceShowInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceShowInfo) {
        case ChoiceShowMenu_1.ChoiceShowMenu.SHOWALL:
            ShowListDistrict();
            break;
        case ChoiceShowMenu_1.ChoiceShowMenu.SHOWPERSON:
            ShowPerson();
            break;
        case ChoiceShowMenu_1.ChoiceShowMenu.GOBACK:
            break;
    }
}
function Modify_Info() {
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
            let person = (0, AddPersonInfo_1.addPersonInfo)();
            household.setListPerson(person);
        }
        listManager.getListManager().splice(index, 1, household);
    }
}
function DeleteHousehold() {
    console.log();
    console.log(`===== Xóa thông tin hộ dân =====`);
    let number = rl.question(`Nhập số nhà muốn xóa: `);
    let index = listManager.findByNumberOfHouse(number);
    listManager.getListManager().splice(index, 1);
}
function DeletePerson() {
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
}
function Statistical_table() {
    console.log();
    console.log(`===== Thống kê =====`);
    let sum = 0;
    let numberOfMale = 0;
    let numberOfFemale = 0;
    let teenager = 0;
    let middle_aged = 0;
    let senior_citizen = 0;
    for (let i = 0; i < listManager.getListManager().length; i++) {
        sum += listManager.getListManager()[i].getListPerson().length;
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Male") {
                numberOfMale++;
            }
            else if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Female") {
                numberOfFemale++;
                if (listManager.getListManager()[i].getListPerson()[j].getAge() > 18
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < 35) {
                    teenager++;
                }
                else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 35
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < 54) {
                    middle_aged++;
                }
                else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 54) {
                    senior_citizen++;
                }
            }
        }
    }
    console.log(`Khu phố tổng cộng có ${sum} người. Trong đó có ${numberOfMale} nam và ${numberOfFemale} nữ`);
    console.log(`Độ tuổi Trẻ Trâu có ${teenager} người; độ tuổi Trung Tuần có ${middle_aged} người; độ tuổi Về Vườn có ${senior_citizen} người`);
}
function List_Military() {
    console.log();
    console.log(`====== Danh sách thiếu niên có thể tham gia nghĩa vụ quân sự ======`);
    let arrayManagerMilitary = [];
    for (let i = 0; i < listManager.getListManager().length; i++) {
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 18
                && listManager.getListManager()[i].getListPerson()[j].getAge() <= 25
                && listManager.getListManager()[i].getListPerson()[j].getGender() === 'Male') {
                arrayManagerMilitary.push(listManager.getListManager()[i].getListPerson()[j]);
            }
        }
    }
    console.table(arrayManagerMilitary);
}
function List_Old_Person() {
    console.log();
    console.log(`====== Danh sách hưu trí trong xóm ======`);
    let arrayOldPeople = [];
    for (let i = 0; i < listManager.getListManager().length; i++) {
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 54) {
                arrayOldPeople.push(listManager.getListManager()[i].getListPerson()[j]);
            }
        }
    }
    console.table(arrayOldPeople);
}
function Delete_Info() {
    (0, DeleteMenu_1.deleteMenu)();
    choiceDeleteInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceDeleteInfo) {
        case ChoiceDeleteMenu_1.ChoiceDeleteMenu.DELETEHOUSEHOLD:
            DeleteHousehold();
            break;
        case ChoiceDeleteMenu_1.ChoiceDeleteMenu.DELETEPERSON:
            DeletePerson();
            break;
        case ChoiceDeleteMenu_1.ChoiceDeleteMenu.GOBACK:
            break;
    }
}
function Manager_Info() {
    (0, ManagerMenu_1.managerMenu)();
    choiceManger = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceManger) {
        case ChoiceManagerMenu_1.ChoiceManagerMenu.STATISTICAL_TABLE:
            Statistical_table();
            break;
        case ChoiceManagerMenu_1.ChoiceManagerMenu.LIST_MILITARY:
            List_Military();
            break;
        case ChoiceManagerMenu_1.ChoiceManagerMenu.OLD_PERSON:
            List_Old_Person();
            break;
        case ChoiceManagerMenu_1.ChoiceManagerMenu.GOBACK:
            break;
    }
}
//main
while (choice !== 0) {
    (0, MainMenu_1.mainMenu)();
    choice = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choice) {
        case ChoiceMenu1_1.ChoiceMainMenu.ADDINFO:
            Add_Info();
            break;
        case ChoiceMenu1_1.ChoiceMainMenu.SHOWINFO:
            Show_Info();
            break;
        case ChoiceMenu1_1.ChoiceMainMenu.MODIFYINFO:
            Modify_Info();
            break;
        case ChoiceMenu1_1.ChoiceMainMenu.DELETEINFO:
            Delete_Info();
            break;
        case ChoiceMenu1_1.ChoiceMainMenu.MANAGERINFO:
            Manager_Info();
            break;
    }
}
