import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  // Data from app component
  @Input('id') public id;
  @Input('name') public name;
  
  constructor() { }

  ngOnInit(): void {
  }

}
