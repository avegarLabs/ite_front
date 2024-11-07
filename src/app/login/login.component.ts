import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage: any = {};
  loginError: boolean = false;

  constructor(
    private loginService: LoginService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  currentUser: any = '';
  ngOnInit(): void {
  }

  isLogedIn: boolean = false;
  loginHandler() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.loginService.login(username, password).subscribe((data: any) => {
      this.isLogedIn = true;
      this.tokenStorageService.saveItem('isLogedIn', 'true');
      this.tokenStorageService.saveItem('username', data.username);
      this.tokenStorageService.saveItem('role', data.roles);
      this.currentUser = data.username;
      this.form.reset();
      this.loginError = false;
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });;
    },
    (error) => { //Error callback
      // console.error('error caught in component')
      this.errorMessage = error.error.message;
      this.loginError = true;
      console.log('Error autenticando usuario...');
    }
    );
  }

}
