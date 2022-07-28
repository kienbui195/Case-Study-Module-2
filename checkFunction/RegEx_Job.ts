export function checkJobForm(job: string): boolean {
    let form: RegExp = /^^[A-z a-z]+$$/;
    if (form.test(job) === true) return true;
    else return false;
}