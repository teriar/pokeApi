import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorias } from 'src/app/interfaces/pokemones.interface';
import { PokeServiceService } from 'src/app/services/poke-service.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: []
})
export class TablaComponent implements OnInit {

  @Input() arrPokemones:any= [];
  @Output() pokemonElegido = new EventEmitter<string>();
  public page!:number
   filtrar: any =[]

  constructor(private pokeServices:PokeServiceService) { }

  ngOnInit(): void {
    
    

  }

  enviarPokemon(termino:string){
   this.pokemonElegido.emit(termino)
   
  }


  // filtrarPorNombre(){
    
  //   this.arrPokemones.filter( (pokemon:any) =>{
  //     console.log(pokemon)
  //   })
  // }

  // pokemonEnviar(){
  //   this.pokeServices.buscarPokemonApi().subscribe(data=>{

  //   })
    
  // }

}
