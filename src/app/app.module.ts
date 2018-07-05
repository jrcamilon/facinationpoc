import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavGlobalComponent } from './shared/nav-global/nav-global.component';
import { HomeComponent } from './modules/home/home.component';
import { DonutComponent } from './modules/home/components/charts/donut/donut.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    NavGlobalComponent,
    HomeComponent,
    DonutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
