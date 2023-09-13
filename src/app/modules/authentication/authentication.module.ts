import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LoginModule } from './components/login';
import { LoginRoutingModule } from './components/login/login-routing.module';
import { RegisterModule } from './components/register';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,LoginModule,RegisterModule
  ]
})
export class AuthenticationModule { }
