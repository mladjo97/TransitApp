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
import { RegisterService } from './_services/register.service';
import { NotificationService } from './_services/notification.service';
import { LoginService } from './_services/login.service';
import { AuthService } from './_services/auth.service';
import { BuslinesComponent } from './buslines/buslines.component';
import { TimetableComponent } from './buslines/timetable/timetable.component';
import { BusLineService } from './_services/busline.service';
import { AddBuslineComponent } from './admin-panel/add-busline/add-busline.component';
import { EditBuslineComponent } from './buslines/edit-busline/edit-busline.component';
import { ProfileComponent } from './profile-panel/profile/profile.component';
import { UserService } from './_services/user.service';
import { EditProfileComponent } from './profile-panel/profile/edit-profile/edit-profile.component';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { ChangePasswordComponent } from './profile-panel/profile/change-password/change-password.component';
import { MapComponent } from './map/map.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { TimetablesComponent } from './timetables/timetables.component';
import { BusRoutesComponent } from './bus-routes/bus-routes.component';
import { DrawService } from './_services/draw.service';
import { OpenRouteService } from './_services/open-route.service';
import { StationsComponent } from './admin-panel/stations/stations.component';
import { StationComponent } from './admin-panel/stations/station/station.component';
import { AddStationComponent } from './admin-panel/stations/add-station/add-station.component';
import { EditStationComponent } from './admin-panel/stations/edit-station/edit-station.component';
import { StationsService } from './_services/station.service';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketPlansComponent } from './tickets/ticket-plans/ticket-plans.component';
import { tripleArray } from './_pipes/triple-array.pipe';
import { DocumentImageComponent } from './profile-panel/document-image/document-image.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DocumentImageService } from './_services/document-image.service';
import { InspectorPanelComponent } from './inspector-panel/inspector-panel.component';
import { InspectorSidebarComponent } from './inspector-panel/inspector-sidebar/inspector-sidebar.component';
import { DocumentsComponent } from './inspector-panel/documents/documents.component';
import { DocumentComponent } from './inspector-panel/documents/document/document.component';
import { ProfileSidebarComponent } from './profile-panel/profile-sidebar/profile-sidebar.component';
import { PriceListService } from './_services/pricelist.service';
import { TicketService } from './_services/ticket.service';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { TicketValidationComponent } from './inspector-panel/ticket-validation/ticket-validation.component';


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
    TimetablesComponent,
    BusRoutesComponent,
    StationsComponent,
    StationComponent,
    AddStationComponent,
    EditStationComponent,
    TicketsComponent,
    TicketPlansComponent,
    tripleArray,
    DocumentImageComponent,
    NavbarComponent,
    InspectorPanelComponent,
    InspectorSidebarComponent,
    DocumentsComponent,
    DocumentComponent,
    ProfileSidebarComponent,
    TicketComponent,
    TicketValidationComponent
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
    StationsService,
    UserService,
    NotificationService,
    DrawService,
    OpenRouteService,
    DocumentImageService,
    PriceListService,
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
