import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-display-pokemon-collection',
  templateUrl: './display-pokemon-collection.component.html',
  styleUrls: ['./display-pokemon-collection.component.css']
})
export class DisplayPokemonCollectionComponent implements OnInit {
  imageUrl:""
  pokemonData: any[] = [];

  constructor(private router: Router) {
    // Stores the pokemon data
    this.pokemonData = JSON.parse(localStorage.getItem("pokemonCollection"));
   }

   onAllPokemonsClicked($event){
    this.redirectToPreview();
  }

   // Method redirect to pokemon-previw page
   redirectToPreview() {
    this.router.navigate(['./preview']);
  }

  ngOnInit(): void {
  }

}
