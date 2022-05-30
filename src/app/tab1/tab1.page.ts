import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  // urlRecursos: string = "http://localhost/tabs/tab1/api_backend/";
  urlRecursos: string = "https://api-cors-proxy-devdactic.herokuapp.com/http://api.wolframalpha.com/v2/";

  calculando: boolean = false;
  imagen: string = "";
  resultado: string;
  formula: string="";
  variable: string="";
  calculo: string = "";
  error:string = "";
  ruta: string = "";

  constructor(private http: HttpClient) { }


  calcular() {
    this.calculando = true;
    this.imagen = "";
    this.resultado = "";
    this.error = "";

    let formulaFinal:string = this.formula;
    let cantidadCaracteres:number = 0;
    
    cantidadCaracteres = formulaFinal.split("+").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace("+", "%2B");      
    }

    cantidadCaracteres = formulaFinal.split("-").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace("-", "%2D");
    }

    cantidadCaracteres = formulaFinal.split("*").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace("*", "%2A");
    }

    cantidadCaracteres = formulaFinal.split("/").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace("/", "%2F");
    }

    cantidadCaracteres = formulaFinal.split("(").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace("(", "%28");
    }

    cantidadCaracteres = formulaFinal.split(")").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace(")", "%29");
    }

    cantidadCaracteres = formulaFinal.split("^").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace("^", "%5E");
    }

    cantidadCaracteres = formulaFinal.split(" ").length;
    for (let i = 0; i < cantidadCaracteres; i++) {
      formulaFinal = formulaFinal.replace(" ", "+");
    }

    this.calculo = "Integrate[" + formulaFinal + "," + this.variable + "]";

    this.ruta = this.urlRecursos + "query?input=" + this.calculo + "&appid=3KJKX5-W3WK72VWQQ&format=image&output=json";
    try {
      this.http.get(this.ruta)
        .subscribe(data => {
          console.log(data['queryresult']["success"]);
          if(data['queryresult']["success"]==true){
          this.resultado = data['queryresult']['pods'][0]['subpods'][0]['img']['title'];
          this.imagen = data['queryresult']['pods'][0]['subpods'][0]['img']['src'];
          }
          else{
            this.error = "Error al calcular, por favor verifique la formula";
          }
          this.calculando = false;
        },
        error => {
          this.error = error;
          console.log(error);
          this.calculando = false;
        });
    } catch (error) {
      this.error = "Error al calcular, por favor verifique la formula";
      this.calculando = false;
    }
  }


  descargarImagen(){
    var img = new Image();
    img.src = this.imagen;
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      var a = document.createElement("a");
      a.href = dataURL;
      a.download = "imagen.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

}
