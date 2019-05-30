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
import { AuthGuard } from './_guards/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { TimetablesComponent } from './timetables/timetables.component';
import { BusRoutesComponent } from './bus-routes/bus-routes.component';
import { AdminRoleGuard } from './_guards/admin-role.guard';
import { StationsComponent } from './admin-panel/stations/stations.component';
import { StationComponent } from './admin-panel/stations/station/station.component';
import { EditStationComponent } from './admin-panel/stations/edit-station/edit-station.component';
import { AddStationComponent } from './admin-panel/stations/add-station/add-station.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SingleUseTicketComponent } from './tickets/ticket-plans/single-use-ticket/single-use-ticket.component';
import { DailyTicketComponent } from './tickets/ticket-plans/daily-ticket/daily-ticket.component';
import { MonthlyTicketComponent } from './tickets/ticket-plans/monthly-ticket/monthly-ticket.component';
import { AnnualTicketComponent } from './tickets/ticket-plans/annual-ticket/annual-ticket.component';
import { DocumentImageComponent } from './profile-panel/document-image/document-image.component';
import { InspectorRoleGuard } from './_guards/inspector-role.guard';
import { UserRoleGuard } from './_guards/user-role.guard';

const appRoutes: Routes = [

    { path:'', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'profile', component: ProfilePanelComponent, canActivate: [AuthGuard], 
      children: [
      { path: '', component: ProfileComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'document', component: DocumentImageComponent, canActivate: [UserRoleGuard] }
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

    { path: 'tickets', component: TicketsComponent, children: [
      { path: 'single', component: SingleUseTicketComponent },
      { path: 'daily', component: DailyTicketComponent },
      { path: 'monthly', component: MonthlyTicketComponent },
      { path: 'annual', component: AnnualTicketComponent }
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