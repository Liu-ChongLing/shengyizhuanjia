// author:Liu-ChongLing
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Product } from 'src/app/routes/product/product';
import { AjaxResult } from '../interface/ajax-result';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService) { }
  async insert(input: Product): Promise<AjaxResult>  {
    input.id = UUID.UUID(); // 自动生成ID
    const res = this.localStorageService.get('product', []);
    res.push(input);
    this.localStorageService.set('product', res);
    return {
      targetUrl: '',
      result: res,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

}
