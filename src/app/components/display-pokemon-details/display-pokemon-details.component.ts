import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/CommunicationService/communication.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-display-pokemon-details',
  templateUrl: './display-pokemon-details.component.html',
  styleUrls: ['./display-pokemon-details.component.css']
})
export class DisplayPokemonDetailsComponent implements OnInit {

  public pokemon = new Pokemon();

  pokemonName = JSON.parse(localStorage.getItem("selectedPokemon")).name;
  imageUrl = localStorage.getItem("selectedPokemonImageUrl");
  pokemonDetails = localStorage.getItem("selectedPokemonDetails");

  pokemonData: any[] = [];
  subscription: Subscription;
  loaded = false;

  constructor( private router: Router, private communicationService: CommunicationService) {
     // Subscribes to home component messages
     this.subscription = this.communicationService.onMessage().subscribe(message => {
      if (message) {      
        // Stores Pokemon detail data in local storage
        localStorage.setItem("pokemonDetailsUrl",  message.text[2]);
        
        // Stores response detail data respone from local storages
        this.pokemonDetails = JSON.parse(localStorage.getItem("selectedPokemonDetails"));
       this.pokemon.id = JSON.parse(localStorage.getItem("selectedPokemonId"));
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
    
      } else {
          // Clear messages when empty message received
          this.pokemonData = [];
      }
    });
   }

  ngOnInit(): void {
  
  }
}