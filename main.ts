import {DistrictManager} from "./src/District";
import {Household} from "./src/Household";
import {Person} from "./src/Person"
import * as rl from "readline-sync";
import {checkNumberOfHouse} from "./CheckFunction/RegEx_NumberOfHouse";
import {mainMenu} from "./Menu/MainMenu";
import {addMenu} from "./Menu/AddMenu";
import {showMenu} from "./Menu/ShowMenu";
import {deleteMenu} from "./Menu/DeleteMenu";
import {managerMenu} from "./Menu/ManagerMenu";
import {ChoiceMainMenu} from "./Enum/ChoiceMainMenu";
import {ChoiceAddMenu} from "./Enum/ChoiceAddMenu";
import {ChoiceShowMenu} from "./Enum/ChoiceShowMenu";
import {ChoiceDeleteMenu} from "./Enum/ChoiceDeleteMenu";
import {ChoiceManagerMenu} from "./Enum/ChoiceManagerMenu";
import {checkAgeForm} from "./CheckFunction/RegEx_Age";
import {checkJobForm} from "./CheckFunction/RegEx_Job";
import {checkGenderForm} from "./CheckFunction/RegEx_Gender";
import {fixMenu} from "./Menu/FixMenu";
import {ChoiceToFix} from "./Enum/ChoiceToFix";
import {checkNameForm} from "./CheckFunction/RegEx_Name";
import {checkNumberOfMemberForm} from "./CheckFunction/RegEx_NumberOfMember";


export function addPersonInfo() {
    let dob: string, gender: string, job: string, name: string;
    do {
        name = rl.question(`Nhập tên: `);
    } while (!checkNameForm(name));
    do {
        dob = rl.question(`Nhập năm sinh: `);
    } while (!checkAgeForm(dob));
    do {
        job = rl.question(`Nhập nghề nghiệp: `);
    } while (!checkJobForm(job));
    do {
        gender = rl.question(`Nhập giới tính: `);
    } while (!checkGenderForm(gender));
    return new Person(name, dob, job, gender);
}

function addNewInfo() {
    console.log();
    console.log(`====== Thêm thông tin hộ dân mới ======`);
    let numberOfHouse: string, numberOfMember: string;
    do {
        numberOfHouse = rl.question(`Nhập số nhà: `);
    } while (!checkGenderForm(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != -1);
    do {
        numberOfMember = rl.question(`Nhập số thành viên muốn thêm: `);
    } while (!checkNumberOfMemberForm(numberOfMember));
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
        let numberOfHouseNeed: string;
        let input: string;
        console.log(`======= Thêm thông tin vào hộ dân sẵn có =======`);
        do {
            numberOfHouseNeed = rl.question(`Nhập số nhà muốn thêm: `);
        } while (!checkNumberOfHouse(numberOfHouseNeed));
        let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
        if (listManager.findByNumberOfHouse(numberOfHouseNeed) !== -1) {
            do{
                input = rl.question(`Nhập số lượng thành viên muốn thêm: `);
            } while (!checkNumberOfMemberForm(input));
            for (let i = 0; i < +input; i++) {
                console.log();
                let person = addPersonInfo();
                listManager.getListManager()[index].setListPerson(person);
            }
        } else console.log(`Không có trong danh sách!`);
    }
}

function add_Info() {
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

function showListDistrict() {
    console.log();
    let count = 1;
    if (listManager.getListManager().length == 0) {
        console.log(`Không có thông tin. Mời nhập thêm thông tin`);
    } else {
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
        } else {
            console.table(listManager.getListManager()[index].getListPerson());
        }
    } else console.log(`Không tồn tại số nhà!`);
}

function show_Info() {
    showMenu();
    choiceShowInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceShowInfo) {
        case ChoiceShowMenu.SHOWALL:
            showListDistrict();
            break;
        case ChoiceShowMenu.SHOWPERSON:
            showPerson();
            break;
        case ChoiceShowMenu.GOBACK:
            break;
    }
}


function modify_Info() {
    console.log();
    console.log(`===== Sửa thông tin hộ dân =====`);
    let numberOfHouseNeed = rl.question(`Nhập số nhà muốn sửa thông tin: `);
    let indexManager = listManager.findByNumberOfHouse(numberOfHouseNeed);
    let name: string, gender: string, job: string, dob: string;
    if (indexManager !== -1) {
        console.log()
        console.table(listManager.getListManager()[indexManager].getListPerson());
        let numberOfHouse: string;
        do {
            numberOfHouse = rl.question(`Nhập số nhà: `);
        } while (!checkGenderForm(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != -1);
        listManager.getListManager()[indexManager].setNumberOfHouse(numberOfHouse);
        let nameNeedEdit = rl.question(`Nhập tên người dân muốn sửa thông tin: `);
        let arrayPersonSameName = listManager.getListManager()[indexManager].findByName(nameNeedEdit);
        let index_Person_Needed: number = -1;
        if (arrayPersonSameName.length > 0) {
            console.table(arrayPersonSameName);
            let index = +rl.question(`Nhập index của người dân muốn chỉnh sửa: `);
            listManager.getListManager()[indexManager].getListPerson().forEach((household,index_househole) => {
                if (arrayPersonSameName[index].getName() == household.getName()
                    && arrayPersonSameName[index].getDob() == household.getDob()
                    && arrayPersonSameName[index].getJob() == household.getJob()
                    && arrayPersonSameName[index].getGender() == household.getGender()) {
                    index_Person_Needed = index_househole;
                }
            });
            console.table(listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed]);
            fixMenu();
            choiceToFix = +rl.question(`Mời bạn nhập lựa chọn: `);
            switch (choiceToFix) {
                case ChoiceToFix.NAME:
                    do {
                        name = rl.question(`Nhập tên: `);
                    } while (!checkNameForm(name));
                    listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setName(name);
                    break;
                case ChoiceToFix.DOB:
                    do {
                        dob = rl.question(`Nhập năm sinh: `);
                    } while (!checkAgeForm(dob));
                    listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setDob(dob);
                    break;
                case ChoiceToFix.JOB:
                    do {
                        job = rl.question(`Nhập nghề nghiệp: `);
                    } while (!checkJobForm(job));
                    listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setDob(job);
                    break;
                case ChoiceToFix.GENDER:
                    do {
                        gender = rl.question(`Nhập giới tính: `);
                    } while (!checkGenderForm(gender));
                    listManager.getListManager()[indexManager].getListPerson()[index_Person_Needed].setDob(gender);
                    break;
                case ChoiceToFix.GOBACK:
                    break;
            }
        } else {
                console.log(`Không tồn tại tên mà bạn muốn tìm kiếm!`);
        }
    } else console.log(`Không tồn tại số nhà!`);
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
    let tempArr: Person[] = []
    let number2 = rl.question(`Nhập số nhà: `)
    let name2 = rl.question(`Nhập tên muốn xóa: `)
    let index_manager = listManager.findByNumberOfHouse(number2)
    let tempIndex: number = -1;
    if (index_manager !== -1) {
        tempArr = listManager.getListManager()[index_manager].findByName(name2)
        console.table(tempArr)
        let index_person = rl.question(`Chọn index thông tin nhân vật muốn xóa: `)
        listManager.getListManager()[index_manager].getListPerson().forEach((item, index) => {
            if (tempArr[+index_person].getName() == item.getName()
                && tempArr[+index_person].getDob() == item.getDob()
                && tempArr[+index_person].getJob() == item.getJob()
                && tempArr[+index_person].getGender() == item.getGender()) {
                tempIndex = index;
            }
        })
        listManager.getListManager()[index_manager].getListPerson().splice(tempIndex, 1)
    }
}

function Statistical_table() {
    console.log()
    console.log(`===== Thống kê =====`)
    let sum = 0;
    let numberOfMale = 0;
    let numberOfFemale = 0;
    let teenager = 0;
    let middleAged = 0;
    let seniorCitizen = 0;
    for (let i = 0; i < listManager.getListManager().length; i++) {
        sum += listManager.getListManager()[i].getListPerson().length;
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Male") {
                numberOfMale++;
            } else if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Female") {
                numberOfFemale++;
                if (listManager.getListManager()[i].getListPerson()[j].getAge() > ageMinOfTeenager
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < ageMaxOfTeenager) {
                    teenager++;
                } else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageMaxOfTeenager
                    && listManager.getListManager()[i].getListPerson()[j].getAge() < ageOfSeniorCitizen) {
                    middleAged++;
                } else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageOfSeniorCitizen) {
                    seniorCitizen++
                }
            }
        }
    }
    console.log(`Khu phố tổng cộng có ${listManager.getListManager().length} hộ dân, tổng ${sum} người. Trong đó có ${numberOfMale} nam và ${numberOfFemale} nữ`)
    console.log(`Độ tuổi Trẻ Trâu có ${teenager} người; độ tuổi Trung Tuần có ${middleAged} người; độ tuổi Về Vườn có ${seniorCitizen} người`)
}

function List_Military() {
    console.log()
    console.log(`====== Danh sách thiếu niên có thể tham gia nghĩa vụ quân sự ======`)
    let arrayManagerMilitary: Person[] = [];
    for (let i = 0; i < listManager.getListManager().length; i++) {
        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageMinOfTeenager
                && listManager.getListManager()[i].getListPerson()[j].getAge() <= ageMaxOfTeenager
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
            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= ageOfSeniorCitizen) {
                arrayOldPeople.push(listManager.getListManager()[i].getListPerson()[j])
            }
        }
    }
    console.table(arrayOldPeople)
}

function delete_Info() {
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

function manager_Info() {
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
let listManager = new DistrictManager();

const choiceDefault = -1;
const ageOfSeniorCitizen = 54;
const ageMinOfTeenager = 18;
const ageMaxOfTeenager = 35;

let choice = choiceDefault;
let choiceAddInfo = choiceDefault;
let choiceShowInfo = choiceDefault;
let choiceDeleteInfo = choiceDefault;
let choiceManger = choiceDefault;
let choiceToFix = choiceDefault;

while (choice !== ChoiceMainMenu.EXIT) {
    mainMenu();
    choice = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choice) {
        case ChoiceMainMenu.ADDINFO:
            add_Info();
            break;
        case ChoiceMainMenu.SHOWINFO:
            show_Info();
            break;
        case ChoiceMainMenu.MODIFYINFO:
            modify_Info();
            break;
        case ChoiceMainMenu.DELETEINFO:
            delete_Info();
            break;
        case ChoiceMainMenu.MANAGERINFO:
            manager_Info();
            break;
    }
}




    
    
    
    
    
    
