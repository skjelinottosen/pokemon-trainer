import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppStartPageComponent } from './components/app-start-page/app-start-page.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { DisplayPokemonsComponent } from './components/display-pokemons/display-pokemons.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppStartPageComponent,
    AppFooterComponent,
    DisplayPokemonsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
