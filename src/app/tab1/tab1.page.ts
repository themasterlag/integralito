import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import math from 'mathjs/lib/browser/math.js';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  urlRecursos:string ="http://localhost:8100/api_backend/";

  calculando:boolean = false;
  imagen:string;
  resultado:string;
  formula:string;

  constructor(private http: HttpClient) {  }


  calcular(){
    this.calculando = true;
    this.imagen = "";
    this.resultado = "";
    
    this.http.get(this.urlRecursos+"query?input=pi&appid=3KJKX5-W3WK72VWQQ&format=image&output=json")
    .subscribe(data => {
      console.log(data['queryresult']['pods'][1]['subpods'][0]['img']['title']);
      this.resultado = data['queryresult']['pods'][1]['subpods'][0]['img']['title'];
      this.imagen = this.urlRecursos+data['queryresult']['pods'][1]['subpods'][0]['img']['src'];
      this.calculando = false;
    });
  }

  

}
