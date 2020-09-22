import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    StartPageComponent,
    FooterBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
