import {DistrictManager} from "./src/District";
import {Household} from "./src/Household";
import {Person} from "./src/Person"
import * as rl from "readline-sync";
import {checkNumberOfHouse} from "./checkFunction/RegEx_NumberOfHouse";
import {mainMenu} from "./Menu/MainMenu";
import {addMenu} from "./Menu/AddMenu";
import {showMenu} from "./Menu/ShowMenu";
import {deleteMenu} from "./Menu/DeleteMenu";
import {managerMenu} from "./Menu/ManagerMenu";
import {addPersonInfo} from "./FunctionHandle/AddPersonInfo";
import {ChoiceMainMenu} from "./Enum/ChoiceMenu1";
import {ChoiceAddMenu} from "./Enum/ChoiceAddMenu";
import {ChoiceShowMenu} from "./Enum/ChoiceShowMenu";
import {ChoiceModifyMenu} from "./Enum/ChoiceModifyMenu";
import {ChoiceDeleteMenu} from "./Enum/ChoiceDeleteMenu";
import {ChoiceManagerMenu} from "./Enum/ChoiceManagerMenu";

let listManager = new DistrictManager();


let choice = -1;
let choiceAddInfo = -1;
let choiceShowInfo = -1;
let choiceDeleteInfo = -1;
let choiceManger = -1;


function addNewInfo() {
    console.log()
    console.log(`====== Thêm thông tin hộ dân mới ======`);
    let numberOfHouse;
    do {
        numberOfHouse = rl.question(`Nhập số nhà (Chỉ bao gồm chữ cái viết hoa/thường và số): `);
    } while (checkNumberOfHouse(numberOfHouse));
    let numberOfMember = rl.question(`Nhập số thành viên muốn thêm: `);
    let household = new Household(numberOfMember, numberOfHouse);
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
    } else {
        console.log(`======= Thêm thông tin vào hộ dân sẵn có =======`);
        let numberOfHouseNeed = rl.question(`Nhập số nhà muốn thêm thông tin thành viên: `);
        let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
        if (listManager.findByNumberOfHouse(numberOfHouseNeed) !== -1) {
            let input = +rl.question(`Nhập số lượng thành viên muốn thêm: `);
            for (let i = 0; i < input; i++) {
                console.log();
                let person = addPersonInfo();
                listManager.getListManager()[index].setListPerson(person);
            }
        } else console.log(`Không có trong danh sách!`);
    }
}

function Add_Info() {
    addMenu();
    choiceAddInfo = +rl.question(`Mời bạn nhập lựa chọn: `);

    switch (choiceAddInfo) {
        case ChoiceAddMenu.ADDNEW:
            addNewInfo();
            break;
        case ChoiceAddMenu.ADDPLUS:
            addPlusInfo();
            break;
        case ChoiceAddMenu.GOBACK:
            break;
    }
}

function ShowListDistrict() {
    console.log()
    if (listManager.getListManager().length == 0) {
        console.log(`Không có thông tin. Mời nhập thêm thông tin`)
    } else {
        console.log(`===== Hiển thị danh sách hộ dân trong toàn khu phố =====`)
        for (const item of listManager.getListManager()) {
            console.log()
            console.log(`Số nhà ${item.getNumberOfHouse()} - Số nhân khẩu: ${item.getListPerson().length}`)
        }
    }
}

function ShowPerson() {
    console.log()
    console.log(`===== Hiển thị thông tin người dân theo từng hộ dân =====`)
    let numberOfHouse_Need = rl.question(`Nhập số nhà muốn xem thông tin người dân: `)
    let index = listManager.findByNumberOfHouse(numberOfHouse_Need)
    if (index !== -1) {
        console.table(listManager.getListManager()[index].getListPerson())
    } else console.log(`Không tồn tại số nhà!`)
}

function Show_Info() {
    showMenu();
    choiceShowInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceShowInfo) {
        case ChoiceShowMenu.SHOWALL:
            ShowListDistrict();
            break;
        case ChoiceShowMenu.SHOWPERSON:
            ShowPerson();
            break;
        case ChoiceShowMenu.GOBACK:
            break;
    }
}

function Modify_Info() {
    console.log()
    console.log(`===== Sửa thông tin hộ dân =====`)
    let number_OfHouseNeed = rl.question(`Nhập số nhà muốn sửa thông tin: `)
    let index = listManager.findByNumberOfHouse(number_OfHouseNeed)
    if (index !== -1) {
        console.log()
        console.table(listManager.getListManager()[index].getListPerson())
        let numberOfHouse = rl.question(`Nhập số nhà mới: `)
        let numberOfMember = rl.question(`Nhập số thành viên mới: `)
        let household = new Household(numberOfMember, numberOfHouse)
        for (let i = 1; i <= +numberOfMember; i++) {
            console.log()
            let person = addPersonInfo();
            household.setListPerson(person)
        }
        listManager.getListManager().splice(index, 1, household)
    }
}

function DeleteHousehold() {
    console.log()
    console.log(`===== Xóa thông tin hộ dân =====`)
    let number = rl.question(`Nhập số nhà muốn xóa: `)
    let index = listManager.findByNumberOfHouse(number)
    listManager.getListManager().splice(index, 1)
}

function DeletePerson() {
    console.log()
    console.log(`===== Xóa thông tin người dân =====`)
    let temparr: Person[] = []
    let number2 = rl.question(`Nhập số nhà: `)
    let name2 = rl.question(`Nhập tên muốn xóa: `)
    let index_manager = listManager.findByNumberOfHouse(number2)
    let tempindex: number = -1;
    if (index_manager !== -1) {
        temparr = listManager.getListManager()[index_manager].findByName(name2)
        console.table(temparr)
        let index_person = rl.question(`Chọn index thông tin nhân vật muốn xóa: `)
        listManager.getListManager()[index_manager].getListPerson().forEach((item, index) => {
            if (temparr[+index_person].getName() == item.getName()
                && temparr[+index_person].getDob() == item.getDob()
                && temparr[+index_person].getJob() == item.getJob()
                && temparr[+index_person].getGender() == item.getGender()) {
                tempindex = index;
            }
        })
        listManager.getListManager()[index_manager].getListPerson().splice(tempindex, 1)
    }
}

function Statistical_table() {
    console.log()
    console.log(`===== Thống kê =====`)
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
            } else if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Female") {
                numberOfFemale++;
                if (listManager.getListManager()[i].getListPerson()[j].getAge() > 18
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < 35) {
                    teenager++;
                } else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 35
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < 54) {
                    middle_aged++;
                } else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 54) {
                    senior_citizen++
                }
            }
        }
    }
    console.log(`Khu phố tổng cộng có ${sum} người. Trong đó có ${numberOfMale} nam và ${numberOfFemale} nữ`)
    console.log(`Độ tuổi Trẻ Trâu có ${teenager} người; độ tuổi Trung Tuần có ${middle_aged} người; độ tuổi Về Vườn có ${senior_citizen} người`)
}

function List_Military() {
    console.log()
    console.log(`====== Danh sách thiếu niên có thể tham gia nghĩa vụ quân sự ======`)
    let arrayManagerMilitary: Person[] = [];
    for (let i = 0; i < listManager.getListManager().length; i++) {
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 18
                && listManager.getListManager()[i].getListPerson()[j].getAge() <= 25
                && listManager.getListManager()[i].getListPerson()[j].getGender() === 'Male') {
                arrayManagerMilitary.push(listManager.getListManager()[i].getListPerson()[j])
            }
        }
    }
    console.table(arrayManagerMilitary);
}

function List_Old_Person() {
    console.log()
    console.log(`====== Danh sách hưu trí trong xóm ======`)
    let arrayOldPeople: Person[] = []
    for (let i = 0; i < listManager.getListManager().length; i++) {
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 54) {
                arrayOldPeople.push(listManager.getListManager()[i].getListPerson()[j])
            }
        }
    }
    console.table(arrayOldPeople)
}

function Delete_Info() {
    deleteMenu()
    choiceDeleteInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceDeleteInfo) {
        case ChoiceDeleteMenu.DELETEHOUSEHOLD:
            DeleteHousehold();
            break;
        case ChoiceDeleteMenu.DELETEPERSON:
            DeletePerson();
            break;
        case ChoiceDeleteMenu.GOBACK:
            break;
    }
}

function Manager_Info() {
    managerMenu()
    choiceManger = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceManger) {
        case ChoiceManagerMenu.STATISTICAL_TABLE:
            Statistical_table();
            break;
        case ChoiceManagerMenu.LIST_MILITARY:
            List_Military();
            break;
        case ChoiceManagerMenu.OLD_PERSON:
            List_Old_Person();
            break;
        case ChoiceManagerMenu.GOBACK:
            break;
    }
}

//main
while (choice !== 0) {
    mainMenu();
    choice = +rl.question(`Mời bạn nhập lựa chọn: `);

    switch (choice) {
        case ChoiceMainMenu.ADDINFO:
            Add_Info();
            break;
        case ChoiceMainMenu.SHOWINFO:
            Show_Info();
            break;
        case ChoiceMainMenu.MODIFYINFO:
            Modify_Info();
            break;
        case ChoiceMainMenu.DELETEINFO:
            Delete_Info();
            break;
        case ChoiceMainMenu.MANAGERINFO:
            Manager_Info();
            break;
    }
}

    
    
    
    
    
    
