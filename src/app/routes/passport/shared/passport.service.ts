import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private localStorageService: LocalStorageService) { }
  checkPhoneNumber(phoneNumber: string): boolean {
    const account = this.localStorageService.get('signupedUser', '');
    let item: any;
    if (account == null){
      return true;
    }
    for (item in account) {
      if (phoneNumber === account[item].phone)
       { return false; }
    }
    return true;
  }

  // // async signup(shopName: string, phone: string, password: string, email: string): Promise<AjaxResult> {
  // //   return
  // // }
  // async login(accoutName: string, password: string): Promise<AjaxResult> {
  //   if (accoutName === '123456' && password === '123456') {
  //     return new AjaxResult(true);
  //   } else {
  //     return new AjaxResult(false, null, { message: '登陆失败', detail: '' });
  //   }
  // }
}
