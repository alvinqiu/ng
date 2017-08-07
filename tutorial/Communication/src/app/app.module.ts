import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstComponent, FirstChildComponent, FirstParentComponent } from './src/first/first.component';
import { SecondComponent, SecondChildComponent, SecondParentComponent } from './src/second/second.component';
import { ThirdComponent, ThirdChildComponent, ThirdParentComponent } from './src/third/third.component';
import { FourthComponent, FourthChildComponent, FourthParentComponent } from './src/fourth/fourth.component';

@NgModule({
  declarations: [
    AppComponent,

    FirstComponent,
    FirstChildComponent,
    FirstParentComponent,

    SecondComponent,
    SecondChildComponent,
    SecondParentComponent,

    ThirdComponent,
    ThirdChildComponent,
    ThirdParentComponent,
    
    FourthComponent,
    FourthChildComponent,
    FourthParentComponent,
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
