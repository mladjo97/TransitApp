import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BuslinesComponent } from './buslines/buslines.component';
import { BuslineComponent } from './buslines/busline/busline.component';
import { AddBuslineComponent } from './buslines/add-busline/add-busline.component';
import { EditBuslineComponent } from './buslines/edit-busline/edit-busline.component';
import { ProfileComponent } from './profile-panel/profile/profile.component';
import { EditProfileComponent } from './profile-panel/profile/edit-profile/edit-profile.component';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { ChangePasswordComponent } from './profile-panel/profile/change-password/change-password.component';

const appRoutes: Routes = [
    { path:'', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfilePanelComponent, children: [
      { path: 'info', component: ProfileComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'changepassword', component: ChangePasswordComponent }
    ] },
    { path: 'buslines/add', component: AddBuslineComponent },  
    { path: 'buslines/edit/:id', component: EditBuslineComponent }, 
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