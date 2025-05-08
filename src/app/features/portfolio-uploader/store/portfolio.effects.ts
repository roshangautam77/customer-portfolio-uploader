import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as PortfolioActions from './portfolio.actions';
import { ExcelParserService } from '../../../core/services/excel-parser.service';
import { MockApiService } from '../../../core/services/mock-api.service';
import { AuditService } from '../../../core/services/audit.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PortfolioEffects {
  constructor(
    private actions$: Actions,
    private excelParser: ExcelParserService,
    private mockApi: MockApiService,
    private auditService: AuditService,
    private toastr: ToastrService
  ) {}

  uploadPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.uploadPortfolio),
      switchMap(({ file }) => {
        const startTime = performance.now();
        return from(this.excelParser.parseExcel(file)).pipe(
          map(portfolios => {
            const parseTime = performance.now() - startTime;
            return PortfolioActions.uploadPortfolioSuccess({
              portfolios,
              auditLog: { uploadTime: startTime, parseTime }
            });
          })
        );
      })
    )
  );

  submitChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.submitChanges),
      switchMap(() => {
        const startTime = performance.now();
        return this.mockApi.submitChanges([]).pipe(
          map(() => {
            const submissionTime = performance.now() - startTime;
            return PortfolioActions.submitChangesSuccess({
              auditLog: { uploadTime: 0, parseTime: 0, submissionTime }
            });
          }),
          catchError(error =>
            of(PortfolioActions.submitChangesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  submitChangesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PortfolioActions.submitChangesSuccess),
        tap(() => this.toastr.success('Changes submitted successfully'))
      ),
    { dispatch: false }
  );

  submitChangesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PortfolioActions.submitChangesFailure),
        tap(({ error }) => this.toastr.error(`Submission failed: ${error}`))
      ),
    { dispatch: false }
  );
}