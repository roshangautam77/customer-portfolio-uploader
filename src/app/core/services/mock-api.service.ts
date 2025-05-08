import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CustomerPortfolio } from '../models/customer-portfolio.model';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  submitChanges(changes: CustomerPortfolio[]): Observable<{ success: boolean }> {
    return of({ success: Math.random() > 0.2 }).pipe(delay(1000));
  }
}