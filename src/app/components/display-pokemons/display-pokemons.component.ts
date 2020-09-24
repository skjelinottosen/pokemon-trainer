import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/CommunicationService/communication.service';

@Component({
  selector: 'app-display-pokemons',
  templateUrl: './display-pokemons.component.html',
  styleUrls: ['./display-pokemons.component.css']
})
export class DisplayPokemonsComponent implements OnInit {

  imageUrl:""
  pokemonData: any[] = [];
  subscription: Subscription;

  constructor( private router: Router, private communicationService: CommunicationService) {
    // Subscribes to home component messages
    this.subscription = this.communicationService.onMessage().subscribe(message => {
      if (message) {

        // Stores the pokemon data
        this.pokemonData[0] = message.text[0];

        // Stores the url for the pokemon images
        this.pokemonData[1] = message.text[1];
        
        // Updates imageUrl with the url for the images
        this.imageUrl = this.pokemonData[1];      
      } else {
          // Clear messages when empty message received
          this.pokemonData = [];
      }
    });
  }
     // Method redirect to pokemon page
  redirect() {
    this.router.navigate(['./pokemons']);
  }

  ngOnInit(): void {
  } 
}
