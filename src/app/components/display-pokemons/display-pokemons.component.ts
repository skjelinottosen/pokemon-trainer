import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/Auth/auth.service'
import { PokemonService } from '../../services/API/pokemon.service';
import { getStorage, setStorage } from '../../services/Utils/storage-utils';

@Component({
  selector: 'app-display-pokemons',
  templateUrl: './display-pokemons.component.html',
  styleUrls: ['./display-pokemons.component.css']
})
export class DisplayPokemonsComponent implements OnInit {

  imageUrl:""
  pokemonData: any[] = [];
  subscription: Subscription;

  constructor( private router: Router, private pokemonService: PokemonService, private authService: AuthService) {
    
    // Checks is user is signed in
    if(!this.authService.isSignedIn()){ 
      
      // Redirects 
      this.redirect('./start-page');
     
      // Hides the trainer section 
      let trainerHeader = document.getElementById("trainer-section-header");
      trainerHeader.style.display = "none";
    }
    else{
      // Displays the trainer section 
      let trainerHeader = document.getElementById("trainer-section-header");
      trainerHeader.style.display = "block";
  
      // Gets the pokemon data from local storage
      this.pokemonData[0] = getStorage("allPokemons");

       // Get the image base url
      this.pokemonData[1] = this.getPokemonImageUrl();

      // Updates imageUrl with the url for the images
      this.imageUrl = this.pokemonData[1]; 
    
    }   
  }

  // Gets base url for the images
  getPokemonImageUrl() : String {
    return this.pokemonService.getPokemonImageUrl()
  }

  onPreviewClicked(event){
    // Gets selected pokemon id
    const selectedPokemonId = event.target.id;
    // Corrects to match api id
    const pokemonId = parseInt(selectedPokemonId,10)+ 1;
    // Gets pokemon by id
    this.pokemonService.getPokemonById(pokemonId).subscribe((result) => { 
      // Stores selected pokemon details in local storage
      setStorage('selectedPokemon', result);
      this.router.navigateByUrl(`/details/${pokemonId}`)
    });
  }

  onBtnCollectionClicked($event){
    this.redirect('./collection');
  }
  
  // Method redirect to pokemon-details page
  redirect(path) {
        this.router.navigate([path]);
  }
    
  ngOnInit(): void {

  } 
}
