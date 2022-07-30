export function  checkNumberOfHouse(number: string): boolean {
    let form: RegExp = /(?:^[1-9]|[1-9]+\d+|\d+[A-Za-z]{1,3})$/;
    return form.test(number);
}