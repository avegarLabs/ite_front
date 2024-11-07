import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntPoint } from '../entPoint';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated = false;

  constructor(private http: HttpClient, private url: EntPoint) {
  }

  loginURL: string = '/api/auth/signin';
 
  
  login(username: string, password: string) {
    console.log(this.loginURL);
    return this.http.post(
      this.loginURL,
      {"username": username, "password": password}
      );
  }

  logoutURL: string = '/api/auth/signout';
  logout() {
    return this.http.post(this.logoutURL, {});
  }

  userDetailURL: string = '/api/user/userdetail';
  getUserDetail() {
    return this.http.get(this.userDetailURL);
  }

  addUserURL: string = '/api/user/register';
  addNewUser(name: string, username: string, password: string, role: string, department: string, position: string) {
    const newUser = {
      "name" : name,
      "username" : username,
      "password" : password,
      "role": [role],
      "department": department,
      "position": position
    };
    return this.http.post(this.addUserURL, newUser);
  }

  userListURL: string = '/api/user/userlist';
  getUserList() {
    return this.http.get(this.userListURL);
  }

  roleListURL: string = '/api/user/rolelist';
  getRoleList() {
    return this.http.get(this.roleListURL);
  }

  updateUserURL: string = '/api/user/update';
  updateUser(id: any, data: any) {
    return this.http.put(`${this.updateUserURL}/${id}`, data);
  }

  // cambio de datos del usuario
  updateUserDetailURL: string = '/api/user/userdetail/update';
  updateUserDetail(id: any, data: any) {
    return this.http.put(`${this.updateUserDetailURL}/${id}`, data);
  }

  // Cambio de contrasenna del admin
  updateUserPwdURL: string = '/api/user/chgpwd';
  updateUserPassword(id: any, data: any) {
    return this.http.put(`${this.updateUserPwdURL}/${id}`, data);
  }

  // Cambio de contrasenna de usuario
  updateUserDetailPwdURL: string = '/api/user/userdetail/chgpwd';
  updateUserDetailPassword(id: any, data: any) {
    return this.http.put(`${this.updateUserDetailPwdURL}/${id}`, data);
  }

  deleteUserUrl: string =  '/api/user/delete';
  deleteUser(id: any) {
    return this.http.delete(`${this.deleteUserUrl}/${id}`);
  }

}
