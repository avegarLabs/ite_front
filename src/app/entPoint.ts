import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EntPoint {

  hasInvalidControl: boolean = false;
  hasInvalidField: boolean = false;
  classStyle: string = 'form-control';

  validateForm(form: FormGroup) {
    this.hasInvalidControl = false;
    for (const field in form.controls) {
     // console.log(field)// field : string
      const control = form.get(field); // control : FormControl
      if (control?.value === "") {
        control.markAsTouched();
        this.hasInvalidControl = true;
      }
      else {
        control?.markAsUntouched();
      }
    }
    return this.hasInvalidControl;
  }

  validateField(control: AbstractControl) {
    if (control?.value === "") {
      control.markAsTouched();
      this.hasInvalidField = true;
    }
    else {
      control?.markAsUntouched();
      this.hasInvalidField = false;
    }
    return this.hasInvalidField;
  }

  setControlClass(control?: AbstractControl, flagErrors?: boolean, type?: string, otherClass?: string) {
    if (typeof control === 'undefined') {
      return this.classStyle.trim();
    }
    if (typeof flagErrors === 'undefined') {
      flagErrors = false;
    }
    if (typeof type === 'undefined') {
      type = 'text';
    }
    if (typeof otherClass === 'undefined') {
      otherClass = '';
    }
    switch (type) {
      case 'text':
        this.classStyle = 'form-control ' + otherClass;
        break;

      case 'select':
        this.classStyle = 'form-select ' + otherClass;
        break;

      case 'check':
        this.classStyle = 'form-check-input ' + otherClass;
        break;

      default:
        this.classStyle = 'form-control ' + otherClass;
    }

    if (!flagErrors && control.touched) {
      return this.classStyle.trim();
    } else if (flagErrors && control.touched) {
      this.classStyle = this.classStyle + ' is-invalid';
      return this.classStyle.trim();
    }
    return this.classStyle.trim();
  }

  resetFormControls(form: FormGroup) {
    form.markAsUntouched();
  }

}
