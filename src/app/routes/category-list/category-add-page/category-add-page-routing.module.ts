import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryAddPagePage } from './category-add-page.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryAddPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryAddPagePageRoutingModule {}
