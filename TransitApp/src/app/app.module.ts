import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SnackbarModule } from 'ngx-snackbar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AppRouterModule } from './app-router.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './services/register.service';
import { NotificationService } from './services/notification.service';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { BuslinesComponent } from './buslines/buslines.component';
import { BuslineComponent } from './buslines/busline/busline.component';
import { BusLineService } from './services/busline.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    HomeComponent,
    BuslinesComponent,
    BuslineComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    HttpModule,
    SnackbarModule.forRoot()
  ],
  providers: [
    RegisterService, 
    LoginService,
    AuthService,
    BusLineService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
