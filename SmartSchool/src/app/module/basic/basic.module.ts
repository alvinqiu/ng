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
  MdGridListModule,
  MdTabsModule,
  MdDatepickerModule,
  MdNativeDateModule,
} from '@angular/material';
import { 
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentSearchModule, 
  CovalentExpansionPanelModule,
  CovalentMessageModule,
} from '@covalent/core';
import { TreeModule } from 'angular-tree-component';
import { ImageUploadModule } from "angular2-image-upload";

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
import { ClassesmodalComponent } from './public/classesmodal/classesmodal.component';
import { GradesmodalComponent } from './public/gradesmodal/gradesmodal.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { OfficesComponent } from './offices/offices.component';
import { BuildingsmodalComponent } from './public/buildingsmodal/buildingsmodal.component';
import { OfficesmodalComponent } from './public/officesmodal/officesmodal.component';
import { SubjectsmodalComponent } from './public/subjectsmodal/subjectsmodal.component';
import { DepartmentmodalComponent } from './public/departmentmodal/departmentmodal.component';
import { StaffsmodalComponent } from './public/staffsmodal/staffsmodal.component';
import { StaffsattributemodalComponent } from './public/staffsattributemodal/staffsattributemodal.component';
import { PersonalComponent } from './personal/personal.component';
import { StaffpropertyComponent } from './staff/staffproperty/staffproperty.component';
import { StaffunaccountComponent } from './staff/staffunaccount/staffunaccount.component';
import { AccountComponent } from './account/account.component';
import { MsgmodalComponent } from './public/msgmodal/msgmodal.component';
import { CourseComponent } from './course/course.component';
import { CoursemodalComponent } from './public/coursemodal/coursemodal.component';



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
    MdGridListModule,
    MdTabsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentExpansionPanelModule,
    CovalentMessageModule,
    TreeModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [BasicComponent, SchoolsComponent, SubjectsComponent, GradesComponent, ClassesComponent, SchoolsmodalComponent, StaffComponent, DepartmentComponent, ClassesmodalComponent, GradesmodalComponent, BuildingsComponent, OfficesComponent, BuildingsmodalComponent, OfficesmodalComponent, SubjectsmodalComponent, DepartmentmodalComponent, StaffsmodalComponent, StaffsattributemodalComponent, PersonalComponent, StaffpropertyComponent, StaffunaccountComponent, AccountComponent, MsgmodalComponent, CourseComponent, CoursemodalComponent],
  entryComponents: [
    SchoolsmodalComponent,
    ClassesmodalComponent,
    GradesmodalComponent,
    BuildingsmodalComponent,
    OfficesmodalComponent,
    SubjectsmodalComponent,
    DepartmentmodalComponent,
    StaffsmodalComponent,
    StaffsattributemodalComponent,
    StaffpropertyComponent,
    StaffunaccountComponent,
    CoursemodalComponent,
    MsgmodalComponent,
  ],
  providers:[
    ApiService,
    UtilService

  ]
})
export class BasicModule { }
