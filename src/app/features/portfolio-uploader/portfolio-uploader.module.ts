import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { PortfolioGridComponent } from './components/portfolio-grid/portfolio-grid.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { portfolioReducer } from './store/portfolio.reducer';
import { PortfolioEffects } from './store/portfolio.effects';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    PortfolioGridComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    SharedModule,
    StoreModule.forFeature('portfolio', portfolioReducer),
    EffectsModule.forFeature([PortfolioEffects]),
    ToastrModule.forRoot()
  ],
  exports: [UploaderComponent]
})
export class PortfolioUploaderModule { }