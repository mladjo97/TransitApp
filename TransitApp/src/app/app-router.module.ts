import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { BuslinesComponent } from './buslines/buslines.component';
import { BuslineComponent } from './buslines/busline/busline.component';

const appRoutes: Routes = [
    { path:'', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },   
    { path: 'buslines', component: BuslinesComponent, children: [
      { path: ':id', component: BuslineComponent }
    ] },
    { path: '**', component: NotFoundComponent }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRouterModule { }