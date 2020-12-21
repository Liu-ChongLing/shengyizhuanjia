import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupplyService } from 'src/app/shared/services/supply.service';
import { Supply } from 'src/app/shared/supply';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  suppliers: Supply[];
  activeSupplier: Supply = {
    id: null,
    name: '',
    phone: null
  };
  constructor(private modalController: ModalController, private supplierService: SupplyService) {
    this.supplierService.getAll().then((data) => {
      if (data.success) {
        this.suppliers = data.result;
      } else {
        console.log('读取本地供应商数据失败');
      }
    });
  }
  // /**
  //  * 关闭模态窗口，并把分类名称传回给分类编辑页面
  //  * @param {string} name
  //  */
  dismiss(supplier?: Supply) {
    this.modalController.dismiss(this.activeSupplier);
  }

  /**
   * 返回参数
   */
  onSave() {
    this.dismiss(this.activeSupplier);
  }

  // /**
  //  * 选中当前供应商
  //  * @param {Supply} supplier
  //  */
  onClick(supplier: Supply) {
    this.activeSupplier = supplier;
  }
  ngOnInit() {
  }

}
