import { DistrictManager } from "./src/District";
import { Household } from "./src/Household";
import { Person } from "./src/Person"
import * as rl from "readline-sync";
import {checkGenderForm} from "./checkFunction/RegEx_Gender";
import {checkJobForm} from "./checkFunction/RegEx_Job";
import {checkAgeForm} from "./checkFunction/RegEx_Age";
import {checkNumberOfHouse} from "./checkFunction/RegEx_NumberOfHouse";

let listManager = new DistrictManager();


let choice = -1;
let choiceAddInfo = -1;
let choiceShowInfo = -1;
let choiceDeleteInfo = -1;
let choiceManger = -1;

function mainMenu() {
    console.log()
    console.log(`======= Main Menu =======`)
    console.log(`1. Thêm thông tin`)
    console.log(`2. Hiển thị thông tin`)
    console.log(`3. Sửa thông tin`)
    console.log(`4. Xóa thông tin`)
    console.log(`5. Quản lý thông tin`)
    console.log(`0. Thoát`)
    choice = +rl.question(`Mời bạn nhập lựa chọn: `);
}

function addMenu() {
    console.log()
    console.log(`======= Thêm thông tin =======`)
    console.log(`1. Thêm thông tin mới`)
    console.log(`2. Thêm thông tin vào tư liệu sẵn có`)
    console.log(`0. Trở về`)
    choiceAddInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
}

function showMenu() {
    console.log()
    console.log(`======= Hiển thị thông tin ========`)
    console.log(`1. Hiển thị danh sách hộ dân`)
    console.log(`2. Hiển thị thông tin người dân chi tiết theo từng hộ dân`)
    console.log(`0. Trở về`)
    choiceShowInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
}

function deleteMenu() {
    console.log()
    console.log(`======= Xóa thông tin ========`)
    console.log(`1. Xóa thông tin hộ dân khỏi danh sách quản lý`)
    console.log(`2. Xóa thông tin người dân khỏi hộ dân`)
    console.log(`0. Trở về`)
    choiceDeleteInfo = +rl.question(`Mời bạn nhập lựa chọn: `);
}

function addPersonInfo() {
    let name = rl.question(`Nhập tên thành viên: `)
    let dob = rl.question(`Nhập năm sinh: `)
    let job = rl.question(`Nhập nghề nghiệp: `)
    let gender = rl.question(`Nhập giới tính: `)
    let person = new Person(name, dob, job, gender);
    return person;
}

function managerMenu() {
    console.log()
    console.log(`======= Quản lý ========`)
    console.log(`1. Thông tin chung khu phố`)
    console.log(`2. Danh sách thiếu niên đến tuổi nhập ngũ`)
    console.log(`3. Danh sách hưu trí hiện tại của địa phương`)
    console.log(`0. Trở về`)
    choiceManger = +rl.question(`Mời bạn nhập lựa chọn: `);
}


//main
while (choice !== 0) {
    mainMenu();
    switch (choice) {
        case 1:
            addMenu();
            switch (choiceAddInfo) {
                case 1:
                    console.log()
                    console.log(`====== Thêm thông tin hộ dân mới ======`)
                    let numberOfHouse = rl.question(`Nhập số nhà: `)
                    let numberOfMember = rl.question(`Nhập số thành viên muốn thêm: `)
                    let household = new Household(numberOfMember, numberOfHouse)
                    for (let i = 1; i <= +numberOfMember ; i++) {
                        console.log()
                        let person = addPersonInfo();
                        household.setListPerson(person)
                    }

                    listManager.addInfo(household)
                    break;
                case 2:
                    console.log()
                    console.log(`======= Thêm thông tin vào hộ dân sẵn có =======`)
                    let numberOfHouseNeed = rl.question(`Nhập số nhà muốn thêm thông tin thành viên: `)
                    let index = listManager.findByNumberOfHouse(numberOfHouseNeed);
                    if (listManager.findByNumberOfHouse(numberOfHouseNeed) !== -1) {
                        let input = rl.question(`Nhập số lượng thành viên muốn thêm: `)
                        for (let i = 0; i < +input; i++) {
                            console.log()
                            let person = addPersonInfo()
                            listManager.getListManager()[index].setListPerson(person)
                        }
                    } else console.log(`Không có trong danh sách!`)
                    break;
                case 0:
                    break;
            }
            break;
        case 2:
            showMenu();
            switch (choiceShowInfo) {
                case 1:
                    console.log()
                    console.log(`===== Hiển thị danh sách hộ dân trong toàn khu phố =====`)
                    for (const item of listManager.getListManager()) {
                        console.log()
                        console.log(`Số nhà ${item.getNumberOfHouse()} - Số nhân khẩu: ${item.getListPerson().length}`)
                    }
                    break;
                case 2:
                    console.log()
                    console.log(`===== Hiển thị thông tin người dân theo từng hộ dân =====`)
                    let numberOfHouse_Need = rl.question(`Nhập số nhà muốn xem thông tin người dân: `)
                    let index = listManager.findByNumberOfHouse(numberOfHouse_Need)
                    if (index !== -1) {
                        console.table(listManager.getListManager()[index].getListPerson())
                    } else console.log(`Không tồn tại số nhà!`)
                    break;
                case 0:
                    break;
            }
            break;
        case 3:
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
                for (let i = 1; i <= +numberOfMember ; i++) {
                    console.log()
                    let person = addPersonInfo();
                    household.setListPerson(person)
                }
                listManager.getListManager().splice(index,1,household)
            }
            break;
        case 4:
            deleteMenu()
            switch (choiceDeleteInfo) {
                case 1:
                    console.log()
                    console.log(`===== Xóa thông tin hộ dân =====`)
                    let number = rl.question(`Nhập số nhà muốn xóa: `)
                    let index = listManager.findByNumberOfHouse(number)
                    listManager.getListManager().splice(index,1)
                    break;
                case 2:
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
                        listManager.getListManager()[index_manager].getListPerson().splice(tempindex,1)
                    }
                    break;
                case 0:
                    break;
            }
            break;
        case 5:
            managerMenu()
            switch (choiceManger) {
                case 1:
                    console.log()
                    console.log(`===== Thống kê =====`)
                    let sum = 0;
                    let numberOfMale = 0;
                    let numberOfFemale = 0;
                    let teenager = 0;
                    let middle_aged = 0;
                    let senior_citizen = 0;
                    for (let i = 0; i < listManager.getListManager().length ; i++) {
                        sum += listManager.getListManager()[i].getListPerson().length;
                        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
                            if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Male") {
                                numberOfMale++;
                            } else if (listManager.getListManager()[i].getListPerson()[j].getGender() == "Female") {
                                numberOfFemale++;
                            }
                            if (listManager.getListManager()[i].getListPerson()[j].getAge() > 18
                                && listManager.getListManager()[i].getListPerson()[j].getAge() < 35) {
                                teenager++;
                            } else if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 35
                                && listManager.getListManager()[i].getListPerson()[j].getAge() < 54) {
                                middle_aged++;
                            } else  if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 54) {
                                senior_citizen++
                            }
                        }
                    }
                    console.log(`Khu phố tổng cộng có ${sum} người. Trong đó có ${numberOfMale} nam và ${numberOfFemale} nữ`)
                    console.log(`Độ tuổi Trẻ Trâu có ${teenager} người; độ tuổi Trung Tuần có ${middle_aged} người; độ tuổi Về Vườn có ${senior_citizen} người`)
                    break;
                case 2:
                    console.log()
                    console.log(`====== Danh sách thiếu niên có thể tham gia nghĩa vụ quân sự ======`)
                    let arrayManagerMilitary: Person[] = [];
                    for (let i = 0; i < listManager.getListManager().length ; i++) {
                        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
                            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 18
                                && listManager.getListManager()[i].getListPerson()[j].getAge() <=25
                                && listManager.getListManager()[i].getListPerson()[j].getGender() === 'Male') {
                                arrayManagerMilitary.push(listManager.getListManager()[i].getListPerson()[j])
                            }
                        }
                    }
                    console.table(arrayManagerMilitary);
                    break;
                case 3:
                    console.log()
                    console.log(`====== Danh sách hưu trí trong xóm ======`)
                    let arrayOldPeople: Person[] = []
                    for (let i = 0; i < listManager.getListManager().length ; i++) {
                        for (let j = 0; j < listManager.getListManager()[i].getListPerson().length; j++) {
                            if (listManager.getListManager()[i].getListPerson()[j].getAge() >= 54) {
                                arrayOldPeople.push(listManager.getListManager()[i].getListPerson()[j])
                            }
                        }
                    }
                    console.table(arrayOldPeople)
                    break;
                case 0:
                    break;
            }
            break;
    }

}
    
    
    
    
    
    
