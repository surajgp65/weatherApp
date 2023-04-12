import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/common-modules/shared.module';
import { DaysAgoPipe } from 'src/app/common-pipes/days-ago.pipe';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  providers: [DaysAgoPipe],
})
export class DashboardModule {}
