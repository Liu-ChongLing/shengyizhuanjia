// author:Liu-ChongLing
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function confirmValidator(confirm: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    }
    return control.value !== confirm ? { confirm: { value: true } } : null;
  };
}
@Directive({
  selector: '[appConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmDirective,
      multi: true
    }
  ]
})
export class ConfirmDirective implements Validator {
  @Input('appConfirm') confirm: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    return this.confirm ? confirmValidator(this.confirm)(control) : null;
  }
}
