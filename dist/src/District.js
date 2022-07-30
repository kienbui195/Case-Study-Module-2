"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictManager = void 0;
class DistrictManager {
    constructor() {
        this.listManager = [];
    }
    addInfo(data) {
        this.listManager.push(data);
    }
    getListManager() {
        return this.listManager;
    }
    findByNumberOfHouse(data) {
        let result = -1;
        this.listManager.forEach((value, index) => {
            if (value.getNumberOfHouse() === data) {
                result = index;
            }
        });
        return result;
    }
}
exports.DistrictManager = DistrictManager;
