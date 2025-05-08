import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuditLog } from '../models/customer-portfolio.model';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private auditLogs = new BehaviorSubject<AuditLog[]>([]);
  auditLogs$ = this.auditLogs.asObservable();

  addLog(log: AuditLog): void {
    this.auditLogs.next([...this.auditLogs.value, log]);
  }
}