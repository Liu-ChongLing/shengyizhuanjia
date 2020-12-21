import { CategoryNameEditPage } from './../category-name-edit/category-name-edit.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController} from '@ionic/angular';
import { Category } from 'src/app/shared/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-edit-page',
  templateUrl: './category-edit-page.page.html',
  styleUrls: ['./category-edit-page.page.scss'],
})
export class CategoryEditPagePage implements OnInit {

  id: any;
  category: Category;
  // tslint:disable-next-line: max-line-length
  constructor( private router: Router, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, private alertCtrl: AlertController)
  {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id;
      this.category = this.categoryService.findCategoryById(this.id);
      });
  }

  ngOnInit() {
  }



  //   /**
  //  * 展示模态框
  //  * @param {string} name
  //  * @returns {Promise<any>}
  //  */
  private async presentModal(name: string) {
    const modal = await this.modalCtrl.create({
      component: CategoryNameEditPage,
      componentProps: {value: name}
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  // /**
  //  * 编辑商品分类名称
  //  * @param {ItemSliding} item
  //  * @returns {Promise<void>}
  //  */
  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const {data} = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
    }
  }
  // /**
  //  * 编辑商品子分类名称
  //  * @param {ItemSliding} item
  //  * @param {Category} subCategory
  //  * @returns {Promise<void>}
  //  */
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const {data} = await this.presentModal(subCategory.name);
    if (data) {
      subCategory.name = data;
    }
  }

  // /**
  //  * 删除商品分类
  //  * @param {ItemSliding} item
  //  * @param {number} subId
  //  * @returns {Promise<void>}
  //  */
  async onDelete(item: IonItemSliding, subId?: number){
    const alert = await this.alertCtrl.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            item.close();
          }
        }, {
          text: '确认',
          handler: () => {
            if (subId != null) { // 删除商品子分类
              item.close();
              this.categoryService.deleteSubCategoryById(this.category, subId);
              this.category = this.categoryService.findCategoryById(this.id);
            } else if (this.category.children.length === 0) { // 删除商品分类
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.router.navigateByUrl('/category-list');
            } else {
              item.close();
            }
            window.location.replace('/category-list');
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 离开页面时保存修改数据
   */
  // ionViewDidLeave() {
  //   if (this.categoryService.modifyCategory(this.category)) {
  //     console.log('保存成功');
  //   } else {
  //     console.log('保存失败');
  //   }
  // }
  onClick(){
    if (this.categoryService.modifyCategory(this.category)) {
      console.log('保存成功');
    } else {
      console.log('保存失败');
    }
    window.location.replace('category-list');
  }
}
