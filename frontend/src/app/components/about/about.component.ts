import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ZapatasService } from '../../services/zapatas.service';
import { Zapatas } from '../../models/zapatas';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { NumeroZapata } from '../../models/numeroZapata';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ZapatasService]
})
export class AboutComponent implements OnInit {

  pesoSuelo: number;
  pesoConcreto: number;
  diametroAcero: number;
  pesoZapata: number;
  cargaViva: number;
  cargaMuerta: number;
  cargaAdmisibleSuelo: number;
  factorMayoracion: number;
  factorMayoracionUsuario: number;
  numeroZapatas: Array<number>;
  numeroZapata: number;


  valorInicialPesoSuelo;
  valorInicialPesoConcreto;
  valorInicialdiametroAcero;
  valorInicialPesoZapata;
  valorInicialCargaViva;
  valorInicialCargaMuerta;
  valorInicialCargaAdmisibleSuelo;
  valorInicialFactorMayoracion;
  valorInicialFactorMayoracionUsuario;





  constructor(public zapatasService: ZapatasService, private router: Router, private modalService: NgbModal) {

  }

  enviar = function (modal) {
    this.modalService.open(modal);
  }


  ngOnInit() {
    this.getZapatas();
    this.getZapata();

    // this.pesoSuelo = 0;

    this.zapatasService.selectedZapata.pesoSuelo = this.pesoSuelo;
    this.zapatasService.selectedZapata.pesoConcreto = this.pesoConcreto;
    this.zapatasService.selectedZapata.diametroAcero = this.diametroAcero;
    this.zapatasService.selectedZapata.pesoZapata = this.pesoZapata;
    this.zapatasService.selectedZapata.cargaViva = this.cargaViva;
    this.zapatasService.selectedZapata.cargaMuerta = this.cargaMuerta;
    this.zapatasService.selectedZapata.cargaAdmisibleSuelo = this.cargaAdmisibleSuelo;
    this.zapatasService.selectedZapata.factorMayoracion = this.factorMayoracion;
    this.zapatasService.selectedZapata.factorMayoracionUsuario = this.factorMayoracionUsuario;

    this.valorInicialPesoSuelo = $("#pesoSuelo").val();
    this.valorInicialPesoConcreto = $("#pesoConcreto").val();
    this.valorInicialdiametroAcero = $("#diametroAcero").val();
    this.valorInicialPesoZapata = $("#pesoZapata").val();
    this.valorInicialCargaViva = $("#cargaViva").val();
    this.valorInicialCargaMuerta = $("#cargaMuerta").val();
    this.valorInicialCargaAdmisibleSuelo = $("#cargaAdmisibleSuelo").val();
    this.valorInicialFactorMayoracion = $("#factorMayoracion").val();
    this.valorInicialFactorMayoracionUsuario = $("#factorMayoracionUsuario").val();
  }

  title = 'Diseño de zapatas aisladas';

  inputBarra() {
    // console.log("Barra");
    var barras = parseFloat((<HTMLInputElement>document.getElementById("barras")).value);
    this.zapatasService.selectedZapata.diametroAcero = barras;
    $("#zapatas").val([]);
  }


  inputCambian() {
    // if ($("#pesoSuelo").val() != this.valorInicialPesoSuelo || $("#pesoConcreto").val() != this.valorInicialPesoConcreto
    //   || $("#diametroAcero").val() != this.valorInicialdiametroAcero || $("#pesoZapata").val() != this.valorInicialPesoZapata
    //   || $("#cargaViva").val() != this.valorInicialCargaViva || $("#cargaMuerta").val() != this.valorInicialCargaMuerta
    //   || $("#cargaAdmisibleSuelo").val() != this.valorInicialCargaAdmisibleSuelo
    //   || $("#factorMayoracion").val() != this.valorInicialFactorMayoracion
    //   || $("#factorMayoracionUsuario").val() != this.valorInicialFactorMayoracionUsuario) {
    //   console.log("Cambio algo..");
    // console.log("CAMBIO!!!");
    $("#zapatas").val([]);

    // }
  }


  seleccionarZapata() {

    this.numeroZapata = parseInt((<HTMLInputElement>document.getElementById("zapatas")).value);

    // alert("Se envia " + numeroCarga);

    var zapatas = new Zapatas();

    zapatas.numeroZapata = this.numeroZapata;

    this.zapatasService.postSeleccionarZapata(zapatas)
      .subscribe(res => {

        this.zapatasService.zapata = res as Zapatas;

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

        this.zapatasService.selectedZapata.pesoSuelo = this.pesoSuelo;
        this.zapatasService.selectedZapata.pesoConcreto = this.pesoConcreto;
        this.zapatasService.selectedZapata.diametroAcero = this.diametroAcero;
        this.zapatasService.selectedZapata.pesoZapata = this.pesoZapata;
        this.zapatasService.selectedZapata.cargaViva = this.cargaViva;
        this.zapatasService.selectedZapata.cargaMuerta = this.cargaMuerta;
        this.zapatasService.selectedZapata.cargaAdmisibleSuelo = this.cargaAdmisibleSuelo;
        this.zapatasService.selectedZapata.factorMayoracion = this.factorMayoracion;
        this.zapatasService.selectedZapata.factorMayoracionUsuario = this.factorMayoracionUsuario;


        // console.log(this.pesoSuelo);
        // console.log(this.pesoConcreto);
        // console.log(this.diametroAcero);
        // console.log(this.pesoZapata);
        // console.log(this.cargaViva);
        // console.log(this.cargaMuerta);
        // console.log(this.pesoSuelo);
        // console.log(this.cargaAdmisibleSuelo);
        // console.log(this.factorMayoracion);
        // console.log(this.factorMayoracionUsuario);

        var DropdownList = (document.getElementById("barras")) as HTMLSelectElement;
        var SelectedIndex = DropdownList.selectedIndex; // no error

        //console.log("Opciones: " + DropdownList.length);

        for (var i = 1; i < DropdownList.length; i++) {
          if (DropdownList.options[i].value == this.diametroAcero.toString()) {
            // seleccionamos el valor que coincide
            // //console.log("Entro al 1");
            DropdownList.selectedIndex = i;
          }
          else {
            //console.log("Entro al 2");
            DropdownList.selectedIndex = i;
            break;
          }
        }

        //console.log("SELECTED INDEX: " + SelectedIndex);

        // $("#barras").val(""+this.diametroAcero+"");

      });


  }

  getZapatas() {
    this.zapatasService.getZapata()
      .subscribe(res => {
        this.zapatasService.zapata = res as Zapatas;
        var lista: Zapatas = this.zapatasService.zapata;
        // console.log("GetZapata ultima about:", res);
      });
  }

  getZapata() {
    this.zapatasService.getZapata()
      .subscribe(res => {

        var x = res;
        this.zapatasService.zapata = x["ultimaZapata"] as Zapatas;
        this.numeroZapatas = x["listaZapatas"];

        if (this.numeroZapatas.length == 0) {
          //  $("#zapatas").append()
          $('#zapatas').append('<option value="-1" selected="selected">NO HAY ZAPATAS CREADAS!</option>');
        }
        else {
          $("#zapatas option[value='-1']").remove();
        }

        var lista: Zapatas = this.zapatasService.zapata;
        //console.log("GetZapata ultima:", res);
        // //console.log("Zapata ultima:",this.zapatasService.zapata[0].cargaMuerta)
        // this.dato1 = lista.cargaMuerta;
        // this.pesoSuelo = lista.pesoSuelo;
        // this.pesoConcreto = lista.pesoConcreto;
        // this.diametroAcero = lista.diametroAcero;
        // this.pesoZapata = lista.pesoZapata;
        // this.cargaViva = lista.cargaViva;
        // this.cargaMuerta = lista.cargaMuerta;
        // this.cargaAdmisibleSuelo = lista.cargaAdmisibleSuelo;
        // this.factorMayoracion = lista.factorMayoracion;
        // this.factorMayoracionUsuario = lista.factorMayoracionUsuario;
      });
  }


  add(form?: NgForm) {
    event.preventDefault();

    // this.numeroZapata = parseInt((<HTMLInputElement>document.getElementById("zapatas")).value);

    // console.log("Numero zapata: " + this.numeroZapata);

    // console.log(isNaN(this.numeroZapata));

    // console.log(form.value);

    // if (isNaN(this.numeroZapata)) {
    //   //Quiere decir que hay un nuevo dato que se guardara al final del arreglo!

    //   alert("El dato es nuevo!!");

    this.zapatasService.postZapatas(form.value)
      .subscribe(res => {
        this.getZapatas();
        console.log("Se agrego correctamente!");
        // console.log("Aqui se esta enviando el res:",res);
        swal("Datos guardados!", "Se han guardado los datos principales!", "success");
      });


    var numeroZapata = new NumeroZapata();
    numeroZapata.numeroZapata = -1;

    this.zapatasService.guardarNumeroZapata(numeroZapata)
      .subscribe(res => {
        // console.log("Se agrego correctamente!");
        console.log("Aqui se esta enviando el res:", res);

      });

    var opcion = confirm("Los datos se han guardado correctamente, ¿desea continuar?");
    if (opcion == true) {
      this.router.navigate(['/home']);
    }
    // }
    // else {

    //   var numeroZapata = new NumeroZapata();
    //   numeroZapata.numeroZapata = this.numeroZapata;

    //   this.zapatasService.guardarNumeroZapata(numeroZapata)
    //     .subscribe(res => {
    //       // console.log("Se agrego correctamente!");
    //       console.log("Aqui se esta enviando el res:", res);

    //     });

    //   var opcion = confirm("No se guarda, solo se selecciona!");
    //   if (opcion == true) {
    //     this.router.navigate(['/home']);
    //   }

    // }

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      // this.zapatasService.selectedZapata = new Zapatas();
      // this.rvOffices();
    }
  }




}
