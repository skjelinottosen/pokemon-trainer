import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './app-start-page.component.html',
  styleUrls: ['./app-start-page.component.css']
})
export class AppStartPageComponent implements OnInit {

  // Trainer object
  trainer = {
    name: ''
  }

  constructor() { }

  ngOnInit(): void {
  }
  onSignUpClicked(){
    // Stores the trainer name in local storage
    localStorage.setItem("trainerName", this.trainer.name);
  }
}
