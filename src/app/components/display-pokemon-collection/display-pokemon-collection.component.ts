import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service'
import { getStorage, setStorage } from '../../services/Utils/storage-utils';

@Component({
  selector: 'app-display-pokemon-collection',
  templateUrl: './display-pokemon-collection.component.html',
  styleUrls: ['./display-pokemon-collection.component.css']
})
export class DisplayPokemonCollectionComponent implements OnInit {
  imageUrl:""
  pokemonData: any[] = [];

  constructor(private router: Router, private authService: AuthService) {
    
    if(!this.authService.isSignedIn()){ 
      this.redirect('./start-page');
    }
    else{
        // Stores the pokemon data
        this.pokemonData = getStorage("pokemonCollection");
    }
  }

   onBtnAllPokemonsClicked($event){
    this.redirectToPreview();
  }

   // Method redirect to pokemon-previw page
   redirectToPreview() {
    this.router.navigate(['./preview']);
  }

  // Method redirect to pokemon-details page
  redirect(path) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
  }

}
