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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './services/register.service';
import { NotificationService } from './services/notification.service';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { BuslinesComponent } from './timetables/buslines/buslines.component';
import { TimetableComponent } from './timetables/buslines/timetable/timetable.component';
import { BusLineService } from './services/busline.service';
import { AddBuslineComponent } from './admin-panel/add-busline/add-busline.component';
import { EditBuslineComponent } from './timetables/buslines/edit-busline/edit-busline.component';
import { ProfileComponent } from './profile-panel/profile/profile.component';
import { UserService } from './services/user.service';
import { EditProfileComponent } from './profile-panel/profile/edit-profile/edit-profile.component';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { ChangePasswordComponent } from './profile-panel/profile/change-password/change-password.component';
import { MapComponent } from './map/map.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { TimetablesComponent } from './timetables/timetables.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    HomeComponent,
    BuslinesComponent,
    TimetableComponent,
    AddBuslineComponent,
    EditBuslineComponent,
    ProfileComponent,
    EditProfileComponent,
    ProfilePanelComponent,
    ChangePasswordComponent,
    MapComponent,
    AdminPanelComponent,
    DashboardComponent,
    TimetablesComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SnackbarModule.forRoot()
  ],
  providers: [
    RegisterService, 
    LoginService,
    AuthService,
    BusLineService,
    UserService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
