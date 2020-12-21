// author:Liu-ChongLing
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {
  title: string;
  property: string;
  value: any; // 用于ngModel，从shop对象的相关属性中获取数据
  constructor(private toastCtrl: ToastController, activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.property = queryParams.property;
      this.title = queryParams.title;
    });
  }

  ngOnInit() {
  }
  async onSave(){
    let i: any;
    const clu = this.localStorageService.get('CurrentLoginedUser');
    const su = this.localStorageService.get('SignupedUsers');
    if (this.property === 'shopName')
    {
      for (i in su){
        if (su[i].phone === clu.phone){
          su[i].shopName = this.value;
        }
      }
    }
    if (this.property === 'anotherName')
    {
      for (i in su){
        if (su[i].phone === clu.phone){
          su[i].anotherName = this.value;
        }
      }
    }
    if (this.property === 'shopKeeperName')
    {
      for (i in su){
        if (su[i].phone === clu.phone){
          su[i].shopKeeperName = this.value;
        }
      }
    }
    if (this.property === 'shopTel')
    {
      for (i in su){
        if (su[i].phone === clu.phone){
          su[i].shopTel = this.value;
        }
      }
    }
    this.localStorageService.set('SignupedUsers', su);
    this.value = '';
    const toast = await this.toastCtrl.create({
      message: '店铺信息修改成功',
      duration: 3000
    });
    toast.present();
    window.location.replace('tabs/me/shop');
  }
}
