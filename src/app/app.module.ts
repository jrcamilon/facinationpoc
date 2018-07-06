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
import { ShufflerComponent } from './modules/home/components/shuffler/shuffler.component';
import { FunnelComponent } from './modules/home/components/charts/funnel/funnel.component';
import { AreaComponent } from './modules/home/components/charts/area/area.component';
import { BarComponent } from './modules/home/components/charts/bar/bar.component';
import { LineComponent } from './modules/home/components/charts/line/line.component';
import { IbeService } from './services/ibe.service';


@NgModule({
  declarations: [
    AppComponent,
    NavGlobalComponent,
    HomeComponent,
    DonutComponent,
    ShufflerComponent,
    FunnelComponent,
    AreaComponent,
    BarComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [IbeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
