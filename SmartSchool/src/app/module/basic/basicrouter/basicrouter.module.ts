import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SchoolsComponent } from '../schools/schools.component';
import { GradesComponent } from '../grades/grades.component';
import { ClassesComponent } from '../classes/classes.component';
import { SubjectsComponent } from '../subjects/subjects.component';
import { StaffComponent } from '../staff/staff.component';
import { DepartmentComponent } from '../department/department.component';
import { BuildingsComponent } from '../buildings/buildings.component';
import { OfficesComponent } from '../offices/offices.component';
import { PersonalComponent } from '../personal/personal.component';
import { AccountComponent } from '../account/account.component';

const BasicRoutes: Route[] = [
	{ path: '', redirectTo: 'schools',  pathMatch: 'full'},
	{ path: 'schools', component: SchoolsComponent },
	{ path: 'grades', component: GradesComponent },
	{ path: 'subjects', component: SubjectsComponent },
	{ path: 'classes', component: ClassesComponent },
	{ path: 'staffs', component: StaffComponent },
	{ path: 'departs', component: DepartmentComponent},
	{ path: 'buildings', component: BuildingsComponent},
	{ path: 'offices', component: OfficesComponent},
	{ path: 'personal', component: PersonalComponent},
	{ path: 'account', component: AccountComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BasicRoutes),
  ],
  declarations: []
})
export class BasicrouterModule { }
