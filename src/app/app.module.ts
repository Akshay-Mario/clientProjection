import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { DashboardComponent } from './homecomponent/dashboard/dashboard.component';
import { ApiProjectionComponent } from './homecomponent/api-projection/api-projection.component';
import { ClientProjectionComponent } from './homecomponent/client-projection/client-projection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditDeletebuttonComponent } from './homecomponent/api-projection/edit-deletebutton/edit-deletebutton.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditDeleteclientComponent } from './homecomponent/client-projection/edit-deleteclient/edit-deleteclient.component';

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    DashboardComponent,
    ApiProjectionComponent,
    ClientProjectionComponent,
    EditDeletebuttonComponent,
    EditDeleteclientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AgGridAngular,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
