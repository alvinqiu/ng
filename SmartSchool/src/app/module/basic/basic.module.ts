import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSidenavModule,
  MdInputModule,
  MdIconModule,
  MdListModule,
  MdDialogModule,
  MdSelectModule,
  MdMenuModule,
} from '@angular/material';
import { 
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule, 
} from '@covalent/core';

import { ApiService } from '../../service/api.service';
import { UtilService }  from '../../service/util.service';
import { BasicrouterModule } from './basicrouter/basicrouter.module';
import { BasicComponent } from './basic.component';
import { SchoolsComponent } from './schools/schools.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { GradesComponent } from './grades/grades.component';
import { ClassesComponent } from './classes/classes.component';
import { SchoolsmodalComponent } from './public/schoolsmodal/schoolsmodal.component';
import { StaffComponent } from './staff/staff.component';
import { DepartmentComponent } from './department/department.component';



@NgModule({
  imports: [
    CommonModule,
    BasicrouterModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    MdSidenavModule,
    MdButtonModule,
    MdInputModule,
    MdToolbarModule,
    MdIconModule,
    MdDialogModule,
    MdSelectModule,
    MdMenuModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentSearchModule,
  ],
  declarations: [BasicComponent, SchoolsComponent, SubjectsComponent, GradesComponent, ClassesComponent, SchoolsmodalComponent, StaffComponent, DepartmentComponent],
  entryComponents: [
    SchoolsmodalComponent
  ],
  providers:[
    ApiService,
    UtilService

  ]
})
export class BasicModule { }
