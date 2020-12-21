import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryEditPagePageRoutingModule } from './category-edit-page-routing.module';

import { CategoryEditPagePage } from './category-edit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryEditPagePageRoutingModule
  ],
  declarations: [CategoryEditPagePage]
})
export class CategoryEditPagePageModule {}
