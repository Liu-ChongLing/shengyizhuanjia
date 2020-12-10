import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryEditPagePage } from './category-edit-page.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryEditPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryEditPagePageRoutingModule {}
