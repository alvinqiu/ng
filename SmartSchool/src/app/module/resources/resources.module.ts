import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {
  MdCardModule,
  MdChipsModule,
  MdSliderModule,
  MdToolbarModule,
  MdButtonModule,
  MdSidenavModule,
  MdInputModule,
  MdIconModule,
  MdListModule,
  MdDialogModule,
  MdSelectModule,
  MdMenuModule,
  MdGridListModule,
  MdTabsModule,
} from '@angular/material';
import {
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentExpansionPanelModule,
  CovalentFileModule,
} from '@covalent/core';
import { ApiService } from '../../service/api.service';
import { UtilService }  from '../../service/util.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ResourcesrouterModule } from './resourcesrouter/resourcesrouter.module';
import { ResourcesComponent } from './resources.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { AssetsComponent } from './assets/assets.component';
import { MineComponent } from './mine/mine.component';
import { ReviewComponent } from './review/review.component';
import { UploadmodalComponent } from './public/uploadmodal/uploadmodal.component';
import { AssetsAddModalComponent } from './public/assets-add-modal/assets-add-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ResourcesrouterModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    MdCardModule,
    MdChipsModule,
    MdSliderModule,
    MdToolbarModule,
    MdButtonModule,
    MdSidenavModule,
    MdInputModule,
    MdIconModule,
    MdListModule,
    MdDialogModule,
    MdSelectModule,
    MdMenuModule,
    MdGridListModule,
    MdTabsModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
  ],
  declarations: [PdfViewerComponent,ResourcesComponent, IndexComponent, DetailComponent, AssetsComponent, MineComponent, ReviewComponent, UploadmodalComponent, AssetsAddModalComponent],
  entryComponents: [
    UploadmodalComponent,
    AssetsAddModalComponent,
  ],
  providers:[
    ApiService,
    UtilService

  ]
})
export class ResourcesModule { }
