import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PassportService } from '../../passport/shared/passport.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  reset = {
    oldPassword: '',
    password: '',
    comfirmPassword: ''
  };
  // newC = {
  //   identifier: '',
  //   passwordToken: '',
  //   shopName: '',
  //   phone: ''
  // };
  // newS = {};
  // tslint:disable-next-line: max-line-length
  constructor(private passportService: PassportService, private router: Router, private localStorageService: LocalStorageService) { }


  ngOnInit() {
  }
  onReset() {
    const newC = this.localStorageService.get('CurrentLoginedUser');
    if (newC.passwordToken === this.reset.oldPassword) {
      newC.passwordToken = this.reset.password;
      this.localStorageService.set('CurrentLoginedUser', newC);
      const newS = this.localStorageService.get('SignupedUsers');
      for (const i in newS){
        // tslint:disable-next-line: triple-equals
        if (newS[i].phone == newC.identifier){
          newS[i].password = newC.passwordToken;
          this.localStorageService.set('SignupedUsers', newS);
        }
      }
      console.log('修改成功');
    }
    else {
      console.log('原密码错误');
    }
  }
}
