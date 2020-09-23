import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from './services/CommunicationService/communication.service';

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
  public id = localStorage.getItem("trainerId")
   
  messages: any[] = [];
  subscription: Subscription;
  
  constructor(private communicationService: CommunicationService) {
   
    // Subscribes to home component messages
      this.subscription = this.communicationService.onMessage().subscribe(message => {
        if (message) {
            this.name = message.text.name;
            this.id = message.text.id;
        } else {
            // Clear messages when empty message received
            this.messages = [];
        }
    });
  } 
}
