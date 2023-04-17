import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from '../interfaces/pokemones.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeServiceService {

  private apiUrl:string = 'https://pokeapi.co/api/v2/';
                      
  constructor( private http:HttpClient) { }


  buscarApi():Observable<Categorias[]>{
    
    const url = `${this.apiUrl}pokemon?limit=100000&offset=0`;
    
    return this.http.get<Categorias[]>(url);
  }

  buscarPokemonApi(pokemon:string){
     
    const url = `${pokemon}`;

    return this.http.get<any>(url);
  }
}
