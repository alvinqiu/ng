import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
import { ApiService } from '../../service/api.service';
import { UtilService } from '../../service/util.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ResourcesrouterModule } from './resourcesrouter/resourcesrouter.module';
import { ResourcesComponent } from './resources.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { MineComponent } from './mine/mine.component';
import { ReviewComponent } from './review/review.component';
import { UploadmodalComponent } from './public/uploadmodal/uploadmodal.component';


@NgModule({
  imports: [
    CommonModule,
    ResourcesrouterModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
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
  declarations: [PdfViewerComponent, ResourcesComponent, IndexComponent, DetailComponent,
    MineComponent, ReviewComponent, UploadmodalComponent],
  entryComponents: [
    UploadmodalComponent
  ],
  providers:[
    ApiService,
    UtilService

  ]
})
export class ResourcesModule { }
