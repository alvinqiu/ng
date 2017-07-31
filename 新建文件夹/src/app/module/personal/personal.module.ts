import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { PersonalrouterModule } from './personalrouter/personalrouter.module';
import { PersonalComponent } from './personal.component';
import { InfoComponent } from './info/info.component';
import { ResourceComponent } from './resource/resource.component';
import { CollectionComponent } from './collection/collection.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PersonalrouterModule,
    FlexLayoutModule,

  ],
  declarations: [PersonalComponent, InfoComponent, ResourceComponent, CollectionComponent]
})
export class PersonalModule { }
