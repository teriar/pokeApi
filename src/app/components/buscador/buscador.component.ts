import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: []
})
export class BuscadorComponent implements OnInit {


  @Output() onEnter:EventEmitter<string> = new EventEmitter();
  @Output() onDebounce:EventEmitter<string> = new EventEmitter();
  @Input() placeholder:string='Buscar';


  debouncer:Subject<string> = new Subject();
  termino:string = '';
  constructor() { }

  ngOnInit(): void {

    this.debouncer
    .pipe(
      debounceTime((300))
    )
    .subscribe(valor=>{
    
      this.onDebounce.emit(valor);
    })
  }

  buscar(){
    this.onEnter.emit(this.termino);
    
  }
  teclaPresionada(event:any){
    
    this.debouncer.next(this.termino);
   
  }


}
