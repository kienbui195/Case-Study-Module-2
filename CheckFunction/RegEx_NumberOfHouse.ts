export function  checkNumberOfHouse(number: string): boolean {
    let form: RegExp = /(?:\d+|\d+[A-Za-z]{1,3})$/;
    return form.test(number);
}