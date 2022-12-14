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

let person1 = new Person('Tung', '2006', 'abcd', 'Male');
let person2 = new Person('Bao', '1958', 'abcd', 'Male');
let person3 = new Person('Kien', '1995', 'abcd', 'Male');
let person4 = new Person('Trang', '2010', 'abcd', 'Female');

let  household1 = new Household('2', '1a');
let  household2 = new Household('2', '2b');

household1.setListPerson(person1);
household1.setListPerson(person2);
household2.setListPerson(person3);
household2.setListPerson(person4);

listManager.addInfo(household1);
listManager.addInfo(household2);

export function addPersonInfo() {
    let dob: string, gender: string, job: string, name: string;
    do {
        name = rl.question(`Nh???p t??n: `);
    } while (!checkNameForm(name));
    do {
        dob = rl.question(`Nh???p n??m sinh: `);
    } while (!checkAgeForm(dob));
    do {
        job = rl.question(`Nh???p ngh??? nghi???p: `);
    } while (!checkJobForm(job));
    do {
        gender = rl.question(`Nh???p gi???i t??nh: `);
    } while (!checkGenderForm(gender));
    return new Person(name, dob, job, gender);
}

function addNewInfo() {
    console.log();
    console.log(`====== Th??m th??ng tin h??? d??n m???i ======`);
    let numberOfHouse: string, numberOfMember: string;
    do {
        numberOfHouse = rl.question(`Nh???p s??? nh??: `);
    } while (!checkGenderForm(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != nonentityIndexHouseOfHousehold);
    do {
        numberOfMember = rl.question(`Nh???p s??? th??nh vi??n mu???n th??m: `);
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
        console.log(`Kh??ng c?? th??ng tin. M???i b???n th??m th??ng tin!`);
    } else {
        let numberOfHouseNeed: string;
        let input: string;
        console.log(`======= Th??m th??ng tin v??o h??? d??n s???n c?? =======`);
        do {
            numberOfHouseNeed = rl.question(`Nh???p s??? nh?? mu???n th??m: `);
        } while (!checkNumberOfHouse(numberOfHouseNeed));
        let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
        if (listManager.findByNumberOfHouse(numberOfHouseNeed) != nonentityIndexHouseOfHousehold) {
            do{
                input = rl.question(`Nh???p s??? l?????ng th??nh vi??n mu???n th??m: `);
            } while (!checkNumberOfMemberForm(input));
            for (let i = 0; i < +input; i++) {
                console.log();
                let person = addPersonInfo();
                listManager.getListManager()[index].setListPerson(person);
            }
        } else console.log(`Kh??ng c?? trong danh s??ch!`);
    }
}

function add_Info() {
    addMenu();
    choiceAddInfo = +rl.question(`M???i b???n nh???p l???a ch???n: `);
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
        console.log(`Kh??ng c?? th??ng tin. M???i nh???p th??m th??ng tin`);
    } else {
        console.log(`===== Hi???n th??? danh s??ch h??? d??n trong to??n khu ph??? =====`);
        console.log();
        for (const item of listManager.getListManager()) {
            console.log(`STT ${count + 1}. S??? nh?? ${item.getNumberOfHouse()} - S??? nh??n kh???u: ${item.getListPerson().length}`);
            count++;
        }
    }
}

function showPerson() {
    console.log();
    console.log(`===== Hi???n th??? th??ng tin ng?????i d??n theo t???ng h??? d??n =====`);
    let numberOfHouseNeed = rl.question(`Nh???p s??? nh?? mu???n xem th??ng tin ng?????i d??n: `);
    let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
    if (index !== nonentityIndexHouseOfHousehold) {
        if (listManager.getListManager()[index].getListPerson().length == 0) {
            console.log(`Kh??ng c?? th??ng tin! M???i nh???p th??m th??ng tin`);
        } else {
            console.table(listManager.getListManager()[index].getListPerson());
        }
    } else console.log(`Kh??ng t???n t???i s??? nh??!`);
}

function show_Info() {
    showMenu();
    choiceShowInfo = +rl.question(`M???i b???n nh???p l???a ch???n: `);
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
    choiceToFix = +rl.question(`M???i b???n nh???p l???a ch???n: `);
    switch (choiceToFix) {
        case ChoiceToFix.NAME:
            do {
                name = rl.question(`Nh???p t??n: `);
            } while (!checkNameForm(name));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setName(name);
            break;
        case ChoiceToFix.DOB:
            do {
                dob = rl.question(`Nh???p n??m sinh: `);
            } while (!checkAgeForm(dob));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setDob(dob);
            break;
        case ChoiceToFix.JOB:
            do {
                job = rl.question(`Nh???p ngh??? nghi???p: `);
            } while (!checkJobForm(job));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setJob(job);
            break;
        case ChoiceToFix.GENDER:
            do {
                gender = rl.question(`Nh???p gi???i t??nh: `);
            } while (!checkGenderForm(gender));
            listManager.getListManager()[indexManager].getListPerson()[indexPersonNeedEdit].setGender(gender);
            break;
        case  ChoiceToFix.NUMBEROFHOUSE:
            do {
                numberOfHouse = rl.question(`Nh???p s??? nh?? m???i: `);
            } while (!checkGenderForm(numberOfHouse) && listManager.findByNumberOfHouse(numberOfHouse) != nonentityIndexHouseOfHousehold);
            listManager.getListManager()[indexManager].setNumberOfHouse(numberOfHouse);
            break;
    }
}

function findExactlyPersonByName(arrayPersonSameName: Person[], indexManager: number): number {
    let indexPersonNeeded: number;
    console.table(arrayPersonSameName);
    let index = +rl.question(`Nh???p index c???a ng?????i d??n mu???n ch???nh s???a: `);
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
    console.log(`===== S???a th??ng tin h??? d??n =====`);
    let numberOfHouseNeed = rl.question(`Nh???p s??? nh?? mu???n s???a th??ng tin: `);
    let indexManager = listManager.findByNumberOfHouse(numberOfHouseNeed);
    if (indexManager != nonentityIndexHouseOfHousehold) {
        console.log();
        console.table(listManager.getListManager()[indexManager].getListPerson());
        let nameNeedEdit = rl.question(`Nh???p t??n ng?????i d??n mu???n s???a th??ng tin: `);
        let arrayPersonSameName = listManager.getListManager()[indexManager].findByName(nameNeedEdit);
        let indexPersonNeedEdit: number;
        if (arrayPersonSameName.length > 0) {
            indexPersonNeedEdit = findExactlyPersonByName(arrayPersonSameName, indexManager);
            do {
                choiceFixMenu(indexManager, indexPersonNeedEdit);
            } while (choiceToFix != ChoiceToFix.GOBACK);
        } else {
                console.log(`Kh??ng t???n t???i t??n m?? b???n mu???n t??m ki???m!`);
        }
    } else console.log(`Kh??ng t???n t???i s??? nh??!`);
}

function DeleteHousehold() {
    console.log();
    console.log(`===== X??a th??ng tin h??? d??n =====`);
    let number: string;
    showListDistrict();
    do {
        number = rl.question(`Nh???p s??? nh?? mu???n x??a th??ng tin: `);
    } while (!checkNumberOfHouse(number));
    let index = listManager.findByNumberOfHouse(number);
    if (index !== nonentityIndexHouseOfHousehold) {
        let question: string;
        do {
            question = rl.question(`B???n ch???c ch???n mu???n x??a?[Y/N]: `);
        } while (!checkYesOrNoForm(question));
        if (question == 'Y') {
            listManager.getListManager().splice(index, 1);
        } else delete_Info();
    } else console.log(`Kh??ng t???n t???i s??? nh??!`);
}

function findExactlyIndexOfPersonNeedDelete(indexManager: number, listSameName: Person[], indexPerson: number) {
    let tempIndex: number;
    listManager.getListManager()[indexManager].getListPerson().forEach((item, index) => {
        if (listSameName[indexPerson].getName() == item.getName()
            && listSameName[indexPerson].getDob() == item.getDob()
            && listSameName[indexPerson].getJob() == item.getJob()
            && listSameName[indexPerson].getGender() == item.getGender()) {
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
        name = rl.question(`Nh???p t??n mu???n x??a: `);
    } while (!checkNameForm(name));
    listSameName = listManager.getListManager()[indexManager].findByName(name);
    console.table(listSameName);
    let indexPersonOfListSameName = +rl.question(`Ch???n index ng?????i d??n mu???n x??a: `);
    tempIndex = findExactlyIndexOfPersonNeedDelete(indexManager, listSameName, indexPersonOfListSameName);
    let question: string;
    do {
        question = rl.question(`B???n ch???c ch???n mu???n x??a?[Y/N]: `);
    } while (!checkYesOrNoForm(question));
    if (question == 'Y') {
        listManager.getListManager()[indexManager].getListPerson().splice(tempIndex, 1);
    } else delete_Info();
}

function DeletePerson() {
    console.log();
    console.log(`===== X??a th??ng tin ng?????i d??n =====`);
    let listSameName: Person[] = [];
    let number: string;
    do {
        number = rl.question(`Nh???p s??? nh??: `);
    } while (!checkNumberOfHouse(number));
    let indexManager = listManager.findByNumberOfHouse(number);
    if (indexManager !== nonentityIndexHouseOfHousehold) {
        deleteByName(indexManager, listSameName);
    } else {
        console.log(`Kh??ng t???n t???i s??? nh??!`);
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
    console.log(`===== Th???ng k?? =====`)
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
    console.log(`Khu ph??? t???ng c???ng c?? ${listManager.getListManager().length} h??? d??n, t???ng ${sum} ng?????i. Trong ???? c?? ${numberOfMale} nam v?? ${numberOfFemale} n???`);
    console.log(`????? tu???i Nhi ?????ng Th???i Tai c?? ${children} ng?????i; ????? tu???i Tr??? Tr??u c?? ${teenager} ng?????i; 
                    ????? tu???i Trung Tu???n c?? ${middleAged} ng?????i; ????? tu???i V??? V?????n c?? ${seniorCitizen} ng?????i`);
}

function List_Military() {
    console.log()
    console.log(`====== Danh s??ch thi???u ni??n c?? th??? tham gia ngh??a v??? qu??n s??? ======`)
    let arrayManagerMilitary: Person[] = [];
    listManager.getListManager().forEach((household ) => {
        household.getListPerson().forEach((person) => {
            if (person.getAge() >= ageMinOfMilitary && person.getAge() <= ageMaxOfMilitary && person.getGender() == 'Male' ) {
                arrayManagerMilitary.push(person);
            }
        });
    });
    if (arrayManagerMilitary.length == 0) {
        console.log(`Danh s??ch kh??ng t???n t???i!`);
    } else console.table(arrayManagerMilitary);
}

function List_Old_Person() {
    console.log()
    console.log(`====== Danh s??ch h??u tr?? trong x??m ======`)
    let arrayOldPeople: Person[] = [];
    listManager.getListManager().forEach((household) => {
        household.getListPerson().forEach((person) => {
            if (person.getAge() >= ageOfSeniorCitizen) {
                arrayOldPeople.push(person);
            }
        })
    })
    if (arrayOldPeople.length == 0) {
        console.log(`Danh s??ch kh??ng t???n t???i!`);
    } else console.table(arrayOldPeople);
}

function delete_Info() {
    deleteMenu()
    choiceDeleteInfo = +rl.question(`M???i b???n nh???p l???a ch???n: `);
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
    choiceManger = +rl.question(`M???i b???n nh???p l???a ch???n: `);
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
    console.log(`===== T??m ki???m v??? tr?? xu???t hi???n t??n ng?????i d??n =====`);
    let name: string;
    do {
          name = rl.question(`Nh???p t??n ng?????i d??n mu???n t??m v??? tr??: `);
    } while (!checkNameForm(name));
    findPositionByName(name);
}

function findPositionByName(name: string) {
    let flag = -1;
    listManager.getListManager().forEach((household) => {
        household.getListPerson().forEach((person) => {
            if (person.getName() === name) {
                console.log();
                console.log(`Ng?????i d??n c?? t??n ${name} c?? th??ng tin trong nh?? s??? ${household.getNumberOfHouse()}`);
            } else {
                flag++;
            }
        });
    });
    if (flag < 0) console.log(`Kh??ng t???n t???i th??ng tin!`);
}


//main
while (choice !== ChoiceMainMenu.EXIT) {
    mainMenu();
    choice = +rl.question(`M???i b???n nh???p l???a ch???n: `);
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





    
    
    
    
    
