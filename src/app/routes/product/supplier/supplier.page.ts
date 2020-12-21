// author:Liu-ChongLing
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
    supplyName: '',
    supplyPhone: null
  };
  constructor(private modalController: ModalController, private supplierService: SupplyService) {
    this.supplierService.getAll().then((data) => {
      if (data.success) {
        this.suppliers = data.result;
      } else {
        console.log('error');
      }
    });
  }
  dismiss(supplier?: Supply) {
    this.modalController.dismiss(this.activeSupplier);
  }

  onClick(supplier: Supply) {
    this.activeSupplier = supplier;
    this.dismiss(this.activeSupplier);
  }
  ngOnInit() {
  }

}
