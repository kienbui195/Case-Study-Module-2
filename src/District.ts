import {Household} from "./Household";

export class DistrictManager {
    private listManager: Household[] = [];

    addInfo(data: Household) {
        this.listManager.push(data);
    }
    getListManager(): Household[] {
        return this.listManager
    }
    findByNumberOfHouse(data: string): number {
        let result = -1;
        this.listManager.forEach((value,index) => {
            if (value.getNumberOfHouse() === data) {
                result = index;
            }
        })
        return result;
    }
}