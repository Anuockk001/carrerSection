import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9A-Z.-]+\.[a-z]{2,}$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: { value: control.value } };
  };
}
