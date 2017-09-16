import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResourceComponent } from './resource.component';
import { ResourceModuleModule } from './resource-module/resource-module.module';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { MineComponent } from './mine/mine.component';
import { ReviewComponent } from './review/review.component';
import { UploadModalComponent } from './public/upload-modal/upload-modal.component';
import { MsgComponent } from './public/msg/msg.component';
import { TreeModule } from 'angular-tree-component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
  MdRadioModule,
  MdSelectModule,
  MdDialogModule,
  MdInputModule,
  MdProgressBarModule,
  MdSidenavModule,
  MdButtonToggleModule,
  MdCardModule,
} from '@angular/material';
import {
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentFileModule,
  CovalentMessageModule,
} from '@covalent/core';

import { BarRatingModule } from 'ngx-bar-rating';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
	CommonModule,
	ResourceModuleModule,
	RouterModule,
	MdToolbarModule,
	MdButtonModule,
	MdIconModule,
	MdListModule,
	MdMenuModule,
	MdRadioModule,
	MdSelectModule,
	MdDialogModule,
	MdInputModule,
	MdProgressBarModule,
	CovalentPagingModule,
	CovalentSearchModule,
	CovalentFileModule,
	BarRatingModule,
	TreeModule,
	FormsModule,
	FlexLayoutModule,
	CovalentMessageModule,
	MdSidenavModule,
	MdButtonToggleModule,
	MdCardModule,
  ],
  entryComponents: [UploadModalComponent, MsgComponent],
  declarations: [
  ResourceComponent, 
  MineComponent, 
  ReviewComponent, 
  IndexComponent, 
  UploadModalComponent, 
  DetailComponent, 
  MsgComponent, SearchComponent]
})
export class ResourceModule { }
