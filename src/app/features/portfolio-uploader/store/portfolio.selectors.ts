import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.reducer';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectPortfolios = createSelector(
  selectPortfolioState,
  (state) => state.portfolios
);

export const selectModifiedCount = createSelector(
  selectPortfolioState,
  (state) => state.modifiedIds.size
);

export const selectTotalRecords = createSelector(
  selectPortfolioState,
  (state) => state.portfolios.length
);

export const selectIsDarkMode = createSelector(
  selectPortfolioState,
  (state) => state.isDarkMode
);