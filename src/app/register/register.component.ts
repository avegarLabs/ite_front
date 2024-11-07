import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { DialogService } from '../dialog.service';
import { ConfirmDialogData } from '../dialogs/confirm/confirm.component';
import { EntPoint } from '../entPoint';
import { LoginService } from '../login/login.service';
import { RegisterUpdateComponent } from '../register-update/register-update.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formHasErrors: boolean = false;
  isCodeEspAdd: boolean = false;
  isPasswordNotEqual: boolean = false;
  isLoading!:boolean;

  form = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    role: new FormControl(''),
    department: new FormControl(''),
    position: new FormControl('')
  });

  clearFormsField(){
    this.form =  new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      password2: new FormControl(''),
      role: new FormControl(''),
      department: new FormControl(''),
      position: new FormControl('')
    });
  }

  constructor(
    public validator: EntPoint,
    public confirmDialogService: DialogService,
    public loginService: LoginService,
    public dialogService: DialogService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserList();
    this.getRoleList();
  }

  checkPassword(): boolean {
    if (this.form.value.password === this.form.value.password2) {
      return true;
    }
    return false;
  }

  userList: any = [];
  getUserList() {
    this.isLoading = true;
    this.loginService.getUserList().subscribe((data: any) => {
      this.userList = data;
      this.isLoading = false;
    },
    (error) => {
      this.errorMessage = error.error.message;
    })
  }

  roleList: any = [];
  getRoleList() {
    this.loginService.getRoleList().subscribe((data: any) => {
      this.roleList = data;
    },
    (error) => {
      this.errorMessage = error.error.message;
    })
  }

  getUserRoles(item: any) {
    const roles = item.roles;
    var user_roles: string[] = [];
    roles.forEach((role: any) => {
      user_roles.push(role.description);
    });
    return user_roles;
  }

  errorMessage: string = '';
  errorAddUser: boolean = false;
  status: number = 0;
  addData() {
    if (this.validator.validateForm(this.form)) {
      this.formHasErrors = true;
      return;
    }
    if (!this.checkPassword()) {
      this.isPasswordNotEqual = true;
    }
    const name = this.form.value.name;
    const username = this.form.value.username;
    const password = this.form.value.password;
    const role = this.form.value.role.name;
    const department =  this.form.value.department;
    const position =  this.form.value.position
    this.loginService.addNewUser(name, username, password, role, department, position).subscribe((data: any) => {
      this.getUserList();
      this.clearFormsField();
    },
    (error) => { //Error callback
      this.errorMessage = error.message;
      this.errorAddUser = true;
      this.status = error.status;
    })
  }

  deleteUser(user: any) {
    const confirmData: ConfirmDialogData = {
      title: 'Confirmar eliminar',
      message: '¿Realmente desea eliminar este usuario?',
      confirmText: 'Si',
      cancelText: 'No',
    }
    this.confirmDialogService.confirmDialog(confirmData).subscribe(action => {
      if (action) {
        this.loginService.deleteUser(user.id).subscribe((data: any) => {
          this.getUserList();
        },
        (error) => {
          console.log(error.message);
        })
      }
    });
  }

  openDialog(data: any): void {
   // console.log(data);
    const dialogRef = this.dialog.open(RegisterUpdateComponent, {
      width: '350px',
      data: {
        id: data.id,
        name: data.name,
        username: data.username,
        password: '',
        roles: data.roles,
        department: data.department,
        position: data.position },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }

  openChangePassword(data: any): void {
     const dialogRef = this.dialog.open(ChangePasswordComponent, {
       width: '350px',
       data: {
         id: data.id,
         username: data.username,
         passwordOld: '',
         passwordNew: '',
         passwordCon: '' },
     });
   }


   indiceList: any = [];
   pageSize: number = 3;
   pageIndex: number = 0;
   numItemList: number = 0;

   pgForm = new FormGroup({
    pgSize: new FormControl(this.pageSize),
   });

   setPaginatorData() {
    this.pageSize = 3;
    this.pageIndex = 0;
    this.numItemList = this.indiceList.length;
  }

  handlePageChange(index: number) {
    this.pageIndex = index;
  }

  setPageSize() {
    this.pageIndex = 0;
    this.pageSize = Number(this.pgForm.value.pgSize);
  }

}
