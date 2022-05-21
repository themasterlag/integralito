import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import math from 'mathjs/lib/browser/math.js';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  urlRecursos: string = "http://localhost:8100/api_backend/";

  calculando: boolean = false;
  imagen: string = "";
  resultado: string;
  formula: string;
  variable: string;

  error:string = "";

  prueba:string = "$$\sum_{i=1}^nc=cn$$";

  constructor(private http: HttpClient) { }


  calcular() {
    this.calculando = true;
    this.imagen = "";
    this.resultado = "";
    this.error = "";

    let calculo: string = "Integrate[" + this.formula + "," + this.variable + "]";

    let ruta: string = this.urlRecursos + "query?input=" + calculo;
    try {
      this.http.get(ruta + "&appid=3KJKX5-W3WK72VWQQ&format=image&output=json")
        .subscribe(data => {
          console.log(data['queryresult']["success"]);
          if(data['queryresult']["success"]==true){
          this.resultado = data['queryresult']['pods'][0]['subpods'][0]['img']['title'];
          this.imagen = data['queryresult']['pods'][0]['subpods'][0]['img']['src'];
          }
          else{
            this.error = "Error al calcular, por favor verifique la formula";
          }
        },
        error => {
          this.error = error;
          console.log(error);
        });
    } catch (error) {
      this.error = "Error al calcular, por favor verifique la formula";
    }
    finally {
      this.calculando = false;
    }

  }



}
