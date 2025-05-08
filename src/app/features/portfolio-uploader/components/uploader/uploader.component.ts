import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PortfolioActions from '../../store/portfolio.actions';
import * as PortfolioSelectors from '../../store/portfolio.selectors';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  standalone: false
})
export class UploaderComponent {
  modifiedCount$: Observable<number>;
  totalRecords$: Observable<number>;
  isDarkMode$: Observable<boolean>;

  constructor(private store: Store) {
    this.modifiedCount$ = this.store.select(PortfolioSelectors.selectModifiedCount);
    this.totalRecords$ = this.store.select(PortfolioSelectors.selectTotalRecords);
    this.isDarkMode$ = this.store.select(PortfolioSelectors.selectIsDarkMode);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.store.dispatch(PortfolioActions.uploadPortfolio({ file: input.files[0] }));
    }
  }

  submitChanges(): void {
    this.store.dispatch(PortfolioActions.submitChanges());
  }

  toggleDarkMode(): void {
    this.store.dispatch(PortfolioActions.toggleDarkMode());
  }
}