import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/CommunicationService/communication.service';
import { AuthService } from '../../services/Auth/auth.service'
import { PokemonService } from '../../services/API/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { PokemonCollection } from '../../models/pokemonCollection';
import { getStorage, setStorage } from '../../services/Utils/storage-utils';
import { stringify } from 'querystring';

@Component({
  selector: 'app-display-pokemon-details',
  templateUrl: './display-pokemon-details.component.html',
  styleUrls: ['./display-pokemon-details.component.css']
})
export class DisplayPokemonDetailsComponent implements OnInit {

  public pokemon = new Pokemon();
  public pokemonCollection = new PokemonCollection();
  pokemonData: any[] = [];
  pokemonDetails: object[] = getStorage("selectedPokemon");
  subscription: Subscription;
  loaded = false;

  constructor( private router: Router,private route: ActivatedRoute, private communicationService: CommunicationService, private authService: AuthService, private pokemonService: PokemonService) {
    //Redirects to start page if not logged in
    if(!this.authService.isSignedIn()){ 
      this.redirect('./start-page');
    }
    else{  
    // Gets id from url paramater
    this.pokemon.id = this.route.snapshot.params.id;
    //Gets pokemon by id
    this.pokemonService.getPokemonById(this.pokemon.id);

    // Gets the name 
    this.pokemon.name = this.pokemonDetails['forms'][0]['name'];
     
    // Gets the image url
    this.pokemon.imageUrl =`${this.getPokemonImageUrl()}${this.pokemon.id}.png`;
    
    // Gets the types
    for(let i= 0; i<this.pokemonDetails['types'].length; i++){
      this.pokemon.types[i] = this.pokemonDetails['types'][i]['type']['name'];
    }
   
    // Gets the height
    this.pokemon.height = this.pokemonDetails['height'];
    
    // Gets the weight 
    this.pokemon.weight = this.pokemonDetails['weight'];
   
    // Gets the abilities
    for(let i= 0; i<this.pokemonDetails['abilities'].length; i++){
      this.pokemon.abilities[i] = this.pokemonDetails['abilities'][i]['ability']['name'];      
    }   
    
    // Gets the moves
    for(let i= 0; i<this.pokemonDetails['moves'].length; i++){
      this.pokemon.moves[i] = this.pokemonDetails['moves'][i]['move']['name'];      
    } 

    // Subscribes to home component messages
    this.subscription = this.communicationService.onMessage().subscribe(message => {
      if (message) {      
      // Stores Pokemon detail data in local storage
      setStorage("pokemonDetailsUrl",  message.text[2])
        } else {
          // Clear messages when empty message received
          this.pokemonData = [];
        }
      });
    }   
  }

  // Gets image by url
  getPokemonImageUrl() : String {
    return this.pokemonService.getPokemonImageUrl()
  }

   onBtnCatchClicked(event){

    if( getStorage("pokemonCollection") != null){
      this.pokemonCollection.pokemons = getStorage("pokemonCollection"); 
    }
   
    
    // Helper array for the collection
    let pokemonCollected = [];
    pokemonCollected[0] = this.pokemon.name;
    pokemonCollected[1] = this.pokemon.imageUrl;
    
    // Pushes new pokemon to the pokemon collection
    this.pokemonCollection.pokemons.push(pokemonCollected);

    // Stores the updated collection to local storage
    setStorage("pokemonCollection",  this.pokemonCollection.pokemons);
    alert("You Caught " +this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1));
  }

  onBtnAllPokemonsClicked($event){
    this.redirect('./preview');
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
