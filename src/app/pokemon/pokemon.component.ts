import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriasPokemon } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: []
})
export class PokemonComponent implements OnInit {

  @Input() pokemon:any;
  
  
  constructor() { }

  ngOnInit(): void {

   
  }

  enviarPokemonFavorito(pokemon:any){
   
    localStorage.setItem('pokemonFavorito', JSON.stringify(pokemon))
    window.location.reload()
   }



}
