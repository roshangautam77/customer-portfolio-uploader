import { createAction, props } from '@ngrx/store';
import { CustomerPortfolio, AuditLog } from '../../../core/models/customer-portfolio.model';

export const uploadPortfolio = createAction(
  '[Portfolio] Upload Portfolio',
  props<{ file: File }>()
);

export const uploadPortfolioSuccess = createAction(
  '[Portfolio] Upload Portfolio Success',
  props<{ portfolios: CustomerPortfolio[], auditLog: AuditLog }>()
);

export const updatePortfolio = createAction(
  '[Portfolio] Update Portfolio',
  props<{ portfolio: CustomerPortfolio }>()
);

export const submitChanges = createAction(
  '[Portfolio] Submit Changes'
);

export const submitChangesSuccess = createAction(
  '[Portfolio] Submit Changes Success',
  props<{ auditLog: AuditLog }>()
);

export const submitChangesFailure = createAction(
  '[Portfolio] Submit Changes Failure',
  props<{ error: string }>()
);

export const undoChanges = createAction(
  '[Portfolio] Undo Changes',
  props<{ id: string }>()
);

export const toggleDarkMode = createAction(
  '[Portfolio] Toggle Dark Mode'
);