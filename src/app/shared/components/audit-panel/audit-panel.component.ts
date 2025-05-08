import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditService } from '../../../core/services/audit.service';
import { AuditLog } from '../../../core/models/customer-portfolio.model';

@Component({
  selector: 'app-audit-panel',
  templateUrl: './audit-panel.component.html',
  styleUrls: ['./audit-panel.component.scss'],
  standalone: false
})
export class AuditPanelComponent {
  auditLogs$: Observable<AuditLog[]>;

  constructor(auditService: AuditService) {
    this.auditLogs$ = auditService.auditLogs$;
  }
}