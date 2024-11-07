import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntPoint } from '../entPoint';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register-update',
  templateUrl: './register-update.component.html',
  styleUrls: ['./register-update.component.css']
})
export class RegisterUpdateComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(this.data.name),
    username: new FormControl(this.data.username),
    role: new FormControl(this.data.roles),
    department: new FormControl(this.data.department),
    position: new FormControl(this.data.position)
  });

  formHasErrors: boolean = false;

  constructor(public dialogRef: MatDialogRef<RegisterUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogRegister,
    public validator: EntPoint,
    public loginService: LoginService,
    public router: Router) { }

  ngOnInit(): void {
    this.getRoleList();
  }

  selectedRole: any = {};
  setRoleInForm() {
    const currentRole = this.data.roles[0];
    if (typeof currentRole === 'undefined') {
      return;
    }
    const selRole = this.roleList.filter((item: any) => item.name === currentRole.name);
    this.selectedRole = selRole[0];
  }

  roleList: any = [];
  errorMessage: string = '';
  getRoleList() {
    this.loginService.getRoleList().subscribe((data: any) => {
      this.roleList = data;
      this.setRoleInForm();
    },
    (error) => {
      this.errorMessage = error.error.message;
    })
  }

  message: string = '';
  status: number = 0;
  updateData() {
    if (this.validator.validateForm(this.form)) {
      this.formHasErrors = true;
      return;
    }
    const user = {
      "id": this.data.id,
      "name": this.form.value.name,
      "username": this.form.value.username,
      "role": [this.form.value.role.name],
      "department": this.form.value.department,
      "position": this.form.value.position
    }
    this.loginService.updateUser(user.id, user).subscribe((data: any) => {
      this.message = data;
      /*this.router.navigate(['/registro']).then(() => {
        console.log(data)
      });*/
      this.dialogRef.close();
      
    },
    (error) => {
      this.errorMessage = error.message;
      this.status = error.status;
    });
  }

}

export interface DialogRegister {
  id: number;
  name: string;
  username: string;
  password: string;
  roles: Array<any>;
  department: string;
  position: string;
}
