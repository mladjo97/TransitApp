import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { TimetableComponent } from './buslines/timetable/timetable.component';
import { AddBuslineComponent } from './admin-panel/add-busline/add-busline.component';
import { EditBuslineComponent } from './buslines/edit-busline/edit-busline.component';
import { ProfileComponent } from './profile-panel/profile/profile.component';
import { EditProfileComponent } from './profile-panel/profile/edit-profile/edit-profile.component';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { ChangePasswordComponent } from './profile-panel/profile/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { TimetablesComponent } from './timetables/timetables.component';
import { BusRoutesComponent } from './bus-routes/bus-routes.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { StationsComponent } from './admin-panel/stations/stations.component';
import { StationComponent } from './admin-panel/stations/station/station.component';
import { EditStationComponent } from './admin-panel/stations/edit-station/edit-station.component';
import { AddStationComponent } from './admin-panel/stations/add-station/add-station.component';

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

    { path:'admin', component: AdminPanelComponent, canActivate: [AuthGuard, AdminRoleGuard], children: [
      { path:'', component: DashboardComponent },
      { path:'register', component: RegisterComponent },
      { path:'addbusline', component: AddBuslineComponent},
      { path: 'stations/add', component: AddStationComponent },
      { path:'stations/edit/:id', component: EditStationComponent },
      { path:'stations', component: StationsComponent, children: [
        { path:':id', component: StationComponent }
      ] },
    ]},
    
    { path: 'timetables/edit/:id', component: EditBuslineComponent, canActivate: [AuthGuard, AdminRoleGuard] },
    { path: 'timetables', component: TimetablesComponent, children: [
      { path: ':id', component: TimetableComponent }
    ] },

    { path: 'routes/edit/:id', component: EditBuslineComponent, canActivate: [AuthGuard, AdminRoleGuard]},
    { path: 'routes', component: BusRoutesComponent },

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