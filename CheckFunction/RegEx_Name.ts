export function checkNameForm(name: string): boolean {
    let form: RegExp = /^[A-za-z ]+$/;
    return form.test(name);
}