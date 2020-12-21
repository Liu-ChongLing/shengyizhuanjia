// author:Liu-ChongLing
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Category } from '../../shared/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  categories = new Array<Category>(); // activeCategory: Category
  activeCategory = new Category();
  categoriesLength = 0;
  activeSubCategory: Category;

  // tslint:disable-next-line: max-line-length
  constructor(private categoryService: CategoryService, private actionSheetCtrl: ActionSheetController, private router: Router, private localStorageService: LocalStorageService) {
    categoryService.getAll().then((data) => {
      this.categories = data.result;
      if (this.categories) {
        this.activeCategory = this.categories[0];
        this.categoriesLength = this.activeCategory.children.length;
        // this.localStorageService.set('Category', this.categories);
      }
    });
  }
  ngOnInit() {
  }
  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.router.navigate(['/category-list/add'], { queryParams: { add_category_title: this.activeCategory.name } });
          }
        }, {
          text: '编辑分类',
          handler: () => {
            console.log('Archive clicked');
            this.router.navigate(['/category-list/edit'], { queryParams: { id: this.activeCategory.id} });
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }

  onSelectCategory(category: Category) {
    this.activeCategory = category;
    this.categoriesLength = this.activeCategory.children.length;
  }
  gotoAddSubCategory() {

  }

  onSelectSubCategory() {

  }
  onSelect(category: Category) {
    console.log(category.name);
    this.router.navigateByUrl('add-product');
    this.localStorageService.set('CategoryName', category.name);
  }

}
