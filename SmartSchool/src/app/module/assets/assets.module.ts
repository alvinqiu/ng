import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AssetsrouterModule } from './assetsrouter/assetsrouter.module';
import { AssetsComponent } from './assets.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AssetsrouterModule,
    FlexLayoutModule,
  ],
  declarations: [AssetsComponent, IndexComponent]
})
export class AssetsModule { }
