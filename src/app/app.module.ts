import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppStartPageComponent } from './components/app-start-page/app-start-page.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { DisplayPokemonsComponent } from './components/display-pokemons/display-pokemons.component';
import { DisplayPokemonDetailsComponent } from './components/display-pokemon-details/display-pokemon-details.component';
import { DisplayPokemonCollectionComponent } from './components/display-pokemon-collection/display-pokemon-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppStartPageComponent,
    AppFooterComponent,
    DisplayPokemonsComponent,
    DisplayPokemonDetailsComponent,
    DisplayPokemonCollectionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
