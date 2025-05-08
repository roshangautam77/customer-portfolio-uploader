import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditPanelComponent } from './components/audit-panel/audit-panel.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AuditPanelComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    AuditPanelComponent,
    DateFormatPipe
  ]
})
export class SharedModule { }