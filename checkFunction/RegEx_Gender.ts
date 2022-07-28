export function checkGenderForm(gender: string): boolean {
    let form: RegExp = /^(Male|Female)?$/;
    if (form.test(gender) === true) return true;
    else return false;
}