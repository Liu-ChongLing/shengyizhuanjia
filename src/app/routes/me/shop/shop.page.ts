import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  shopData: any;
  constructor(private localStorageService: LocalStorageService) {

  }
  ngOnInit() {
    const clu = this.localStorageService.get('CurrentLoginedUser');
    const su = this.localStorageService.get('SignupedUsers');
    for (const i in su){
      if (su[i].phone === clu.phone){
        this.shopData = su[i];
      }
    }
  }

}
