import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { NgModule } from '@angular/core';
import { PassportRoutingModule } from './passport-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SignupPage,
    LoginPage,
    ForgotPasswordPage
  ],
  imports: [
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
