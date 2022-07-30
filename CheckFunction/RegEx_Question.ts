export function  checkYesOrNoForm(anwser: string): boolean {
    let form: RegExp = /^(Y|N)?$/;
    return form.test(anwser);
}