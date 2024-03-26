import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiProjectionComponent } from './homecomponent/api-projection/api-projection.component';
import { ClientProjectionComponent } from './homecomponent/client-projection/client-projection.component';
import { DashboardComponent } from './homecomponent/dashboard/dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "/home/dashboard", pathMatch: "full" },
  {
    path: "home",
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'api-projection', component: ApiProjectionComponent },
      { path: 'client-projection', component: ClientProjectionComponent },
    ]
  },
  { path: '**', redirectTo: '/home/dashboard', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
