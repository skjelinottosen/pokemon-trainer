import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/CommunicationService/communication.service';
import { PokemonService } from '../../services/API/pokemon.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-display-pokemons',
  templateUrl: './display-pokemons.component.html',
  styleUrls: ['./display-pokemons.component.css']
})
export class DisplayPokemonsComponent implements OnInit {

  imageUrl:""
  pokemonData: any[] = [];
  subscription: Subscription;

  constructor( private router: Router, private communicationService: CommunicationService, private pokemonService: PokemonService) {
    // Subscribes to home component messages
    this.subscription = this.communicationService.onMessage().subscribe(message => {
      if (message) {
        // Stores the trainer id and name in local storage
        localStorage.setItem("allPokemons", JSON.stringify(message.text[0]));
        localStorage.setItem("pokemonImageUrl",  message.text[1]);
      
        // Stores the pokemon data
        this.pokemonData[0] = JSON.parse(localStorage.getItem("allPokemons"));

        // Stores the url for the pokemon images
        this.pokemonData[1] =  localStorage.getItem("pokemonImageUrl");
        
        // Updates imageUrl with the url for the images
        this.imageUrl = this.pokemonData[1];    
        
      } else {
          // Clear messages when empty message received
          this.pokemonData = [];
      }
    });
  }

  onPreviewClicked(event){
    // Gets selecet pokemon id
    const selectedPokemonId = event.target.id;

    const pokemonId = parseInt(selectedPokemonId,10)+ 1;

    // Stores pokemon id in local storage
    localStorage.setItem("selectedPokemonId", JSON.stringify(pokemonId));

    // Get selected pokemon from local storage
    const allPokemons = JSON.parse(localStorage.getItem("allPokemons"));
    
    // Stores selected pokemon in local storage
    localStorage.setItem("selectedPokemon", JSON.stringify(allPokemons[selectedPokemonId]));

    // Stores selected pokemon image url  in local storage
    localStorage.setItem("selectedPokemonImageUrl",  this.imageUrl+pokemonId +".png");

    this.pokemonService.getPokemonById(pokemonId).subscribe((result) => {
    
      // Stores selected pokemon details in local storage
      localStorage.setItem("selectedPokemonDetails", JSON.stringify(result));
    });
           
    // Redirects to pokemon-details page
    this.redirect();
    
  }
  
  // Method redirect to pokemon-details page
  redirect() {
        this.router.navigate(['./pokemon-details']);
  }
    
  ngOnInit(): void {

  } 
}
