import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscribe: Subscription;

  constructor() {

    this.subscribe =  this.regresaObservable()
    .subscribe(
      numero => console.log('Subscribe', numero),
      error => console.error('Error en el observador', error),
      () => console.log( 'La Observacion termino' )
      );

   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscribe.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (obsever: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador++;

        const salida = {
          valor: contador
        };

        obsever.next( salida );

        // if ( contador  === 3) {
        //   clearInterval( intervalo );
        //   obsever.complete();
        // }

        // if ( contador === 2 ) {
        //   clearInterval( intervalo );
        //   obsever.error( 'Auxilio!' );
        // }

      }, 1000 );

    }).pipe(

      map( resp => resp.valor),
      filter( (valor, index) => {
        // console.log('Filter', valor, index);
        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
        // return true;
      })

    );
    // return obs;
  }

}
