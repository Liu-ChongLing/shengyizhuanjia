// author:Liu-ChongLing
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category } from 'src/app/shared/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-addpage',
  templateUrl: './category-add-page.page.html',
  styleUrls: ['./category-add-page.page.scss'],
})
export class CategoryAddPagePage implements OnInit {

  headTitle: any;
  // tslint:disable-next-line: variable-name
  add_category_title: any;
  category: Category;
  name1: string;
  constructor(private activatedRouter: ActivatedRoute, private categoryService: CategoryService,
              private toastCtrl: ToastController, private router: Router, ) {
    this.activatedRouter.queryParams.subscribe(queryParams => {
      this.add_category_title = queryParams.add_category_title;
      if (this.add_category_title !== '大分类') {
        this.headTitle = '新增小分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 0,
            name: '',
            children: []
          }]
        };
      } else {
        this.headTitle = '新增商品分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 0,
            name: '',
            children: []
          }]
        };
      }
    });
  }
  addSubCategory() {
    this.category.children.push({
    id: 0,
    name: '',
    children: []
  });
}


async onSave() {
  if (this.add_category_title === '大分类') { // 增加商品分类
    this.category.name = this.name1;
    if (this.categoryService.insert(this.category) === true) {
      const toast = await this.toastCtrl.create({
        message: '新增成功',
        duration: 3000
      });
      window.location.replace('category-list');
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: '小分类已存在',
        duration: 3000
      });
      toast.present();
    }

  } else { // 增加商品小分类
    this.category.name = this.add_category_title;
    if (this.categoryService.insertSubCateCategory(this.category) === true) {
      const toast = await this.toastCtrl.create({
        message: '新增成功',
        duration: 3000
      });
      window.location.replace('category-list');
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: '小分类已存在',
        duration: 3000
      });
      toast.present();
    }
  }
}
  ngOnInit() {
  }

}
