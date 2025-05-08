import { createReducer, on } from '@ngrx/store';
import { CustomerPortfolio } from '../../../core/models/customer-portfolio.model';
import * as PortfolioActions from './portfolio.actions';

export interface PortfolioState {
  portfolios: CustomerPortfolio[];
  originalPortfolios: CustomerPortfolio[];
  modifiedIds: Set<string>;
  isDarkMode: boolean;
}

export const initialState: PortfolioState = {
  portfolios: [],
  originalPortfolios: [],
  modifiedIds: new Set(),
  isDarkMode: false
};

export const portfolioReducer = createReducer(
  initialState,
  on(PortfolioActions.uploadPortfolioSuccess, (state, { portfolios }) => ({
    ...state,
    portfolios,
    originalPortfolios: JSON.parse(JSON.stringify(portfolios)),
    modifiedIds: new Set<string>()
  })),
  on(PortfolioActions.updatePortfolio, (state, { portfolio }) => {
    const updatedPortfolios = state.portfolios.map(p =>
      p.id === portfolio.id ? { ...portfolio, isModified: true } : p
    );
    return {
      ...state,
      portfolios: updatedPortfolios,
      modifiedIds: new Set([...state.modifiedIds, portfolio.id])
    };
  }),
  on(PortfolioActions.submitChangesSuccess, (state) => ({
    ...state,
    originalPortfolios: JSON.parse(JSON.stringify(state.portfolios)),
    modifiedIds: new Set<string>()
  })),
  on(PortfolioActions.undoChanges, (state, { id }) => {
    const original = state.originalPortfolios.find(p => p.id === id);
    if (!original) return state;
    
    const updatedPortfolios = state.portfolios.map(p =>
      p.id === id ? { ...original } : p
    );
    const modifiedIds = new Set(state.modifiedIds);
    modifiedIds.delete(id);
    
    return {
      ...state,
      portfolios: updatedPortfolios,
      modifiedIds
    };
  }),
  on(PortfolioActions.toggleDarkMode, (state) => ({
    ...state,
    isDarkMode: !state.isDarkMode
  }))
);