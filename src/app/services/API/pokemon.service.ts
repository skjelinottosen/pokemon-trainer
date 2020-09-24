import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http/';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  private subject = new Subject<any>();
  
  public allPokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=807';
  public pokemonImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getAllPokemons(){ 
    return this.http.get(this.allPokemonUrl);
  }
  
  getPokemonImageUrl() : string {
    return this.pokemonImageUrl
  }
}
