import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntPoint } from '../entPoint';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(this.data.username),
    passwordNew: new FormControl(''),
    passwordCon: new FormControl('')
  });

  formHasErrors: boolean = false;
  isPasswordNotEqual: boolean = false;
  status: number = 0;
  message: string = '';
  errorMessage: string = '';

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: changePasswordData,
    public validator: EntPoint,
    public loginService: LoginService,
    public router: Router) { }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.validator.validateForm(this.form)) {
      this.formHasErrors = true;
      return;
    }
    if (!this.checkPassword()) {
      this.isPasswordNotEqual = true;
      return;
    }
    const data = {
      "id": this.data.id,
      "password": this.form.value.passwordNew,
    }
    this.loginService.updateUserPassword(data.id, data).subscribe((ans: any) => {
      this.message = ans;
      this.router.navigate(['/registro']).then(() => {
        window.location.reload();
      });
      this.dialogRef.close();
    },
    (error) => {
      this.errorMessage = error.message;
      this.status = error.status;
    });
  }

  checkPassword(): boolean {
    if (this.form.value.passwordNew === this.form.value.passwordCon) {
      return true;
    }
    return false;
  }

  closeForm(){
    this.dialogRef.close();
  }

}

export interface changePasswordData {
  id: number;
  username: string;
  passwordOld: string;
  passwordNew: string;
  passwordCon: string;
}
