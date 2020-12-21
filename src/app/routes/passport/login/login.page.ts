import { Login } from './../login';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  CurrentLoginedUser: Login = {
    identifier: '',
    passwordToken: '',
    shopName: '',
    phone: '',
    loginDate: '',
  };
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }
  onLogin(form: NgForm) {
    let i: any;
    const SignupedUser = this.localStorageService.get('SignupedUsers');
    for (i in SignupedUser) {
      // tslint:disable-next-line: triple-equals
      if (SignupedUser[i].phone == this.CurrentLoginedUser.identifier || SignupedUser[i].email === this.CurrentLoginedUser.identifier) {
        if (SignupedUser[i].password === this.CurrentLoginedUser.passwordToken) {
          console.log('登陆成功');
          this.CurrentLoginedUser.phone = SignupedUser[i].phone;
          this.CurrentLoginedUser.shopName = SignupedUser[i].shopName;

          const preLoginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/');
          this.CurrentLoginedUser.loginDate = preLoginTime;

          this.router.navigateByUrl('tabs');
          this.localStorageService.set('CurrentLoginedUser', this.CurrentLoginedUser);
          const appConfig = this.localStorageService.get('App');
          appConfig.login = true;
          this.localStorageService.set('App', appConfig);
        }
      }
    }
  }
  onForgotPassword() {
    this.router.navigateByUrl('passport/forgot-password');
  }
  onSignup() {
    this.router.navigateByUrl('passport/signup');
  }
}
