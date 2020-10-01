import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import {Router} from '@angular/router';
import { CommunicationService } from '../../services/CommunicationService/communication.service';
import { Trainer } from '../../models/trainer';
import { getStorage, setStorage } from '../../services/Utils/storage-utils';

@Component({
  selector: 'app-start-page',
  templateUrl: './app-start-page.component.html',
  styleUrls: ['./app-start-page.component.css']
})
export class AppStartPageComponent implements OnInit {
  // Input variables for trainer object
  public id;
  public name:'';

  constructor(private router: Router, private communicationService: CommunicationService) {}
  // Creates new trainer object
  public trainer = new Trainer();
  
  sendMessage(name): void {
    // Sends message to subscribers via observable subject
    this.communicationService.sendMessage(name);
  }

  ngOnInit(): void {
  }

  // Click event for sign up on start page
  onSignUpClicked(){

  // Generes random id in range 1000000 to 9999999
    let randomId = this.randomId(1000000,9999999);
    this.id = randomId.toString();

    // Sets trainer propeties
    this.trainer.id = this.id
    this.trainer.name=this.name;

    // Stores the trainer id and name in local storage
    setStorage("trainerId",  this.trainer.id);
    setStorage("trainerName", this.trainer.name);
    // Sends trainer object to app
    this.sendMessage(this.trainer);

    // Routes forward to preview
    this.router.navigateByUrl(`/preview`);
  }

   // Generates a random Id 
   randomId(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
