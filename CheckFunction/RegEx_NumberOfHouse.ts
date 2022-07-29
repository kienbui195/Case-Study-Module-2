export function  checkNumberOfHouse(number: string): boolean {
    let form: RegExp = /^[0-9A-Za-z]{1,4}$/;
    return form.test(number);
}