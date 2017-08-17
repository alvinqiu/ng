import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResourceComponent } from './resource.component';
import { ResourceModuleModule } from './resource-module/resource-module.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    ResourceModuleModule,
    RouterModule
  ],
  declarations: [ResourceComponent, IndexComponent]
})
export class ResourceModule { }
