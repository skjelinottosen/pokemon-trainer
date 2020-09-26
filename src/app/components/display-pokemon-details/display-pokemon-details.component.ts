import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/CommunicationService/communication.service';
import { Pokemon } from '../../models/pokemon';
import { PokemonCollection } from '../../models/pokemonCollection';

@Component({
  selector: 'app-display-pokemon-details',
  templateUrl: './display-pokemon-details.component.html',
  styleUrls: ['./display-pokemon-details.component.css']
})
export class DisplayPokemonDetailsComponent implements OnInit {

  public pokemon = new Pokemon();
  public pokemonCollection = new PokemonCollection();

  pokemonName = JSON.parse(localStorage.getItem("selectedPokemon")).name;
  imageUrl = localStorage.getItem("selectedPokemonImageUrl");
  pokemonDetails = localStorage.getItem("selectedPokemonDetails");

  pokemonData: any[] = [];
  subscription: Subscription;
  loaded = false;

  constructor( private router: Router, private communicationService: CommunicationService) {
    
    // Stores pokemon detail data respone from local storages
    this.pokemonDetails = JSON.parse(localStorage.getItem("selectedPokemonDetails"));
    this.pokemon.id = JSON.parse(localStorage.getItem("selectedPokemonId"));
   
    // Gets pokemon collection from local storage
    this.pokemonCollection.pokemons = JSON.parse(localStorage.getItem("pokemonCollection"));

    // Gets the types
    for(let i= 0; i<this.pokemonDetails['types'].length; i++){
      this.pokemon.types[i] = this.pokemonDetails['types'][i]['type']['name'];
    }
    
    this.pokemon.imageUrl = localStorage.getItem('selectedPokemonImageUrl');
   
    // Gets the height
    this.pokemon.height = this.pokemonDetails['height'];
    
    // Gets the weight 
    this.pokemon.weight = this.pokemonDetails['weight'];
    
    // Gets the abilities
    for(let i= 0; i<this.pokemonDetails['abilities'].length; i++){
      this.pokemon.abilities[i] = this.pokemonDetails['abilities'][i]['ability']['name'];      
    }   
    
    // Gets the moves
    for(let i= 0; i<this.pokemonDetails['moves'].length; i++){
      this.pokemon.moves[i] = this.pokemonDetails['moves'][i]['move']['name'];      
    } 

    // Subscribes to home component messages
    this.subscription = this.communicationService.onMessage().subscribe(message => {
      if (message) {      
      // Stores Pokemon detail data in local storage
        localStorage.setItem("pokemonDetailsUrl",  message.text[2]);
        } else {
          // Clear messages when empty message received
          this.pokemonData = [];
        }
      });
    }

   onCatchClicked(event){

    // Helper array for the collection
    let pokemonCollected = [];
    pokemonCollected[0] = this.pokemonName;
    pokemonCollected[1] = this.imageUrl;
    alert("You Caught " +this.pokemonName);
    
    // Pushes new pokemon to the pokemon collection
    this.pokemonCollection.pokemons.push(pokemonCollected);

    // Stores the updated collection to local storage
    localStorage.setItem("pokemonCollection",  JSON.stringify( this.pokemonCollection.pokemons));
  }

  onAllPokemonsClicked($event){
    this.redirect();

  }

   // Method redirect to pokemon-details page
   redirect() {
    this.router.navigate(['./pokemons']);
  }
  ngOnInit(): void {
  
  }
}
