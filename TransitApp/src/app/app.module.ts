import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AppRouterModule } from './app-router.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './services/register.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    HttpModule 
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
