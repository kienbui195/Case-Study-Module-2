export function checkJobForm(job: string): boolean {
    let form: RegExp = /^[A-z a-z]+$$/;
    return form.test(job);
}