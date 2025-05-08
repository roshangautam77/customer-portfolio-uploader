import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CustomerPortfolio } from '../../../../core/models/customer-portfolio.model';
import * as PortfolioActions from '../../store/portfolio.actions';
import * as PortfolioSelectors from '../../store/portfolio.selectors';
import { ExcelParserService } from '../../../../core/services/excel-parser.service';

@Component({
  selector: 'app-portfolio-grid',
  templateUrl: './portfolio-grid.component.html',
  styleUrls: ['./portfolio-grid.component.scss'],
  standalone: false
})
export class PortfolioGridComponent implements OnInit {
  portfolios$: Observable<CustomerPortfolio[]>;
  isDarkMode$: Observable<boolean>;
  gridApi!: GridApi;
  gridColumnApi: any
  gridOptions: GridOptions = {
    rowSelection: 'multiple',
    enableRangeSelection: true,
    pivotMode: false,
    columnDefs: [
      { field: 'customerName', sortable: true, filter: true, checkboxSelection: true },
      { field: 'accountNumber', sortable: true, filter: true },
      { field: 'accountType', sortable: true, filter: true },
      { 
        field: 'balance', 
        sortable: true, 
        filter: true,
        valueSetter: (params) => {
          const value = Number(params.newValue);
          if (value < 0) return false;
          params.data.balance = value;
          this.onCellValueChanged(params.data);
          return true;
        }
      },
      { 
        field: 'riskScore', 
        sortable: true, 
        filter: true,
        editable: true,
        valueSetter: (params) => {
          const value = Number(params.newValue);
          if (value < 1 || value > 5) return false;
          params.data.riskScore = value;
          this.onCellValueChanged(params.data);
          return true;
        }
      },
      { 
        field: 'lastReviewDate', 
        sortable: true, 
        filter: true,
        editable: true,
        valueFormatter: params => new Date(params.value).toLocaleDateString()
      }
    ],
    onGridReady: (params) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.loadColumnState();
    },
    onColumnEverythingChanged: () => this.saveColumnState(),
    onCellValueChanged: (params) => this.onCellValueChanged(params.data)
  };

  constructor(
    private store: Store,
    private excelService: ExcelParserService
  ) {
    this.portfolios$ = this.store.select(PortfolioSelectors.selectPortfolios);
    this.isDarkMode$ = this.store.select(PortfolioSelectors.selectIsDarkMode);
  }

  ngOnInit(): void {}

  onCellValueChanged(data: CustomerPortfolio): void {
    this.store.dispatch(PortfolioActions.updatePortfolio({ portfolio: data }));
  }

  undoChanges(row: CustomerPortfolio): void {
    this.store.dispatch(PortfolioActions.undoChanges({ id: row.id }));
  }

  exportToExcel(): void {
    this.portfolios$.subscribe(portfolios => {
      this.excelService.exportToExcel(portfolios);
    });
  }

  saveColumnState(): void {
    if (this.gridApi) {
      const columnState = this.gridColumnApi.getColumnState();
      console.log("Roshan columnState", columnState);
      localStorage.setItem('portfolioGridState', JSON.stringify(columnState));
    }
  }

  loadColumnState(): void {
    const savedState = localStorage.getItem('portfolioGridState');
    if (savedState && this.gridApi) {
      this.gridColumnApi.applyColumnState({ state: JSON.parse(savedState), applyOrder: true });
    }
  }
}