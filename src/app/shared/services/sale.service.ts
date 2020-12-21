// author:Liu-ChongLing
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor() { }
  // 生成虚假销售数据，这里用随机函数random产生0到1的数字
  getFakerSalesData(): number {
    return Math.random() * (999 - 9999) + 9999; // 这里表示产生999-99999的随机数
  }
}
