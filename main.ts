import { DistrictManager } from "./src/District";
import { Household } from "./src/Household";
import { Person } from "./src/Person"
import * as rl from "readline-sync";

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

function managerMenu() {
    console.log()
    console.log(`======= Quản lý ========`)
    console.log(`1. Danh sách thiếu niên đến tuổi nhập ngũ`)
    console.log(`2. Danh sách hưu trí hiện tại của địa phương`)
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
                    if (+numberOfMember < 2) {
                        let name = rl.question(`Nhập tên: `)
                    } else {
                        for (let i = 1; i <= +numberOfMember ; i++) {
                            console.log()
                            let name = rl.question(`Nhập tên thành viên thứ ${i}: `)
                            let dob = rl.question(`Nhập năm sinh: `)
                            let job = rl.question(`Nhập nghề nghiệp: `)
                            let person = new Person(name,dob,job);
                            household.setListPerson(person)
                        }
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
                            let name1 = rl.question(`Nhập tên: `)
                            let dob1 = rl.question(`Nhập năm sinh: `)
                            let job1 = rl.question(`Nhập nghề nghiệp: `)
                            let person = new Person(name1,dob1,job1);
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
                    } else console.log(`Không tồn tại số nhà`)
                    break;
                case 0:
                    break;
            }
        case 3:
            console.log()
            console.log(`===== Sửa thông tin cá nhân`)
    }
}
    
    
    
    
    
    
