import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResourceComponent } from './resource.component';
import { ResourceModuleModule } from './resource-module/resource-module.module';
import { IndexComponent } from './index/index.component';
import { UploadModalComponent } from './public/upload-modal/upload-modal.component'
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
} from '@angular/material';
import {
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentFileModule,
} from '@covalent/core';

import { BarRatingModule } from 'ngx-bar-rating';

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
  ],
  entryComponents: [UploadModalComponent],
  declarations: [ResourceComponent, IndexComponent, UploadModalComponent]
})
export class ResourceModule { }
