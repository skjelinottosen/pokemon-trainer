import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from './services/CommunicationService/communication.service';
import {  AuthService } from './services/Auth/auth.service'
import {Router} from '@angular/router';

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
   
  messages: any[] = [];
  subscription: Subscription;
  
  constructor(private router: Router, private communicationService: CommunicationService, private authService: AuthService) {
    if(authService.isSignedIn()){    
    // Redirects on event
    this.redirect();
    }
    else{
       // Subscribes to home component messages
       this.subscription = this.communicationService.onMessage().subscribe(message => {
          if (message) {
              this.name = message.text.name;
              this.id = message.text.id;
              this.redirect();
          } else {
              // Clear messages when empty message received
              this.messages = [];
          }
      });     
    }   
  } 

  // Method redirect to pokemon page
  redirect() {
    this.router.navigate(['./pokemons']);
  }

}
