// author:Liu-ChongLing
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  userInfomation = {
    shopName : '',
    phone : ''
  };
  public appPages = [
    { title: '开店论坛', url: '/tabs', icon: 'chatbox' },
    { title: '手机橱窗', url: '/tabs', icon: 'create' },
    { title: '邀请有礼', url: '/tabs', icon: 'git-merge' },
    { title: '资金账户', url: '/tabs', icon: 'cash' },
    { title: '反馈建议', url: '/tabs', icon: 'pizza' },
    { title: '帮助中心', url: '/tabs', icon: 'help-circle' },
   ];
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const CurrentLoginedUser = this.localStorageService.get('CurrentLoginedUser');
    this.userInfomation.shopName = CurrentLoginedUser.shopName;
    this.userInfomation.phone = CurrentLoginedUser.phone;
  }
  toSetting(){
    this.router.navigateByUrl('tabs/me/setting');
  }
}
