export function  checkYesOrNoForm(answer: string): boolean {
    let form: RegExp = /^[Y|N]$/;
    return form.test(answer);
}
