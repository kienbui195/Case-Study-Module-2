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
const District_1 = require("./src/District");
const Household_1 = require("./src/Household");
const Person_1 = require("./src/Person");
const rl = __importStar(require("readline-sync"));
const RegEx_NumberOfHouse_1 = require("./CheckFunction/RegEx_NumberOfHouse");
const MainMenu_1 = require("./Menu/MainMenu");
const AddMenu_1 = require("./Menu/AddMenu");
const ShowMenu_1 = require("./Menu/ShowMenu");
const DeleteMenu_1 = require("./Menu/DeleteMenu");
const ManagerMenu_1 = require("./Menu/ManagerMenu");
const ChoiceMainMenu_1 = require("./Enum/ChoiceMainMenu");
const ChoiceAddMenu_1 = require("./Enum/ChoiceAddMenu");
const ChoiceShowMenu_1 = require("./Enum/ChoiceShowMenu");
const ChoiceDeleteMenu_1 = require("./Enum/ChoiceDeleteMenu");
const ChoiceManagerMenu_1 = require("./Enum/ChoiceManagerMenu");
const RegEx_Age_1 = require("./CheckFunction/RegEx_Age");
const RegEx_Job_1 = require("./CheckFunction/RegEx_Job");
const RegEx_Gender_1 = require("./CheckFunction/RegEx_Gender");
const FixMenu_1 = require("./Menu/FixMenu");
const ChoiceToFix_1 = require("./Enum/ChoiceToFix");
const RegEx_Name_1 = require("./CheckFunction/RegEx_Name");
const RegEx_NumberOfMember_1 = require("./CheckFunction/RegEx_NumberOfMember");
function addPersonInfo() {
    let dob, gender, job, name;
    do {
        name = rl.question(`Nhập tên: `);
    } while (!(0, RegEx_Name_1.checkNameForm)(name));
    do {
        dob = rl.question(`Nhập năm sinh: `);
    } while (!(0, RegEx_Age_1.checkAgeForm)(dob));
    do {
        job = rl.question(`Nhập nghề nghiệp: `);
    } while (!(0, RegEx_Job_1.checkJobForm)(job));
    do {
        gender = rl.question(`Nhập giới tính: `);
    } while (!(0, RegEx_Gender_1.checkGenderForm)(gender));
    return new Person_1.Person(name, dob, job, gender);
}
exports.addPersonInfo = addPersonInfo;
function addNewInfo() {
    console.log();
    console.log(`====== Thêm thông tin hộ dân mới ======`);
    let numberOfHouse, numberOfMember;
    do {
        numberOfHouse = rl.question(`Nhập số nhà: `);
    } while (!(0, RegEx_Gender_1.checkGenderForm)(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != -1);
    do {
        numberOfMember = rl.question(`Nhập số thành viên muốn thêm: `);
    } while (!(0, RegEx_NumberOfMember_1.checkNumberOfMemberForm)(numberOfMember));
    let household = new Household_1.Household(numberOfMember, numberOfHouse);
    for (let i = 1; i <= +numberOfMember; i++) {
        console.log();
        let person = addPersonInfo();
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
        let numberOfHouseNeed;
        let input;
        console.log(`======= Thêm thông tin vào hộ dân sẵn có =======`);
        do {
            numberOfHouseNeed = rl.question(`Nhập số nhà muốn thêm: `);
        } while (!(0, RegEx_NumberOfHouse_1.checkNumberOfHouse)(numberOfHouseNeed));
        let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
        if (listManager.findByNumberOfHouse(numberOfHouseNeed) !== -1) {
            do {
                input = rl.question(`Nhập số lượng thành viên muốn thêm: `);
            } while (!(0, RegEx_NumberOfMember_1.checkNumberOfMemberForm)(input));
            for (let i = 0; i < +input; i++) {
                console.log();
                let person = addPersonInfo();
                listManager.getListManager()[index].setListPerson(person);
            }
        }
        else
            console.log(`Không có trong danh sách!`);
    }
}
function add_Info() {
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
function showListDistrict() {
    console.log();
    let count = 1;
    if (listManager.getListManager().length == 0) {
        console.log(`Không có thông tin. Mời nhập thêm thông tin`);
    }
    else {
        console.log(`===== Hiển thị danh sách hộ dân trong toàn khu phố =====`);
        console.log();
        for (const item of listManager.getListManager()) {
            console.log(`STT ${count}. Số nhà ${item.getNumberOfHouse()} - Số nhân khẩu: ${item.getListPerson().length}`);
            count++;
        }
    }
}
function showPerson() {
    console.log();
    console.log(`===== Hiển thị thông tin người dân theo từng hộ dân =====`);
    let numberOfHouseNeed = rl.question(`Nhập số nhà muốn xem thông tin người dân: `);
    let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
    if (index !== -1) {
        if (listManager.getListManager()[index].getListPerson().length == 0) {
            console.log(`Không có thông tin! Mời nhập thêm thông tin`);
        }
        else {
            console.table(listManager.getListManager()[index].getListPerson());
        }
    }
    else
        console.log(`Không tồn tại số nhà!`);
}
function show_Info() {
    (0, ShowMenu_1.showMenu)();
    choiceShowInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceShowInfo) {
        case ChoiceShowMenu_1.ChoiceShowMenu.SHOWALL:
            showListDistrict();
            break;
        case ChoiceShowMenu_1.ChoiceShowMenu.SHOWPERSON:
            showPerson();
            break;
        case ChoiceShowMenu_1.ChoiceShowMenu.GOBACK:
            break;
    }
}
function choiceFixMenu(indexManager, index_Person_Needed) {
    console.table(listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed]);
    let name, gender, job, dob;
    (0, FixMenu_1.fixMenu)();
    choiceToFix = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceToFix) {
        case ChoiceToFix_1.ChoiceToFix.NAME:
            do {
                name = rl.question(`Nhập tên: `);
            } while (!(0, RegEx_Name_1.checkNameForm)(name));
            listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setName(name);
            break;
        case ChoiceToFix_1.ChoiceToFix.DOB:
            do {
                dob = rl.question(`Nhập năm sinh: `);
            } while (!(0, RegEx_Age_1.checkAgeForm)(dob));
            listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setDob(dob);
            break;
        case ChoiceToFix_1.ChoiceToFix.JOB:
            do {
                job = rl.question(`Nhập nghề nghiệp: `);
            } while (!(0, RegEx_Job_1.checkJobForm)(job));
            listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setDob(job);
            break;
        case ChoiceToFix_1.ChoiceToFix.GENDER:
            do {
                gender = rl.question(`Nhập giới tính: `);
            } while (!(0, RegEx_Gender_1.checkGenderForm)(gender));
            listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setDob(gender);
            break;
    }
}
function modify_Info() {
    console.log();
    console.log(`===== Sửa thông tin hộ dân =====`);
    let numberOfHouseNeed = rl.question(`Nhập số nhà muốn sửa thông tin: `);
    let indexManager = listManager.findByNumberOfHouse(numberOfHouseNeed);
    if (indexManager !== -1) {
        console.log();
        console.table(listManager.getListManager()[indexManager].getListPerson());
        let numberOfHouse;
        do {
            numberOfHouse = rl.question(`Nhập số nhà: `);
        } while (!(0, RegEx_Gender_1.checkGenderForm)(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != -1);
        listManager.getListManager()[indexManager].setNumberOfHouse(numberOfHouse);
        let nameNeedEdit = rl.question(`Nhập tên người dân muốn sửa thông tin: `);
        let arrayPersonSameName = listManager.getListManager()[indexManager].findByName(nameNeedEdit);
        let index_Person_Needed = -1;
        if (arrayPersonSameName.length > 0) {
            console.table(arrayPersonSameName);
            let index = +rl.question(`Nhập index của người dân muốn chỉnh sửa: `);
            listManager.getListManager()[indexManager].getListPerson().forEach((household, index_househole) => {
                if (arrayPersonSameName[index].getName() == household.getName()
                    && arrayPersonSameName[index].getDob() == household.getDob()
                    && arrayPersonSameName[index].getJob() == household.getJob()
                    && arrayPersonSameName[index].getGender() == household.getGender()) {
                    index_Person_Needed = index_househole;
                }
            });
            do {
                choiceFixMenu(indexManager, index_Person_Needed);
            } while (choiceToFix != ChoiceToFix_1.ChoiceToFix.GOBACK);
        }
        else {
            console.log(`Không tồn tại tên mà bạn muốn tìm kiếm!`);
        }
    }
    else
        console.log(`Không tồn tại số nhà!`);
}
function DeleteHousehold() {
    console.log();
    console.log(`===== Xóa thông tin hộ dân =====`);
    let number;
    do {
        number = rl.question(`Nhập số nhà muốn xóa: `);
    } while (!(0, RegEx_NumberOfHouse_1.checkNumberOfHouse)(number));
    let index = listManager.findByNumberOfHouse(number);
    if (index !== -1) {
        listManager.getListManager().splice(index, 1);
    }
    else
        console.log(`Không tồn tại số nhà!`);
}
function DeletePerson() {
    console.log();
    console.log(`===== Xóa thông tin người dân =====`);
    let tempArr = [];
    let number, name;
    do {
        number = rl.question(`Nhập số nhà: `);
    } while (!(0, RegEx_NumberOfHouse_1.checkNumberOfHouse)(number));
    do {
        name = rl.question(`Nhập tên muốn xóa: `);
    } while (!(0, RegEx_Name_1.checkNameForm)(name));
    let indexManager = listManager.findByNumberOfHouse(number);
    let tempIndex = -1;
    if (indexManager !== -1) {
        tempArr = listManager.getListManager()[indexManager].findByName(name);
        console.table(tempArr);
        let indexPerson = rl.question(`Chọn index thông tin nhân vật muốn xóa: `);
        listManager.getListManager()[indexManager].getListPerson().forEach((item, index) => {
            if (tempArr[+indexPerson].getName() == item.getName()
                && tempArr[+indexPerson].getDob() == item.getDob()
                && tempArr[+indexPerson].getJob() == item.getJob()
                && tempArr[+indexPerson].getGender() == item.getGender()) {
                tempIndex = index;
            }
        });
        listManager.getListManager()[indexManager].getListPerson().splice(tempIndex, 1);
    }
}
function Statistical_table() {
    console.log();
    console.log(`===== Thống kê =====`);
    let sum = 0;
    let numberOfMale = 0;
    let numberOfFemale = 0;
    let teenager = 0;
    let middleAged = 0;
    let seniorCitizen = 0;
    let children = 0;
    for (let i = 0; i < listManager.getListManager().length; i++) {
        sum += listManager.getListManager()[i].getListPerson().length;
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Male") {
                numberOfMale++;
            }
            else if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Female") {
                numberOfFemale++;
                if (listManager.getListManager()[i].getListPerson()[j].getAge() <= ageMinOfTeenager) {
                    children++;
                }
                else if (listManager.getListManager()[i].getListPerson()[j].getAge() > ageMinOfTeenager
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < ageMaxOfTeenager) {
                    teenager++;
                }
                else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageMaxOfTeenager
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < ageOfSeniorCitizen) {
                    middleAged++;
                }
                else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageOfSeniorCitizen) {
                    seniorCitizen++;
                }
            }
        }
    }
    console.log(`Khu phố tổng cộng có ${listManager.getListManager().length} hộ dân, tổng ${sum} người. Trong đó có ${numberOfMale} nam và ${numberOfFemale} nữ`);
    console.log(`Độ tuổi Nhi Đồng Thối Tai có ${children} người; độ tuổi Trẻ Trâu có ${teenager} người; 
                    độ tuổi Trung Tuần có ${middleAged} người; độ tuổi Về Vườn có ${seniorCitizen} người`);
}
function List_Military() {
    console.log();
    console.log(`====== Danh sách thiếu niên có thể tham gia nghĩa vụ quân sự ======`);
    let arrayManagerMilitary = [];
    for (let i = 0; i < listManager.getListManager().length; i++) {
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageMinOfTeenager
                && listManager.getListManager()[i].getListPerson()[j].getAge() <= ageMaxOfTeenager
                && listManager.getListManager()[i].getListPerson()[j].getGender() === 'Male') {
                arrayManagerMilitary.push(listManager.getListManager()[i].getListPerson()[j]);
            }
        }
    }
    if (arrayManagerMilitary.length == 0) {
        console.log(`Danh sách không tồn tại!`);
    }
    else
        console.table(arrayManagerMilitary);
}
function List_Old_Person() {
    console.log();
    console.log(`====== Danh sách hưu trí trong xóm ======`);
    let arrayOldPeople = [];
    for (let i = 0; i < listManager.getListManager().length; i++) {
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageOfSeniorCitizen) {
                arrayOldPeople.push(listManager.getListManager()[i].getListPerson()[j]);
            }
        }
    }
    if (arrayOldPeople.length == 0) {
        console.log(`Danh sách không tồn tại!`);
    }
    else
        console.table(arrayOldPeople);
}
function delete_Info() {
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
function manager_Info() {
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
let listManager = new District_1.DistrictManager();
const choiceDefault = -1;
const ageOfSeniorCitizen = 54;
const ageMinOfTeenager = 6;
const ageMaxOfTeenager = 35;
let choice = choiceDefault;
let choiceAddInfo = choiceDefault;
let choiceShowInfo = choiceDefault;
let choiceDeleteInfo = choiceDefault;
let choiceManger = choiceDefault;
let choiceToFix = choiceDefault;
while (choice !== ChoiceMainMenu_1.ChoiceMainMenu.EXIT) {
    (0, MainMenu_1.mainMenu)();
    choice = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choice) {
        case ChoiceMainMenu_1.ChoiceMainMenu.ADDINFO:
            add_Info();
            break;
        case ChoiceMainMenu_1.ChoiceMainMenu.SHOWINFO:
            show_Info();
            break;
        case ChoiceMainMenu_1.ChoiceMainMenu.MODIFYINFO:
            modify_Info();
            break;
        case ChoiceMainMenu_1.ChoiceMainMenu.DELETEINFO:
            delete_Info();
            break;
        case ChoiceMainMenu_1.ChoiceMainMenu.MANAGERINFO:
            manager_Info();
            break;
    }
}
