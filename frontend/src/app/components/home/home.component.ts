import { Component, OnInit } from '@angular/core';
import { ExcelServicesService } from '../../services/excel-services.service';
import { HttpClient } from '@angular/common/http';
import { ZapatasService } from '../../services/zapatas.service';
import { Router } from '@angular/router';
import { Excel } from '../../models/excel';
import { NumeroEtabs } from '../../models/numeroEtabs';
import * as util from 'util' // has no default export
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

import * as XLSX from 'ts-xlsx';
import { Zapatas } from 'src/app/models/zapatas';
import { NumeroZapata } from 'src/app/models/numeroZapata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'excel-upload-download';
  dato1: number;
  pesoSuelo: number;
  pesoConcreto: number;
  diametroAcero: number;
  pesoZapata: number;
  cargaViva: number;
  cargaMuerta: number;
  cargaAdmisibleSuelo: number;
  factorMayoracion: number;
  factorMayoracionUsuario: number;
  habilitar: boolean;
  archivo: boolean;
  numeroCarga: number;
  numeroZapata: number;
  zapatas;

  base: Array<number>;
  fx: Array<number>;
  fy: Array<number>;
  fz: Array<number>;
  mx: Array<number>;
  my: Array<number>;
  mz: Array<number>;

  numeroCargas: Array<number>;

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, 'slow');
    swal("Datos guardados!", "Se han guardado los datos principales!", "success");
    // setTimeout(() => this.getZapata(), 3000);
    setTimeout(() => this.darCargas(), 1000);
    setTimeout(() => this.darNumeroZapata(), 1000);
    // console.log("HOLAA!");
    this.habilitar = true;
    this.archivo = false;
  }


  getZapata() {
    this.zapatasService.getZapata()
      .subscribe(res => {

        var x = res;
        this.zapatasService.zapata = x["ultimaZapata"] as Zapatas;

        // console.log(".........",res["cantidad"]);
        
        if (res["cantidad"] == 0) {
          document.getElementById('mensaje').style.display = 'block';
          document.getElementById('mensaje').style.color = 'red';
          document.getElementById('mensaje').innerHTML = "No se han cargado los datos iniciales!, cree estos primero para continuar!";
          document.getElementById('zapataAislada').style.display = 'none';
          document.getElementById('pedestal').style.display = 'none';
          (<HTMLInputElement> document.getElementById("zapataAislada")).disabled = true;
          (<HTMLInputElement> document.getElementById("pedestal")).disabled = true;
        }
        else
        {
          document.getElementById('zapataAislada').style.display = 'block';
          document.getElementById('pedestal').style.display = 'block';
          (<HTMLInputElement> document.getElementById("zapataAislada")).disabled = false;
          (<HTMLInputElement> document.getElementById("pedestal")).disabled = false;
          document.getElementById('mensaje').style.display = 'none';
          var lista: Zapatas = this.zapatasService.zapata;
          this.pesoSuelo = lista.pesoSuelo;
          this.pesoConcreto = lista.pesoConcreto;
          this.diametroAcero = lista.diametroAcero;
          this.pesoZapata = lista.pesoZapata;
          this.cargaViva = lista.cargaViva;
          this.cargaMuerta = lista.cargaMuerta;
          this.cargaAdmisibleSuelo = lista.cargaAdmisibleSuelo;
          this.factorMayoracion = lista.factorMayoracion;
          this.factorMayoracionUsuario = lista.factorMayoracionUsuario;
        }
        // ////console.log("Zapata ultima:",this.zapatasService.zapata[0].cargaMuerta)
        // this.dato1 = lista.cargaMuerta;
      });
  }



  util = require('util')
  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    this.Upload();
  }

  Upload() {

    (<HTMLInputElement>document.getElementById("cargas")).value = "";

    this.archivo = true;

    // var Table = document.getElementById("Table");
    // Table.innerHTML = "";
    this.habilitar = true;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      var datos = XLSX.utils.sheet_to_json(worksheet);

      var excel = new Excel();

      var base = new Array();
      var fx = new Array();
      var fy = new Array();
      var fz = new Array();
      var mx = new Array();
      var my = new Array();
      var mz = new Array();

      //   array.push(datos);

      //   for(var i=0; i<array.length; i++) {
      //     //console.log("Datos del array:",array[i]); // elemento actual
      // }

      // //console.log("Array posicion 37", array[0]);

      // //console.log(datos);
      // //console.log("Hay: " + datos.length);
      // //console.log("Leyendo datos!");

      var DatosJson = JSON.parse(JSON.stringify(datos));


      // //console.log("Se muestra otro.." + DatosJson.length);

      document.getElementById('div1').style.display = 'block';


      // $("#Table").append('<thead>' +
      //   '<tr>' +
      //   '<th scope="col">#</th>' +
      //   '<th scope="col">FX</th>' +
      //   '<th scope="col">FY</th>' +
      //   '<th scope="col">FZ</th>' +
      //   '<th scope="col">MX</th>' +
      //   '<th scope="col">MY</th>' +
      //   '<th scope="col">MZ</th>' +
      //   '</tr>' +
      //   '</thead>');
      for (i = 0; i < datos.length; i++) {

        // $("#Table").append('<tbody>' +
        //   '<tr>' +
        //   '<th scope="row">' + i + '</th>' +
        //   '<td>' + DatosJson[i].FX + '</td>' +
        //   '<td>' + DatosJson[i].FY + '</td>' +
        //   '<td>' + DatosJson[i].FZ + '</td>' +
        //   '<td>' + DatosJson[i].MX + '</td>' +
        //   '<td>' + DatosJson[i].MY + '</td>' +
        //   '<td>' + DatosJson[i].MZ + '</td>' +
        //   '</tr>');
        base.push(DatosJson[i].BASE);
        fx.push(DatosJson[i].FX);
        fy.push(DatosJson[i].FY);
        fz.push(DatosJson[i].FZ);
        mx.push(DatosJson[i].MX);
        my.push(DatosJson[i].MY);
        mz.push(DatosJson[i].MZ);

        this.base = base;
        this.fx = fx;
        this.fy = fy;
        this.fz = fz;
        this.mx = mx;
        this.my = my;
        this.mz = mz;
      }

      this.habilitar = false;

      // this.zapatasService.postExcel(excel)
      //   .subscribe(res => {
      //     // //console.log("Se agrego correctamente!");
      //      //console.log("Aqui se esta enviando el res:", res);

      //   });


    }
    fileReader.readAsArrayBuffer(this.file);
    swal("Datos etabs!", "Se han guardado correctamente los datos de etabs!", "success");
    // this.router.navigate(['/zapatas']);
  }

  guardarDatosIrZapata() {

    //Primero se cargan los datos de excel

    var excel = new Excel();

    excel.base = this.base;
    excel.fx = this.fx;
    excel.fy = this.fy;
    excel.fz = this.fz;
    excel.mx = this.mx;
    excel.my = this.my;
    excel.mz = this.mz;
    excel.irPedestal = false;

    this.zapatasService.postExcel(excel)
      .subscribe(res => {
        // //console.log("Se agrego correctamente!");
        //console.log("Aqui se esta enviando el res:", res);

      });


    //Despues se guardan los datos para el numeroEtabs que se comparara en zapatas!
    var numeroEtabs = new NumeroEtabs();
    numeroEtabs.numeroEtabs = -1;
    numeroEtabs.irPedestal = false;

    this.zapatasService.guardarNumeroEtabs(numeroEtabs)
      .subscribe(res => {
        // //console.log("Se agrego correctamente!");
        //console.log("Aqui se esta enviando el res:", res);

      });
  }

  guardarDatosIrPedestal() {
    var excel = new Excel();

    // //console.log("El fx es", this.fx);
    // //console.log("El fy es", this.fy);
    // //console.log("El fz es", this.fz);

    excel.base = this.base;
    excel.fx = this.fx;
    excel.fy = this.fy;
    excel.fz = this.fz;
    excel.mx = this.mx;
    excel.my = this.my;
    excel.mz = this.mz;
    excel.irPedestal = true;

    this.zapatasService.postExcel(excel)
      .subscribe(res => {
        // //console.log("Se agrego correctamente!");
        //console.log("Aqui se esta enviando el res:", res);

      });

    //Despues se guardan los datos para el numeroEtabs que se comparara en zapatas o pedestal
    var numeroEtabs = new NumeroEtabs();
    numeroEtabs.numeroEtabs = -2;
    numeroEtabs.irPedestal = true;

    this.zapatasService.guardarNumeroEtabs(numeroEtabs)
      .subscribe(res => {
        // //console.log("Se agrego correctamente!");
        //console.log("Aqui se esta enviando el res:", res);

      });

  }

  darCargas() {
    this.zapatasService.getCargas()
      .subscribe(res => {
        var x = res;
        this.zapatasService.cargas = x["ultimaCarga"] as Excel;
        this.numeroCargas = x["listaCargas"];

        if (this.numeroCargas.length != 0) {

          var lista: Excel = this.zapatasService.cargas;


          this.base = lista.base;
          this.fx = lista.fx;
          this.fy = lista.fy;
          this.fz = lista.fz;
          this.mx = lista.mx;
          this.my = lista.my;
          this.mz = lista.mz;
        }

        // this.zapatasService.cargas = res as Excel;

      });
  }

  seleccionarCarga() {

    this.habilitar = true;

    this.archivo = false;

    document.getElementById('div1').style.display = 'block';

    this.numeroCarga = parseInt((<HTMLInputElement>document.getElementById("cargas")).value);

    // alert("Se envia " + this.numeroCarga);

    var excel = new Excel();

    excel.numeroCarga = this.numeroCarga;

    this.zapatasService.postSeleccionarCarga(excel)
      .subscribe(res => {

        this.zapatasService.cargas = res as Excel;

        var lista: Excel = this.zapatasService.cargas;

        // this.base = lista.fx;
        this.fx = lista.fx;
        this.fy = lista.fy;
        this.fz = lista.fz;
        this.mx = lista.mx;
        this.my = lista.my;
        this.mz = lista.mz;

      });

    this.habilitar = false;

    // $('body,html').animate({
    //   scrollTop: '500px'

    // }, 1000);
  }

  irZapata() {
    this.numeroCarga = parseInt((<HTMLInputElement>document.getElementById("cargas")).value);

    //console.log("Numero carga: " + this.numeroCarga);

    //console.log(isNaN(this.numeroCarga));

    //console.log("Archivo: " + this.archivo);

    //Dato nuevo this.archivo
    //NumeroEtabs = -1
    if (isNaN(this.numeroCarga) && this.archivo == true) {
      this.guardarDatosIrZapata();
      // var opcion = confirm("Los datos se han guardado correctamente, ¿desea continuar?");
      // if (opcion == true) {
        this.router.navigate(['/zapatas']);
      // }
    }
    //Dato de lista
    else if (!isNaN(this.numeroCarga) && this.archivo == false) {
      var numeroEtabs = new NumeroEtabs();
      numeroEtabs.numeroEtabs = this.numeroCarga;
      numeroEtabs.irPedestal = false;

      this.zapatasService.guardarNumeroEtabs(numeroEtabs)
        .subscribe(res => {
          // //console.log("Se agrego correctamente!");
          //console.log("Aqui se esta enviando el res:", res);

        });
      this.router.navigate(['/zapatas']);
    }
    else {
      //console.log("No hace nada!");
    }

  }

  irPedestal() {

    this.numeroCarga = parseInt((<HTMLInputElement>document.getElementById("cargas")).value);

    //console.log("Numero carga: " + this.numeroCarga);

    //console.log(isNaN(this.numeroCarga));

    //console.log("Archivo: " + this.archivo);

    //Dato nuevo this.archivo
    //Numeroetabs = -1 se busca el ultimo
    if (isNaN(this.numeroCarga) && this.archivo == true) {
      this.guardarDatosIrPedestal();
      this.router.navigate(['/pedestal']);
    }
    //Dato ya de lista
    else if (!isNaN(this.numeroCarga) && this.archivo == false) {
      var numeroEtabs = new NumeroEtabs();
      numeroEtabs.numeroEtabs = this.numeroCarga;
      numeroEtabs.irPedestal = true;

      this.zapatasService.guardarNumeroEtabs(numeroEtabs)
        .subscribe(res => {
          // //console.log("Se agrego correctamente!");
          //console.log("Aqui se esta enviando el res:", res);

        });
      this.router.navigate(['/pedestal']);
    }
    else {
      //console.log("No hace nada!");
    }
  }

  darNumeroZapata() {
    // console.log("Esta en numeroZapata");
    this.zapatasService.getNumeroZapata()
      .subscribe(res => {

        var x = res;

        if (x == null) {
          // console.log("X es igual a null!");
        }
        else if(x == -1)
        {
          // console.log("X es igual a -1");
          this.getZapata();
        }
        else {
          // console.log("X NO es igual a null!");
          this.zapatasService.numeroZapata = x as NumeroZapata;

        var lista: NumeroZapata = this.zapatasService.numeroZapata;

        this.numeroZapata = lista.numeroZapata;

        if(this.numeroZapata == -1)
        {
          // console.log("X es igual a -1");
          this.getZapata();
        }

        // console.log("Numero zapataaaa----- " + this.numeroZapata);
        }

        
      });

    // //console.log("Numero Etabs: ----" + this.numeroEtabs)
    // alert(this.numeroEtabs);
  }

  constructor(public zapatasService: ZapatasService, private router: Router, private excelService: ExcelServicesService, private http: HttpClient) {
  }
}  