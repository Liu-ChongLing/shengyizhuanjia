// author:Liu-ChongLing
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { Supply } from 'src/app/shared/supply';
import { Product } from '../product';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { SupplyService } from 'src/app/shared/services/supply.service';
import { SupplierPage } from '../supplier/supplier.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit, OnDestroy {
  subscription: Subscription;
  product: Product;
  categoryName: '';

  constructor(private actionSheetCtrl: ActionSheetController, private productService: ProductService,
              private alertCtrl: AlertController,
              private supplierService: SupplyService, private modalCtrl: ModalController,
              private zone: NgZone, private barcodeScanner: BarcodeScanner, private imagePicker: ImagePicker, private camera: Camera,
              private router: Router, private localStorageService: LocalStorageService) {
    this.product = this.initProduct();
    this.product.supplier = new Supply();
    this.product.supplier.supplyName = '请输入供应商';
  }

  ngOnInit() { }

  ngOnDestroy() {
  }
  ionViewWillLeave(){
    this.localStorageService.remove('CategoryName');
    console.log('leave');
  }

  ionViewWillEnter(){
    if (this.localStorageService.get('CategoryName') === null)
    {
      this.product.categoryName = '请选择分类';
    }
    else
    {
      this.product.categoryName = this.localStorageService.get('CategoryName');
    }
    console.log('enter');
  }
  async onPresentActiveSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('进入相机');
            this.onCamera();
          }
        }, {
            text: '相册',
              handler: () => {
              console.log('进入相册');
              this.onImagePicker();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success)
      {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct)
        {
          this.product = this.initProduct();
          this.localStorageService.remove('CategoryName');
          this.product.categoryName = '请选择分类';
          this.product.supplier = new Supply();
          this.product.supplier.supplyName = '请输入供应商';
        }
        else
        {
          this.router.navigateByUrl('category-list');
        }
      }
      else
      {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }


  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: '新增供货商',
      mode: 'ios',
      inputs: [
        {
          name: 'supplyName',
          type: 'text',
          placeholder: '输入名称'
        },
        {
          name: 'supplyPhone',
          type: 'number',
          placeholder: '输入电话'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '保存',
          handler: (data) => {
            this.zone.run(() => {
              const supplier = new Supply();
              supplier.supplyName = data.supplyName;
              supplier.supplyPhone = data.supplyPhone;
              this.supplierService.insert(supplier).then((res) => {
                  if (res.success) {
                    console.log('保存成功');
                    this.product.supplier = supplier;
                  } else {
                    console.log('保存失败');
                  }
              });
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  private async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SupplierPage,
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  async onClickSupplier() {
    let suppliers: Supply[];
    this.supplierService.getAll().then(async (data) => {
      suppliers = data.result;
      if (suppliers.length <= 0) {
        this.presentAlertPrompt();
      } else {
        // tslint:disable-next-line: no-shadowed-variable
        const {data} = await this.presentModal();
        if (data) {
          this.product.supplier = data;
        }
      }
    });
  }

  onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.product.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }


  onCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
    });
  }


  onImagePicker() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 4,
      quality: 100
    };
    this.imagePicker.getPictures(options).then((results) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.product.images.push(results[i]);
      }
    }, (err) => { });
  }


  goCategyList() {
    this.router.navigateByUrl('category-list');
  }


  initProduct(): Product {
    return {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '',
      images: [],
      price: null,
      purchasePrice: null,
      inventory: null,
      supplier: null,
      standard: '',
      remark: ''
    };
  }
}

