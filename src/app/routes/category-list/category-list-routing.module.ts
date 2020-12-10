import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListPage } from './category-list.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryListPage
  },
  {
    path: 'add',
    loadChildren: () => import('./category-add-page/category-add-page.module').then( m => m.CategoryADDPagePageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./category-edit-page/category-edit-page.module').then( m => m.CategoryEditPagePageModule)
  },
  {
    path: 'category-name-edit/',
    loadChildren: () => import('./category-name-edit/category-name-edit.module').then( m => m.CategoryNameEditPageModule)
  },
  // {
  //   path: 'category-add-page',
  //   loadChildren: () => import('./category-add-page/category-add-page.module').then( m => m.CategoryAddPagePageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryListPageRoutingModule {}
