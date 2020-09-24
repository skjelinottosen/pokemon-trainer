import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { emit } from 'process';
import { CommunicationService } from '../../services/CommunicationService/communication.service';
import { Trainer } from '../../models/trainer'

@Component({
  selector: 'app-start-page',
  templateUrl: './app-start-page.component.html',
  styleUrls: ['./app-start-page.component.css']
})
export class AppStartPageComponent implements OnInit {
  // Input variables for traine robject
  public id;
  public name:'';

  @Output() public getNameEvent = new EventEmitter();

  constructor(private communicationService: CommunicationService) {}
    
  public newTrainer = new Trainer();

    sendMessage(name): void {
      // Sends message to subscribers via observable subject
      this.communicationService.sendMessage(name);
    }

    clearMessages(): void {
        // Clears messages
        this.communicationService.clearMessages();
    }

    ngOnInit(): void {
    }

    // Click event for sign up on start page
    onSignUpClicked(){

    // Generes random id in range 1000000 to 9999999
    let randomId = this.randomId(1000000,9999999);
    this.id = randomId.toString();

    this.newTrainer.id = this.id
    this.newTrainer.name=this.name;

    // Stores the trainer id and name in local storage
    localStorage.setItem("trainerId",  this.newTrainer.id);
    localStorage.setItem("trainerName", this.newTrainer.name);

    // Sends trainer object to app
    this.sendMessage(this.newTrainer);
  }

   // Generates a random Id 
   randomId(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
