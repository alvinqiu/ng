import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginrouterModule } from './loginrouter/loginrouter.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule }   from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { 
  MdButtonModule,
  MdInputModule, 
  MdAutocompleteModule,
  MdIconModule,
  MdCardModule,
  MdCheckboxModule,
} from '@angular/material';
import { CookieModule } from 'ngx-cookie';

import { LoginComponent } from './login.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginrouterModule,
    FormsModule,
    FlexLayoutModule,
    MdCheckboxModule,
    MdButtonModule,
    MdInputModule,
    MdAutocompleteModule,
    MdIconModule,
    MdCardModule,
    CookieModule.forRoot(),
  ],
  declarations: [LoginComponent, IndexComponent],
  providers:[
    ApiService,
  ]
})
export class LoginModule { }
