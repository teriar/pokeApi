import { Component, OnInit, EventEmitter, SimpleChanges, } from '@angular/core';
import { PokeServiceService } from '../services/poke-service.service';
import { Categorias } from '../interfaces/pokemones.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: []
})
export class ListadoComponent implements OnInit {

  onEnter:EventEmitter<string> = new EventEmitter();
  constructor( private actividedRoute:ActivatedRoute, private pokeServices:PokeServiceService) { }

 
  termino:string = '';
  arrPokemones:any =[];
  arrPokemonesSugeridos: any;
  pokemon:any;
  pokemonFavorito:any;


  pokemonsLetras: any[] = [];
  sortedMap: any = {};


  ngOnInit(): void {
    this.pokeServices.buscarApi().subscribe(pokemones =>{
      
      this.arrPokemones = pokemones 
      //console.log(this.arrPokemones)
    })

    if(localStorage.getItem('pokemonFavorito')){
      this.pokemonFavorito = localStorage.getItem('pokemonFavorito')
      this.pokemonFavorito = JSON.parse(this.pokemonFavorito)
    }
 
    this.pokemonesAbecedario()

  }


  ngOnChanges(changes: SimpleChanges) {
    if(localStorage.getItem('pokemonFavorito')){
      this.pokemonFavorito = localStorage.getItem('pokemonFavorito')
      this.pokemonFavorito = JSON.parse(this.pokemonFavorito)
    }
    console.log(changes)
   
  }


  pokemonesAbecedario(){
    this.pokeServices.buscarApi().subscribe((resp: any) => {
      resp.results.forEach((element: any) => {
        this.pokemonsLetras.push(element.name);
      });
      let letracontador = this.pokemonsLetras.reduce((count: any, word: string) => {
        let filtroLetra = word[0];
        count[filtroLetra] = (count[filtroLetra] || 0) + 1;
        return count;
      }, {});
      let contador = new Map(Object.entries(letracontador).map(([k, v]) => [k.toUpperCase(), v]));
      let conteo = Array.from(contador.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      this.sortedMap = new Map(conteo);
    });
  }



  buscar(termino:string){
  
     this.termino = termino;
     this.pokeServices.buscarApi().subscribe(pokemones=>{
    //  console.log(paises);
    
      this.arrPokemones = pokemones;
    
     },(err)=>{
       console.info(err);
       
     this.arrPokemones= [];
     });
       
 }
 
 sugerencias(termino:string){
     if(termino.length > 0){
     
      this.arrPokemonesSugeridos =this.arrPokemones.results.filter((data:any) => data.name.includes(termino)  )
      this.arrPokemonesSugeridos = this.arrPokemonesSugeridos.splice(0,5)

  }else{
    this.arrPokemonesSugeridos = []
  }
     
 }



 obtenerEnlacePokemon(dato:string){
   // obtener enlace de pokemon

     
     this.pokeServices.buscarPokemonApi(dato).subscribe(data=>{
      this.pokemon = data
    
      this.arrPokemonesSugeridos=[]
     })
 }


  
 

}
