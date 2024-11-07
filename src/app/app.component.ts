import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { TokenStorageService } from './login/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showSideMenu: boolean = false;
  userIsLoged: boolean = false;
  isUserAdmin: boolean = false;
  user: any = '';
  userRol: any = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    const loged = Boolean(this.tokenStorageService.getItem('isLogedIn'));
    this.showSideMenu = loged;
    this.userIsLoged = loged;
    if (!loged) {
      this.router.navigate(['/login']);
    } else {
      this.user = this.tokenStorageService.getItem('username');
      this.userRol = this.tokenStorageService.getItem('role');
      console.log(this.user)
    }
    this.getUserIsAdmin();
  }

  logout() {
    this.loginService.logout().subscribe((data) => {
      this.tokenStorageService.clearAllItems();
      this.router.navigate(['/login']).then(() => {
        // window.location.reload();
        this.showSideMenu = false;
      });
    });
  }

  getUserIsAdmin() {
    if (this.userRol === 'ROLE_ADMIN') {
      this.isUserAdmin = true;
      return;
    }
    this.isUserAdmin = false;
  }

  gotoConfiguration() {
    this.router.navigate(['/configuracion']);
  }

}
