import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { TimetableComponent } from './timetables/buslines/timetable/timetable.component';
import { AddBuslineComponent } from './admin-panel/add-busline/add-busline.component';
import { EditBuslineComponent } from './timetables/buslines/edit-busline/edit-busline.component';
import { ProfileComponent } from './profile-panel/profile/profile.component';
import { EditProfileComponent } from './profile-panel/profile/edit-profile/edit-profile.component';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { ChangePasswordComponent } from './profile-panel/profile/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { TimetablesComponent } from './timetables/timetables.component';

const appRoutes: Routes = [
    { path:'', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'profile', component: ProfilePanelComponent, canActivate: [AuthGuard], 
      children: [
      { path: '', component: ProfileComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'changepassword', component: ChangePasswordComponent }
    ] },

    { path:'admin', component: AdminPanelComponent, canActivate: [AuthGuard], children: [
      { path:'', component: DashboardComponent },
      { path:'register', component: RegisterComponent },
      { path:'addbusline', component: AddBuslineComponent}
    ]},
    
    
    { path: 'timetables', component: TimetablesComponent, children: [
      { path: ':id', component: TimetableComponent },
      { path: 'edit/:id', component: EditBuslineComponent }
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