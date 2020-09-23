import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  @Input('trainerId') public id;
  @Input('trainerName') public name;
  
  constructor() { }

  ngOnInit(): void {
  }

}
