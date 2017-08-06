import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AssetsrouterModule } from './assetsrouter/assetsrouter.module';
import { AssetsComponent } from './assets.component';
import { IndexComponent } from './index/index.component';
import {
  MdCardModule,
  MdChipsModule,
  MdRadioModule,
  MdToolbarModule,
  MdButtonModule,
  // MdSidenavModule,
  MdInputModule,
  MdIconModule,
  MdListModule,
  MdDialogModule,
  MdSelectModule,
  MdMenuModule,
  // MdGridListModule,
  // MdTabsModule,
} from '@angular/material';
import { BarRatingModule } from 'ngx-bar-rating';
import {
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentExpansionPanelModule,
  CovalentFileModule,
} from '@covalent/core';
import { AssetsAddModalComponent } from './public/assets-add-modal/assets-add-modal.component';
import { QrCodeModalComponent } from './public/qr-code-modal/qr-code-modal.component';
import { InOutStockModalComponent } from './public/in-out-stock-modal/in-out-stock-modal.component';
import { AssetsTypeModalComponent } from './public/assets-type-modal/assets-type-modal.component';
import { SupplierModalComponent } from './public/supplier-modal/supplier-modal.component';
import { CodeComponent } from '../assets/code/code.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AssetsrouterModule,
    FlexLayoutModule,
    MdCardModule,
    MdRadioModule,
    // MdSliderModule,
    MdToolbarModule,
    MdButtonModule,
    // MdSidenavModule,
    MdInputModule,
    MdIconModule,
    MdListModule,
    MdDialogModule,
    MdSelectModule,
    MdMenuModule,
    // MdGridListModule,
    // MdTabsModule,
    BarRatingModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
  ],
  declarations: [AssetsComponent, IndexComponent, AssetsAddModalComponent, QrCodeModalComponent,
    InOutStockModalComponent, AssetsTypeModalComponent, SupplierModalComponent, CodeComponent],
  entryComponents: [
    AssetsAddModalComponent,
    QrCodeModalComponent,
    InOutStockModalComponent,
    AssetsTypeModalComponent,
    SupplierModalComponent
  ]
})
export class AssetsModule { }
