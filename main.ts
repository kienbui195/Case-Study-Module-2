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
import {checkYesOrNoForm} from "./CheckFunction/RegEx_Question";


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
    } while (!checkGenderForm(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != nonentityIndexHouseOfHousehold);
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
        if (listManager.findByNumberOfHouse(numberOfHouseNeed) != nonentityIndexHouseOfHousehold) {
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
    let count = countDefault;
    if (listManager.getListManager().length == 0) {
        console.log(`Không có thông tin. Mời nhập thêm thông tin`);
    } else {
        console.log(`===== Hiển thị danh sách hộ dân trong toàn khu phố =====`);
        console.log();
        for (const item of listManager.getListManager()) {
            console.log(`STT ${count + 1}. Số nhà ${item.getNumberOfHouse()} - Số nhân khẩu: ${item.getListPerson().length}`);
            count++;
        }
    }
}

function showPerson() {
    console.log();
    console.log(`===== Hiển thị thông tin người dân theo từng hộ dân =====`);
    let numberOfHouseNeed = rl.question(`Nhập số nhà muốn xem thông tin người dân: `);
    let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
    if (index !== nonentityIndexHouseOfHousehold) {
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


function choiceFixMenu(indexManager: number, indexPersonNeedEdit: number) {
    console.table(listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit]);
    let name: string, gender: string, job: string, dob: string, numberOfHouse: string;
    fixMenu();
    choiceToFix = +rl.question(`Mời bạn nhập lựa chọn: `);
    switch (choiceToFix) {
        case ChoiceToFix.NAME:
            do {
                name = rl.question(`Nhập tên: `);
            } while (!checkNameForm(name));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setName(name);
            break;
        case ChoiceToFix.DOB:
            do {
                dob = rl.question(`Nhập năm sinh: `);
            } while (!checkAgeForm(dob));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setDob(dob);
            break;
        case ChoiceToFix.JOB:
            do {
                job = rl.question(`Nhập nghề nghiệp: `);
            } while (!checkJobForm(job));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setJob(job);
            break;
        case ChoiceToFix.GENDER:
            do {
                gender = rl.question(`Nhập giới tính: `);
            } while (!checkGenderForm(gender));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setGender(gender);
            break;
        case  ChoiceToFix.NUMBEROFHOUSE:
            do {
                numberOfHouse = rl.question(`Nhập số nhà mới: `);
            } while (!checkGenderForm(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != nonentityIndexHouseOfHousehold);
            listManager.getListManager()[indexManager].setNumberOfHouse(numberOfHouse);
            break;
    }
}

function findExactlyPersonByName(arrayPersonSameName: Person[], indexManager: number): number {
    let indexPersonNeeded: number;
    console.table(arrayPersonSameName);
    let index = +rl.question(`Nhập index của người dân muốn chỉnh sửa: `);
    listManager.getListManager()[indexManager].getListPerson().forEach((household, indexHousehold) => {
        if (arrayPersonSameName[index].getName() == household.getName()
            && arrayPersonSameName[index].getDob() == household.getDob()
            && arrayPersonSameName[index].getJob() == household.getJob()
            && arrayPersonSameName[index].getGender() == household.getGender()) {
            indexPersonNeeded = indexHousehold;
        }
    });
    // @ts-ignore
    return indexPersonNeeded;
}

function modify_Info() {
    console.log();
    console.log(`===== Sửa thông tin hộ dân =====`);
    let numberOfHouseNeed = rl.question(`Nhập số nhà muốn sửa thông tin: `);
    let indexManager = listManager.findByNumberOfHouse(numberOfHouseNeed);
    if (indexManager != nonentityIndexHouseOfHousehold) {
        console.log();
        console.table(listManager.getListManager()[indexManager].getListPerson());
        let nameNeedEdit = rl.question(`Nhập tên người dân muốn sửa thông tin: `);
        let arrayPersonSameName = listManager.getListManager()[indexManager].findByName(nameNeedEdit);
        let indexPersonNeedEdit: number;
        if (arrayPersonSameName.length > 0) {
            indexPersonNeedEdit = findExactlyPersonByName(arrayPersonSameName, indexManager);
            do {
                choiceFixMenu(indexManager, indexPersonNeedEdit);
            } while (choiceToFix != ChoiceToFix.GOBACK);
        } else {
                console.log(`Không tồn tại tên mà bạn muốn tìm kiếm!`);
        }
    } else console.log(`Không tồn tại số nhà!`);
}


function DeleteHousehold() {
    console.log();
    console.log(`===== Xóa thông tin hộ dân =====`);
    let number: string;
    showListDistrict();
    do {
        number = rl.question(`Nhập số nhà muốn xóa thông tin: `);
    } while (!checkNumberOfHouse(number));
    let index = listManager.findByNumberOfHouse(number);
    if (index !== nonentityIndexHouseOfHousehold) {
        let question: string;
        do {
            question = rl.question(`Bạn chắc chắn muốn xóa?[Y/N]: `);
        } while (!checkYesOrNoForm(question));
        if (question == 'Y') {
            listManager.getListManager().splice(index, 1);
        } else delete_Info();
    } else console.log(`Không tồn tại số nhà!`);
}

function findExactlyIndexOfPersonNeedDelete(indexManager: number, listSameName: Person[], indexPerson: string) {
    let tempIndex: number;
    listManager.getListManager()[indexManager].getListPerson().forEach((item, index) => {
        if (listSameName[+indexPerson].getName() == item.getName()
            && listSameName[+indexPerson].getDob() == item.getDob()
            && listSameName[+indexPerson].getJob() == item.getJob()
            && listSameName[+indexPerson].getGender() == item.getGender()) {
            tempIndex = index;
        }
    });
    // @ts-ignore
    return tempIndex;
}

function deleteByName(indexManager: number, listSameName: Person[]) {
    let name: string;
    let tempIndex: number;
    console.table(listManager.getListManager()[indexManager].getListPerson());
    do {
        name = rl.question(`Nhập tên muốn xóa: `);
    } while (!checkNameForm(name));
    listSameName = listManager.getListManager()[indexManager].findByName(name);
    console.table(listSameName);
    let indexPersonOfListSameName = rl.question(`Chọn index thông tin nhân vật muốn xóa: `);
    tempIndex = findExactlyIndexOfPersonNeedDelete(indexManager, listSameName, indexPersonOfListSameName);
    let question: string;
    do {
        question = rl.question(`Bạn chắc chắn muốn xóa?[Y/N]: `);
    } while (!checkYesOrNoForm(question));
    if (question == 'Y') {
        listManager.getListManager()[indexManager].getListPerson().splice(tempIndex, 1);
    } else delete_Info();
}

function DeletePerson() {
    console.log();
    console.log(`===== Xóa thông tin người dân =====`);
    let listSameName: Person[] = [];
    let number: string;
    do {
        number = rl.question(`Nhập số nhà: `);
    } while (!checkNumberOfHouse(number));
    let indexManager = listManager.findByNumberOfHouse(number);
    if (indexManager !== nonentityIndexHouseOfHousehold) {
        deleteByName(indexManager, listSameName);
    } else {
        console.log(`Không tồn tại số nhà!`);
    }
}

function countGender(person: Person, numberOfMale: number, numberOfFemale: number) {
    if (person.getGender() === "Male") {
        numberOfMale++;
    } else if (person.getGender() === "Female") {
        numberOfFemale++;
    }
    return {numberOfMale, numberOfFemale};
}

function countIntervalAge(person: Person, children: number, teenager: number, middleAged: number, seniorCitizen: number) {
    if (person.getAge() <= ageMinOfTeenager && person.getAge() >= 0) {
        children++;
    } else if (person.getAge() > ageMinOfTeenager && person.getAge() <= ageMaxOfTeenager) {
        teenager++;
    } else if (person.getAge() > ageMaxOfTeenager && person.getAge() < ageOfSeniorCitizen) {
        middleAged++;
    } else if (person.getAge() >= ageOfSeniorCitizen) {
        seniorCitizen++;
    }
    return {children, teenager, middleAged, seniorCitizen};
}

function Statistical_table() {
    console.log()
    console.log(`===== Thống kê =====`)
    let sum = countDefault;
    let numberOfMale = countDefault;
    let numberOfFemale = countDefault;
    let teenager = countDefault;
    let middleAged = countDefault;
    let seniorCitizen = countDefault;
    let children = countDefault;
    listManager.getListManager().forEach((household) => {
        sum += household.getListPerson().length;
        household.getListPerson().forEach((person) => {
            const __ret = countGender(person, numberOfMale, numberOfFemale);
            numberOfMale = __ret.numberOfMale;
            numberOfFemale = __ret.numberOfFemale;

            const __ret2 = countIntervalAge(person, children, teenager, middleAged, seniorCitizen);
            children = __ret2.children;
            teenager = __ret2.teenager;
            middleAged = __ret2.middleAged;
            seniorCitizen = __ret2.seniorCitizen;
        });
    });
    console.log(`Khu phố tổng cộng có ${listManager.getListManager().length} hộ dân, tổng ${sum} người. Trong đó có ${numberOfMale} nam và ${numberOfFemale} nữ`);
    console.log(`Độ tuổi Nhi Đồng Thối Tai có ${children} người; độ tuổi Trẻ Trâu có ${teenager} người; 
                    độ tuổi Trung Tuần có ${middleAged} người; độ tuổi Về Vườn có ${seniorCitizen} người`);
}

function List_Military() {
    console.log()
    console.log(`====== Danh sách thiếu niên có thể tham gia nghĩa vụ quân sự ======`)
    let arrayManagerMilitary: Person[] = [];
    listManager.getListManager().forEach((household ) => {
        household.getListPerson().forEach((person) => {
            if (person.getAge() >= ageMinOfMilitary && person.getAge() <= ageMaxOfMilitary && person.getGender() == 'Male' ) {
                arrayManagerMilitary.push(person);
            }
        });
    });
    if (arrayManagerMilitary.length == 0) {
        console.log(`Danh sách không tồn tại!`);
    } else console.table(arrayManagerMilitary);
}

function List_Old_Person() {
    console.log()
    console.log(`====== Danh sách hưu trí trong xóm ======`)
    let arrayOldPeople: Person[] = [];
    listManager.getListManager().forEach((household) => {
        household.getListPerson().forEach((person) => {
            if (person.getAge() >= ageOfSeniorCitizen) {
                arrayOldPeople.push(person);
            }
        })
    })
    if (arrayOldPeople.length == 0) {
        console.log(`Danh sách không tồn tại!`);
    } else console.table(arrayOldPeople);
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

function findInfo() {
    console.log();
    console.log(`===== Tìm kiếm vị trí xuất hiện tên người dân =====`);
    let name: string;
    do {
          name = rl.question(`Nhập tên người dân muốn tìm vị trí: `);
    } while (!checkNameForm(name));
    findPositionByName(name);
}

function findPositionByName(name: string) {
    let flag = -1;
    listManager.getListManager().forEach((household) => {
        household.getListPerson().forEach((person) => {
            if (person.getName() === name) {
                console.log();
                console.log(`Người dân có tên ${name} có thông tin trong nhà số ${household.getNumberOfHouse()}`);
            } else {
                flag++;
            }
        });
    });
    if (flag < 0) console.log(`Không tồn tại thông tin!`);
}


//main
let listManager = new DistrictManager();

const choiceDefault = -1;
const ageOfSeniorCitizen = 54;
const ageMinOfTeenager = 11;
const ageMaxOfTeenager = 35;
const ageMinOfMilitary = 18;
const ageMaxOfMilitary = 25;
const countDefault = 0;
const nonentityIndexHouseOfHousehold = -1;

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
        case ChoiceMainMenu.GPS:
            findInfo();
            break;
    }
}




    
    
    
    
    
    
