import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from './services/CommunicationService/communication.service';
import { AuthService } from './services/Auth/auth.service'
import { PokemonService } from './services/API/pokemon.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'pokemon-trainer';

  // Gets trainer name from local storage
  public name = localStorage.getItem("trainerName");
   
  // Sets trainer Id
  public id = localStorage.getItem("trainerId");
   
  // Stores the pokemonData
  pokemonCollection: object[] = [];
  messages: any[] = [];
  subscription: Subscription;

  // Base url for the pokemon images
  public pokemonImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  
  constructor(private router: Router, private communicationService: CommunicationService, private authService: AuthService, private pokemonService: PokemonService) {
    if(this.authService.isSignedIn()){    
      // Redirects on event
      this.redirect();
    }
    else{
       // Subscribes to home component messages
       this.subscription = this.communicationService.onMessage().subscribe(message => {
          if (message) {
              this.name = message.text.name;
              this.id = message.text.id;
              if(this.authService.isSignedIn()){    
                // Redirects on event
                this.redirect();

                // Reloads the page for getting the pokemon data
                location.reload();
              }
              
          } else {
              // Clear messages when empty message received
              this.messages = [];
          }    
      });     
    }   
  } 

  sendMessage(name): void {
    // Sends message to subscribers via observable subject
    this.communicationService.sendMessage(name);
  }

  clearMessages(): void {
    // Clears messages
    this.communicationService.clearMessages();
  }

  getPokemonImageUrl() : String {
    return this.pokemonService.getPokemonImageUrl()
  }

  getPokemonDetailsUrl() : String{
    return this.pokemonService.getPokemonDetailsUrl();
  }

  // Method redirect to pokemon page
  redirect() {
    this.router.navigate(['./pokemons']);
  }

  async ngOnInit(){

    // Gets the pokemon data from the api
    this.pokemonService.getAllPokemons().subscribe((result) => {
      this.pokemonCollection = result['results']; 

      // Get the image base url
      let pokemonImageUrl = this.getPokemonImageUrl();

      let pokemonDetailsUrl = this.getPokemonDetailsUrl();
      
      // Creates a array 
      let pokemonData = [];

      // Adds pokemon data to the array
      pokemonData[0] = this.pokemonCollection;
    
      // Adds images base url to the array
      pokemonData[1] = pokemonImageUrl
    
      // Add details base url to the array
      pokemonData[2] = pokemonDetailsUrl;
    
      // Sends array to other components
      this.sendMessage(pokemonData);
    });
  }
}
