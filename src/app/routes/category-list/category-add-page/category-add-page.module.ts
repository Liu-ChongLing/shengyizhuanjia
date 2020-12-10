import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryAddPagePageRoutingModule } from './category-add-page-routing.module';

import { CategoryAddPagePage } from './category-add-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryAddPagePageRoutingModule
  ],
  declarations: [CategoryAddPagePage]
})
export class CategoryADDPagePageModule {}
