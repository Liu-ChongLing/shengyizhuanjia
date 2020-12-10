import { Router } from '@angular/router';
import { SettingService } from './setting.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private localStorageService: LocalStorageService, private settingService: SettingService, private router: Router) { }

  ngOnInit() {
  }
  get user(){
    return this.settingService.user;
  }
  onLogout(){
    const appConfig = this.localStorageService.get('App');
    appConfig.login = false;
    this.localStorageService.set('App', appConfig);
    this.localStorageService.remove('CurrentLoginedUser');
    window.location.replace('/passport/login');
  }
  toChangePassword()
  {
    this.router.navigateByUrl('tabs/me/change-password');
  }
  toShop()
  {
    this.router.navigateByUrl('tabs/me/shop');
  }
}
