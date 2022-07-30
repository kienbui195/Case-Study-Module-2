export function  checkAgeForm(age: string): boolean {
    let form: RegExp = /^(199\d|19[5-9]\d|200\d|20[1-2]\d)$/;
    return form.test(age);
}