import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  // MdCardModule,
  // MdChipsModule,
  // MdToolbarModule,
  // MdButtonModule,
  // MdRadioModule,
  // MdInputModule,
  // MdIconModule,
  // MdListModule,
  MdDialogModule,
  // MdSelectModule,
  // MdMenuModule,
  // MdProgressBarModule,
  // MdGridListModule,
  // MdTabsModule,
} from '@angular/material';
import { BarRatingModule } from 'ngx-bar-rating';
import {
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentFileModule,
  CovalentMessageModule ,
} from '@covalent/core';
import { ApiService } from '../../service/api.service';
import { UtilService } from '../../service/util.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ResourcesrouterModule } from './resourcesrouter/resourcesrouter.module';
import { ResourcesComponent } from './resources.component';
import { IndexComponent } from './index/index.component';
import { UploadmodalComponent } from './public/uploadmodal/uploadmodal.component';
import { MsgComponent } from './public/msg/msg.component';


@NgModule({
  imports: [
    CommonModule,
    ResourcesrouterModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    // MdCardModule,
    // MdRadioModule,
    // MdToolbarModule,
    // MdButtonModule,
    // MdProgressBarModule,
    // MdInputModule,
    // MdIconModule,
    // MdListModule,
    MdDialogModule,
    // MdSelectModule,
    // MdMenuModule,
    BarRatingModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentFileModule,
    CovalentMessageModule,
  ],
  declarations: [
  PdfViewerComponent, 
  ResourcesComponent, 
  IndexComponent, 
  UploadmodalComponent, 
  MsgComponent],
  entryComponents: [
    UploadmodalComponent,
    MsgComponent
  ],
  providers:[
    ApiService,
    UtilService

  ]
})
export class ResourcesModule { }
