import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpeditionRoutingModule } from './expedition-routing.module';
import { ExpeditionComponent } from './expedition.component';


@NgModule({
  declarations: [
    ExpeditionComponent
  ],
  imports: [
    CommonModule,
    ExpeditionRoutingModule
  ]
})
export class ExpeditionModule { }
