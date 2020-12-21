import { StartAppGuard } from './core/start-app.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'guide', // 原来是home
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    // canActivate: [StartAppGuard]
  },
  {
    path: 'guide',
    loadChildren: () => import('./routes/guide/guide.module').then(m => m.GuidePageModule),
    canActivate: [StartAppGuard]
  },
  {
    path: 'passport',
    loadChildren: () => import('./routes/passport/passport.module').then(m => m.PassportModule)
  },
  {
    path: 'category-list',
    loadChildren: () => import('./routes/category-list/category-list.module').then( m => m.CategoryListPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./routes/product/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'supplier',
    loadChildren: () => import('./routes/product/supplier/supplier.module').then( m => m.SupplierPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
