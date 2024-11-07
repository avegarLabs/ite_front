import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EntPoint } from '../entPoint';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  formUser = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    department: new FormControl(''),
    position: new FormControl('')
  });

  formChgPwd = new FormGroup({
    passwordOld: new FormControl(''),
    passwordNew: new FormControl(''),
    passwordCon: new FormControl('')
  });

  formChgPwdHasErrors: boolean = false;
  formUserHasErrors: boolean = false;
  isPasswordNotEqual: boolean = false;
  showNotification: boolean = false;
  message: string = '';
  color: string = '';

  constructor(
    public loginService: LoginService,
    public validator: EntPoint) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  checkPassword(): boolean {
    if (this.formChgPwd.value.passwordNew === this.formChgPwd.value.passwordCon) {
      return true;
    }
    return false;
  }

  updateUserData() {
    if (this.validator.validateForm(this.formUser)) {
      this.formUserHasErrors = true;
      return;
    }
    const id = Number(this.userDetails.id);
    const data = {
      "id": id,
      "name": this.formUser.value.name,
      "username": this.formUser.value.username,
      "department": this.formUser.value.department,
      "position": this.formUser.value.position
    }
    this.loginService.updateUserDetail(id, data).subscribe((data: any) => {
      this.message = data.message;
      this.showNotification = true;
      if (Number(data.code) === 0) {
        this.color = 'bg-success';
      } else {
        this.color = 'bg-danger';
      }
    })
  }

  changeUserPassword() {
    if (this.validator.validateForm(this.formChgPwd)) {
      this.formChgPwdHasErrors = true;
      return;
    }
    if (!this.checkPassword()) {
      this.isPasswordNotEqual = true;
      return;
    }
    const id = Number(this.userDetails.id);
    const data = {
      "id": id,
      "passwordOld" : this.formChgPwd.value.passwordOld,
      "passwordNew": this.formChgPwd.value.passwordNew
    }
    this.loginService.updateUserDetailPassword(id, data).subscribe((data: any) => {
      this.message = data.message;
      this.showNotification = true;
      console.log(data);
      if (Number(data.code) === 0) {
        this.color = 'bg-success';
        this.formChgPwd.reset();
      } else {
        this.color = 'bg-danger';
      }
    })
  }

  userDetails: any = {};
  getUserDetails() {
    this.loginService.getUserDetail().subscribe((data: any) => {
      this.userDetails = data;
      this.formUser.controls['name'].setValue(this.userDetails.name);
      this.formUser.controls['username'].setValue(this.userDetails.username);
      this.formUser.controls['department'].setValue(this.userDetails.department);
      this.formUser.controls['position'].setValue(this.userDetails.position);
    })
  }

}
