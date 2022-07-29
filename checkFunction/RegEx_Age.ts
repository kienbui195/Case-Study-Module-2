export function  checkAgeForm(age: string): boolean {
    let form: RegExp = /^(199[0-9]|19[5-9][0-9]|200[0-9]|20[1-2][0-9])$/;
    return form.test(age);
}