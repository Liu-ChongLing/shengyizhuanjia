// author:Liu-ChongLing
import { SaleService } from './../../shared/services/sale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  homeButtonsBlock = [
    [
      {href: '/add-product', id: 'add_salse', name: '新增商品', disable: false},
      {href: '/tabs', id: 'add_user', name: '新增会员', disable: false},
      {href: '/tabs', id: 'sales_account', name: '收银记账', disable: false},
      {href: '/tabs', id: 'a_note', name: '支出管理', disable: false}
    ],
    [
      {href: '/category-list', id: 'sales_management', name: '商品管理', disable: false},
      {href: '/tabs', id: 'user_management', name: '会员管理', disable: false},
      {href: '/tabs', id: 'shop_management', name: '查询销售', disable: false},
      {href: '/tabs', id: 'analysis', name: '智能分析', disable: false}
    ],
    [
      {href: '/tabs', id: 'gongying_more', name: '供应商管理', disable: false},
      {href: '/tabs', id: 'guandan_more', name: '挂单', disable: false},
      {href: '/tabs', id: 'image_addsales', name: '高级功能', disable: false},
      {disable: true}
    ]
  ];
  sales: Array<{ title: string, content: string, previous: number, current: number }>;
  constructor(private sale: SaleService) {
    this.sales = [
      { title: '今日：', content: '比昨日', previous: this.sale.getFakerSalesData(), current: this.sale.getFakerSalesData() },
      { title: '七日：', content: '比同期', previous: this.sale.getFakerSalesData(), current: this.sale.getFakerSalesData() },
      { title: '本月：', content: '比同期', previous: this.sale.getFakerSalesData(), current: this.sale.getFakerSalesData() }
    ];
  }

  ngOnInit() {
  }

  minus(current: number, previous: number): number {
    const result = current - previous;
    if (result > 0) {
      return 1;
    } else if (result === 0) {
      return 0;
    } else {
      return -1;
    }
  }
}
