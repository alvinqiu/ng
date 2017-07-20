import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {
  MdToolbarModule,
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdIconModule,
  MdListModule,
  MdInputModule,
  MdSliderModule,
} from '@angular/material';
import { 
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule, 
  CovalentExpansionPanelModule,
  CovalentFileModule,
} from '@covalent/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ResourcesrouterModule } from './resourcesrouter/resourcesrouter.module';
import { ResourcesComponent } from './resources.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { UploadComponent } from './upload/upload.component';
import { AssetsComponent } from './assets/assets.component';

@NgModule({
  imports: [
    CommonModule,
    ResourcesrouterModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdChipsModule,
    MdIconModule,
    MdListModule,
    MdInputModule,
    MdSliderModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
  ],
  declarations: [PdfViewerComponent,ResourcesComponent, IndexComponent, DetailComponent, UploadComponent, AssetsComponent]
})
export class ResourcesModule { }
