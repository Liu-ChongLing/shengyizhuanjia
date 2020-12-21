import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { AjaxResult } from '../interface/ajax-result';
import { Supply } from '../supply';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  constructor(private localStorageService: LocalStorageService) { }
  async insert(supply: Supply): Promise<AjaxResult> {
    supply.id = UUID.UUID();
    // tslint:disable-next-line: prefer-const
    let tmp = this.localStorageService.get('Supply', []);
    tmp.push(supply);
    this.localStorageService.set('Supply', tmp);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  async getAll(): Promise<AjaxResult>{
    const tmp = this.localStorageService.get('Supply', []);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
}
