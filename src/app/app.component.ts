import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from './services/CommunicationService/communication.service';
import { AuthService } from './services/Auth/auth.service'
import { PokemonService } from './services/API/pokemon.service'
import { getStorage, setStorage } from '../app/services/Utils/storage-utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'pokemon-trainer';
  // Gets trainer name from local storage
  public name = getStorage("trainerName");
    
  // Gets trainer Id
  public id = getStorage("trainerId");
 
  // Stores the pokemonData
  pokemonCollection: object[] = [];
  messages: any[] = [];
  subscription: Subscription;
  
  constructor(private router: Router, private communicationService: CommunicationService, private authService: AuthService, private pokemonService: PokemonService) {
    // Current path used for redirect logic
    const path = window.location.pathname.substring(1);
   
    if(!this.authService.isSignedIn()){ 
        //Subscribes to home component messages
        this.subscription = this.communicationService.onMessage().subscribe(message => {
          if (message) {
              // Gets trainer data from start page component 
              this.name = message.text.name;
              this.id = message.text.id;

              if(this.authService.isSignedIn()){     
               // Redirects to preview
                this.redirect('preview');     
              }
              
          } else {
              // Clear messages when empty message received
              this.messages = [];
          }    
      });      
    }  
    else{
      if(path==="" || path=='start-page'){       
        // Redirects to preview
        this.redirect('preview');  
      }
      else{    
        // Redirects to chosen path
        this.redirect(path);  
      }       
    } 
  } 

  // Method redirect to pokemon page
  redirect(path) {
    this.router.navigate([path]);
  }

   ngOnInit(){

    // Gets the pokemon data from the api
    this.pokemonService.getAllPokemons().subscribe((result) => {
      this.pokemonCollection = result['results']; 
     
      // Adds pokemon data to the array
      setStorage("allPokemons", this.pokemonCollection);
    });
  }
}
