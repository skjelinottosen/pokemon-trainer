import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppStartPageComponent } from './components/app-start-page/app-start-page.component';
import { DisplayPokemonsComponent } from './components/display-pokemons/display-pokemons.component';
import { DisplayPokemonDetailsComponent } from './components/display-pokemon-details/display-pokemon-details.component';
import { DisplayPokemonCollectionComponent } from './components/display-pokemon-collection/display-pokemon-collection.component';

const routes: Routes = [
  {path: 'start-page', component: AppStartPageComponent },
  {path: 'pokemons', component: DisplayPokemonsComponent },
  {path: 'pokemon-details', component: DisplayPokemonDetailsComponent },
  {path: 'display-pokemon-collection', component: DisplayPokemonCollectionComponent },
  {path: '', redirectTo: 'start-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
