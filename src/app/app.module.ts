import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MysqlComponent } from './mysql/mysql.component';
import { HomeComponent } from './home/home.component';

//routing module
import { AppRoutingModule } from './routing/app-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
@NgModule({
  declarations: [
    AppComponent,
    MysqlComponent,
    HomeComponent,
    WidgetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
