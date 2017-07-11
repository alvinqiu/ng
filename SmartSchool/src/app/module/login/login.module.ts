import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginrouterModule } from './loginrouter/loginrouter.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule }   from '@angular/forms';

import { 
  MdButtonModule,
  MdInputModule, 
  MdAutocompleteModule,
  MdIconModule,
  MdCardModule,
} from '@angular/material';

import { LoginComponent } from './login.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginrouterModule,
    FormsModule,
    FlexLayoutModule,

    MdButtonModule,
    MdInputModule,
    MdAutocompleteModule,
    MdIconModule,
    MdCardModule,
  ],
  declarations: [LoginComponent, IndexComponent]
})
export class LoginModule { }
