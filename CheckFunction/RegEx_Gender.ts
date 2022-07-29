export function checkGenderForm(gender: string): boolean {
    let form: RegExp = /^(Male|Female)?$/;
    return form.test(gender);
}