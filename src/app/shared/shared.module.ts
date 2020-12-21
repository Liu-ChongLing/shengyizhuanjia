import { CopyrightComponent } from './components/copyright/copyright.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { ConfirmDirective } from './directives/confirm.directive';



@NgModule({
  providers: [
    LocalStorageService,
  ],
  declarations: [
    CopyrightComponent,
    ConfirmDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CopyrightComponent,
    ConfirmDirective
  ]
})
export class SharedModule { }
