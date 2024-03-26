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

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    DashboardComponent,
    ApiProjectionComponent,
    ClientProjectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AgGridAngular,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
