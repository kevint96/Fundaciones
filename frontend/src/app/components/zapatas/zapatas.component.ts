import { Component, OnInit, ViewChild, ElementRef, Input, NgModule } from '@angular/core';
import { Excel } from '../../models/excel';
import { ZapatasService } from '../../services/zapatas.service';
import { Zapatas } from '../../models/zapatas';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import * as $ from 'jquery';
import { Bases } from '../../models/bases';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'node_modules/html2canvas';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgForm } from '@angular/forms';
// import * as jsPDF from 'jspdf';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import 'jspdf-autotable';
import { NumeroEtabs } from 'src/app/models/numeroEtabs';
import { NumeroZapata } from 'src/app/models/numeroZapata';
import { Resultados } from 'src/app/models/resultados';

map: { "jspdf"; "../node_modules/jspdf/dist/jspdf.min.js" }
map: { "jspdfTable"; "../node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js" }
map: { "html2canvas"; "../node_modules/html2canvas/dist/html2canvas.min.js" }


const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-zapatas',
  templateUrl: './zapatas.component.html',
  styleUrls: ['./zapatas.component.css'],
  providers: [ZapatasService]
})
@NgModule({
  imports: [
    CommonModule,
    FormsModule      //<----------make sure you have added this.
  ],
})
export class ZapatasComponent implements OnInit {



  @ViewChild('micanvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  base: Array<number>;
  fx: Array<number>;
  fy: Array<number>;
  fz: Array<number>;
  mx: Array<number>;
  my: Array<number>;
  mz: Array<number>;

  bx: Array<number>;
  by: Array<number>;
  e: Array<number>;
  cx: Array<number>;
  cy: Array<number>;
  h: Array<number>;

  listaExcel: Array<number>;

  //Listas de datos de respuestas

  listaPesoZapata: Array<number>;
  listaPesoPedestal: Array<number>;
  listaPesoSuelo: Array<number>;
  listaCargaVertical: Array<number>;
  listaMomentoActuanteMX: Array<number>;
  listaMomentoActuanteMY: Array<number>;
  A: Array<number>;
  Ly: Array<number>;
  Lx: Array<number>;
  QMax: Array<number>;
  QMin: Array<number>;
  Mdx: Array<number>;
  Mdy: Array<number>;
  Ax: Array<number>;
  Ay: Array<number>;
  Asx: Array<number>;
  Asy: Array<number>;
  Vx: Array<number>;
  Vy: Array<number>;
  Vc: Array<number>;
  Vpuz: Array<number>;
  Vcon: Array<number>;
  Bx: Array<number>;
  By: Array<number>;
  Cx: Array<number>;
  Cy: Array<number>;
  E: Array<number>;
  H: Array<number>;

  pesoSuelo: number;
  pesoConcreto: number;
  diametroAcero: number;
  pesoZapata: number;
  cargaViva: number;
  cargaMuerta: number;
  cargaAdmisibleSuelo: number;
  factorMayoracion: number;
  factorMayoracionUsuario: number;
  condicionCargaAdmisible: boolean;
  condicionCorte: boolean;
  condicionPunzonado: boolean;
  hayLetras: boolean;
  numeroCargas: Array<number>;
  numeroZapatas: Array<number>;
  numeroEtabs: number;
  numeroZapata: number;


  imagen1 = "../../../assets/zapataPedestal.jpg";

  constructor(public zapatasService: ZapatasService, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.darNumeroEtabs();
    this.darNumeroZapata();
    // this.getZapata();
    setTimeout(() => this.darNumeroEtabs(), 1000);
    setTimeout(() => this.darNumeroZapata(), 20);

    swal("Datos etabs!", "Se han guardado correctamente los datos de etabs!", "success");
  }

  animate2(): void {

    // alert("El numero es " + m);


    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    var m = (<HTMLInputElement>document.getElementById("select")).value;

    var canvas = document.getElementById("micanvas");
    var ctx = this.canvas.nativeElement.getContext("2d");
    // ctx.font = "20px Arial";
    // ctx.fillText("Hello World!", 10, 50);

    ctx.font = "30px Verdana";
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, this.canvas.nativeElement.width, 0);
    gradient.addColorStop(0, " magenta");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1.0, "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    // ctx.fillText("Big smile!", 10, 90);

    //------------------------------------------

    var img = new Image();
    img.src = this.imagen1;

    ctx.textAlign = 'center';

    img.onload = function () {
      var canvas = <HTMLCanvasElement>document.getElementById("micanvas");
      ctx.drawImage(img, canvas.width / 2 - img.width / 2, 20);
    }

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Bx= " + this.Bx[m], 300, this.canvas.nativeElement.height - 240);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("By= " + this.By[m], 300, this.canvas.nativeElement.height - 220);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cx= " + this.Cx[m], 300, this.canvas.nativeElement.height - 200);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cy= " + this.Cy[m], 300, this.canvas.nativeElement.height - 180);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ax= " + Math.round(this.Ax[m] * 100) / 100, 500, this.canvas.nativeElement.height - 240);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ay= " + Math.round(this.Ay[m] * 100) / 100, 500, this.canvas.nativeElement.height - 220);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asx= " + Math.round(this.Asx[m] * 100) / 100, 500, this.canvas.nativeElement.height - 200);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asy= " + Math.round(this.Asy[m] * 100) / 100, 500, this.canvas.nativeElement.height - 180);

    //------------------------------------------

    // ctx.textAlign = 'center';
    // ctx.font = "oblique bold 120% cursive";
    // ctx.fillText("P= " + this.listaCargaVertical[m], this.canvas.nativeElement.width / 2, 40);

    // ctx.textAlign = 'center';
    // ctx.font = "oblique bold 120% cursive";
    // ctx.fillText("MX= " + this.listaMomentoActuanteMX[m], this.canvas.nativeElement.width / 2, 60);

    // ctx.textAlign = 'center';
    // ctx.font = "oblique bold 120% cursive";
    // ctx.fillText("MY= " + this.listaMomentoActuanteMY[m], this.canvas.nativeElement.width / 2, 80);

    // ctx.textAlign = 'center';
    // ctx.font = "oblique bold 120% cursive";
    // ctx.fillText("Pedestal=" + this.Cx[m] + "*" + this.Cy[m], this.canvas.nativeElement.width / 2 + 186, 220);


    // var img = new Image();
    // img.src = this.imagen1;

    // ctx.textAlign = 'center';

    // img.onload = function () {
    //   var canvas = <HTMLCanvasElement>document.getElementById("micanvas");
    //   ctx.drawImage(img, canvas.width / 2 - img.width / 2, 88);
    // }
    // ctx.textAlign = 'center';
    // ctx.font = "oblique bold 120% cursive";
    // ctx.fillText("BX= " + this.Bx[m], this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height - 85);

    // ctx.textAlign = 'center';
    // ctx.font = "oblique bold 120% cursive";
    // ctx.fillText("BY= " + this.By[m], this.canvas.nativeElement.width / 2 + 142, this.canvas.nativeElement.height - 175);

    var num = parseInt(m) + 1;
    document.getElementById('numeroZapata').innerHTML = "Zapata #" + num;
    // document.getElementById('numeroZapata').style.display = 'block';

    document.getElementById('labelPesoZapata').innerHTML = this.Redondeo(this.listaPesoZapata[m].toString(),2).toString();
    document.getElementById('labelPesoPedestal').innerHTML = this.Redondeo(this.listaPesoPedestal[m].toString(),2).toString();
    document.getElementById('labelPesoSuelo').innerHTML = this.Redondeo(this.listaPesoSuelo[m].toString(),2).toString();
    document.getElementById('labelCargaVertical').innerHTML = this.Redondeo(this.listaCargaVertical[m].toString(),2).toString();

    document.getElementById('labelMomentoMX').innerHTML = this.Redondeo(this.listaMomentoActuanteMX[m].toString(),2).toString();
    document.getElementById('labelMomentoMY').innerHTML = this.Redondeo(this.listaMomentoActuanteMY[m].toString(),2).toString();
    document.getElementById('labelPropiedadA').innerHTML = this.Redondeo(this.A[m].toString(),2).toString();
    document.getElementById('labelPropiedadIX').innerHTML = this.Redondeo(this.Lx[m].toString(),2).toString();

    document.getElementById('labelPropiedadIY').innerHTML = this.Redondeo(this.Ly[m].toString(),2).toString();
    document.getElementById('labelEsfuerzoQMax').innerHTML = this.Redondeo(this.QMax[m].toString(),2).toString();
    document.getElementById('labelEsfuerzoQMin').innerHTML = this.Redondeo(this.QMin[m].toString(),2).toString();
    document.getElementById('labelDiseñoMdx').innerHTML = this.Redondeo(this.Mdx[m].toString(),2).toString();

    document.getElementById('labelDiseñoMdy').innerHTML = this.Redondeo(this.Mdy[m].toString(),2).toString();
    document.getElementById('labelAreaAx').innerHTML = this.Redondeo(this.Ax[m].toString(),2).toString();
    document.getElementById('labelAreaAy').innerHTML = this.Redondeo(this.Ay[m].toString(),2).toString();
    document.getElementById('labelSepAsx').innerHTML = this.Redondeo(this.Asx[m].toString(),2).toString();

    document.getElementById('labelSepAsy').innerHTML = this.Redondeo(this.Asy[m].toString(),2).toString();
    document.getElementById('labelDiseñoVx').innerHTML = this.Redondeo(this.Vx[m].toString(),2).toString();
    document.getElementById('labelDiseñoVy').innerHTML = this.Redondeo(this.Vy[m].toString(),2).toString();
    document.getElementById('labelDiseñoVc').innerHTML = this.Redondeo(this.Vc[m].toString(),2).toString();
    document.getElementById('labelPunzonadoVpnz').innerHTML = this.Redondeo(this.Vpuz[m].toString(),2).toString();
    document.getElementById('labelPunzonadoVconc').innerHTML = this.Redondeo(this.Vcon[m].toString(),2).toString();



  }

  animate(): void {

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    var m = (<HTMLInputElement>document.getElementById("select")).value;

    // $("#select option[value=0]").attr('selected', 'selected');

    var canvas = document.getElementById("micanvas");
    var ctx = this.canvas.nativeElement.getContext("2d");
    // ctx.font = "20px Arial";
    // ctx.fillText("Hello World!", 10, 50);

    ctx.font = "30px Verdana";
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, this.canvas.nativeElement.width, 0);
    gradient.addColorStop(0, " magenta");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1.0, "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    // ctx.fillText("Big smile!", 10, 90);

    //------------------------------------------

    var img = new Image();
    img.src = this.imagen1;

    ctx.textAlign = 'center';

    img.onload = function () {
      var canvas = <HTMLCanvasElement>document.getElementById("micanvas");
      ctx.drawImage(img, canvas.width / 2 - img.width / 2, 20);
    }

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Bx= " + this.Bx[0], 300, this.canvas.nativeElement.height - 240);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("By= " + this.By[0], 300, this.canvas.nativeElement.height - 220);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cx= " + this.Cx[0], 300, this.canvas.nativeElement.height - 200);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cy= " + this.Cy[0], 300, this.canvas.nativeElement.height - 180);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ax= " + Math.round(this.Ax[0] * 100) / 100, 500, this.canvas.nativeElement.height - 240);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ay= " + Math.round(this.Ay[0] * 100) / 100, 500, this.canvas.nativeElement.height - 220);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asx= " + Math.round(this.Asx[0] * 100) / 100, 500, this.canvas.nativeElement.height - 200);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asy= " + Math.round(this.Asy[0] * 100) / 100, 500, this.canvas.nativeElement.height - 180);


    document.getElementById('numeroZapata').innerHTML = "Zapata #1";
    // document.getElementById('numeroZapata').style.display = 'block';

    document.getElementById('labelPesoZapata').innerHTML = this.Redondeo(this.listaPesoZapata[0].toString(),2).toString();
    document.getElementById('labelPesoPedestal').innerHTML = this.Redondeo(this.listaPesoPedestal[0].toString(),2).toString();
    document.getElementById('labelPesoSuelo').innerHTML = this.Redondeo(this.listaPesoSuelo[0].toString(),2).toString();
    document.getElementById('labelCargaVertical').innerHTML = this.Redondeo(this.listaCargaVertical[0].toString(),2).toString();

    document.getElementById('labelMomentoMX').innerHTML = this.Redondeo(this.listaMomentoActuanteMX[0].toString(),2).toString();
    document.getElementById('labelMomentoMY').innerHTML = this.Redondeo(this.listaMomentoActuanteMY[0].toString(),2).toString();
    document.getElementById('labelPropiedadA').innerHTML = this.Redondeo(this.A[0].toString(),2).toString();
    document.getElementById('labelPropiedadIX').innerHTML = this.Redondeo(this.Lx[0].toString(),2).toString();

    document.getElementById('labelPropiedadIY').innerHTML = this.Redondeo(this.Ly[0].toString(),2).toString();
    document.getElementById('labelEsfuerzoQMax').innerHTML = this.Redondeo(this.QMax[0].toString(),2).toString();
    document.getElementById('labelEsfuerzoQMin').innerHTML = this.Redondeo(this.QMin[0].toString(),2).toString();
    document.getElementById('labelDiseñoMdx').innerHTML = this.Redondeo(this.Mdx[0].toString(),2).toString();

    document.getElementById('labelDiseñoMdy').innerHTML = this.Redondeo(this.Mdy[0].toString(),2).toString();
    document.getElementById('labelAreaAx').innerHTML = this.Redondeo(this.Ax[0].toString(),2).toString();
    document.getElementById('labelAreaAy').innerHTML = this.Redondeo(this.Ay[0].toString(),2).toString();
    document.getElementById('labelSepAsx').innerHTML = this.Redondeo(this.Asx[0].toString(),2).toString();

    document.getElementById('labelSepAsy').innerHTML = this.Redondeo(this.Asy[0].toString(),2).toString();
    document.getElementById('labelDiseñoVx').innerHTML = this.Redondeo(this.Vx[0].toString(),2).toString();
    document.getElementById('labelDiseñoVy').innerHTML = this.Redondeo(this.Vy[0].toString(),2).toString();
    document.getElementById('labelDiseñoVc').innerHTML = this.Redondeo(this.Vc[0].toString(),2).toString();
    document.getElementById('labelPunzonadoVpnz').innerHTML = this.Redondeo(this.Vpuz[0].toString(),2).toString();
    document.getElementById('labelPunzonadoVconc').innerHTML = this.Redondeo(this.Vcon[0].toString(),2).toString();


  }

  move(y: number, z: number) {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.fillRect(z * x, z * y, z, z);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 200);
  }


  getZapata() {
    this.zapatasService.getZapata()
      .subscribe(res => {

        var x = res;
        this.zapatasService.zapata = x["ultimaZapata"] as Zapatas;
        this.numeroZapatas = x["listaZapatas"];

        var lista: Zapatas = this.zapatasService.zapata;
        //////console.log("GetZapata ultima:", res);
        // //////console.log("Zapata ultima:",this.zapatasService.zapata[0].cargaMuerta)
        // this.dato1 = lista.cargaMuerta;
        this.pesoSuelo = lista.pesoSuelo;
        this.pesoConcreto = lista.pesoConcreto;
        this.diametroAcero = lista.diametroAcero;
        this.pesoZapata = lista.pesoZapata;
        this.cargaViva = lista.cargaViva;
        this.cargaMuerta = lista.cargaMuerta;
        this.cargaAdmisibleSuelo = lista.cargaAdmisibleSuelo;
        this.factorMayoracion = lista.factorMayoracion;
        this.factorMayoracionUsuario = lista.factorMayoracionUsuario;
      });
  }

  advertenciaCargaAdmisible() {
    this.condicionCargaAdmisible = false;
    for (let i = 0; i < this.QMax.length; i++) {
      if (this.QMax[i] > this.cargaAdmisibleSuelo) {
        this.condicionCargaAdmisible = true;
        // alert("Error en el esfuerzo actuante en la posición " + i + " El QMAX " + this.QMax[i] + " No puede ser mayor a la carga admisible " + this.cargaAdmisibleSuelo)
        // swal("Error en el esfuerzo actuante!", "El esfuerzo actuante Qmax no puede ser mayor a la carga admisible!", "error");
      }
    }
    return this.condicionCargaAdmisible;
  }

  advertenciaDiseñoPorCorte() {
    this.condicionCorte = false;
    for (let i = 0; i < this.Vx.length; i++) {
      if (this.Vx[i] > this.Vc[i]) {
        this.condicionCorte = true;
        // alert("Error en el Diseño por corte en la posición " + i + " El VX " + this.Vx[i] + " No puede ser mayor al Vc " + this.Vc[i]);
        // swal("Error en el Diseño por corte Vx!", "El Vx no puede ser mayor al Vc!", "error");
      }
    }
    return this.condicionCorte;
  }

  advertenciaPunzonado() {
    {
      this.condicionPunzonado = false;
      for (let i = 0; i < this.Vpuz.length; i++) {
        if (this.Vpuz[i] > this.Vcon[i]) {
          this.condicionPunzonado = true;
          // alert("Error en el Punzonado en la posición " + i + " El Vpnz " + this.Vpuz[i] + " No puede ser mayor al Vcon " + this.Vcon[i]);
          // swal("Error en el punzonado Vpnz!", "El Vpuz no puede ser mayor al Vconc!", "error");
        }
      }
      return this.condicionPunzonado;
    }

  }
  comparar() {
    this.advertenciaCargaAdmisible();
    this.advertenciaDiseñoPorCorte();
    this.advertenciaPunzonado();

    if (this.condicionCargaAdmisible) {
      document.getElementById('blanco').style.display = 'none';
      document.getElementById('pedestal').style.display = 'none';
      // document.getElementById('texto').style.display = 'block';

      // swal("Error en el esfuerzo actuante!", "El esfuerzo actuante Qmax no puede ser mayor a la carga admisible!", "error");
      this.toastr.error("Error en el esfuerzo actuante!", "El esfuerzo actuante Qmax no puede ser mayor a la carga admisible!");
      //limpia la pantalla del canvas
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
    if (this.condicionCorte) {
      document.getElementById('blanco').style.display = 'none';
      document.getElementById('pedestal').style.display = 'none';
      // swal("Error en el Diseño por corte Vx!", "El Vx no puede ser mayor al Vc!", "error");
      this.toastr.error("Error en el Diseño por corte Vx!", "El Vx no puede ser mayor al Vc!");
      //limpia la pantalla del canvas
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
    if (this.condicionPunzonado) {
      document.getElementById('blanco').style.display = 'none';
      document.getElementById('pedestal').style.display = 'none';
      // swal("Error en el punzonado Vpnz!", "El Vpuz no puede ser mayor al Vconc!", "error");
      this.toastr.error("Error en el punzonado Vpnz!", "El Vpuz no puede ser mayor al Vconc!");
      //limpia la pantalla del canvas
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }

    if (this.condicionCargaAdmisible == false && this.condicionCorte == false && this.condicionPunzonado == false) {
      swal("Correcto!", "Los datos que ha ingresado se adaptan al diseño!", "success");
      this.toastr.success("Correcto! , los datos que ha ingresado se adaptan al diseño..");

      document.getElementById('blanco').style.display = 'block';
      document.getElementById('pedestal').style.display = 'block';
    }
    
    var coordenadas = $("#diseñar").offset();
    console.log("top",coordenadas.top);
		// $("#diseñar").html("Y: " + coordenadas.top + " X: " + coordenadas.left);
    $('body,html').animate({
      scrollTop: coordenadas.top + 100

    }, 1000);



    this.animate();

    // $("#select option[value=0]").attr('selected', 'selected');



    $('#div3').animate({ scrollRight: 200 }, 150);

  }

  generarPDF() {

    // this.guardarResultados();

    var div = document.querySelector("#blanco");
    // this.imprimirElemento(div);

    var canvass = <HTMLCanvasElement>document.getElementById("micanvas");
    var elemento = document.querySelector("#resultados");

    var m = (<HTMLInputElement>document.getElementById("select")).value;
    //////console.log("Este boton se presionoooooooo!!!");
    html2canvas(document.getElementById('blanco'), {
      allowTaint: true,
      useCORS: false,
      scale: 1
    }).then(function (canvas) {
      var img = canvass.toDataURL("image/png");
      var doc = new jsPDF();

      doc.setFontSize(10)

      doc.addImage(img
        , 'JPEG', 7, 20, 195, 105);
      doc.save('zapatas.pdf');

    });
  }

  prueba() {
    //console.log("prueba");

    var canvass = <HTMLCanvasElement>document.getElementById("micanvas");

    var m = (<HTMLInputElement>document.getElementById("select")).value;

    var elemento = document.querySelector("#resultados");

    const dataUrl = canvass.toDataURL();

    var margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
    };

    var doc = new jsPDF('p', 'pt');

    var num = parseInt(m) + 1;
    var e = document.getElementById('numeroZapata').innerHTML = "Zapata #" + num;

    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();


    var centeredText = function (text, y) {
      var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(textOffset, y, text);
    }

    var header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 255);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      // doc.text("Testing Report", data.settings.margin.left, 50);
      centeredText(e, 50);
    };

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Testing Report", data.settings.margin.left, 50);
    centeredText(e, 50);

    var res = doc.autoTableHtmlToJson(document.getElementById("tab"));
    doc.autoTable(res.columns, res.data, { margin: { top: 80 } });

    doc.setFontSize(14);
      doc.setTextColor(0, 0, 255);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      // doc.text("Testing Report", data.settings.margin.left, 50);
      centeredText("Datos iniciales",70);

    var res2 = doc.autoTableHtmlToJson(document.getElementById("tab2"));

    // var options = {
    //   didDrawPage: header,
    //   margin: {
    //     top: 80
    //   },
    //   startY: doc.previousAutoTable.finalY + 20
    // };

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Testing Report", data.settings.margin.left, 50);
    centeredText("Resultados",doc.previousAutoTable.finalY + 10);

    doc.autoTable(res2.columns, res2.data);

    var res3 = doc.autoTableHtmlToJson(document.getElementById("tab3"));

    // var options2 = {
    //   didDrawPage: header,
    //   margin: {
    //     top: 80
    //   },
    //   startY: doc.previousAutoTable.finalY + 20
    // };

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Testing Report", data.settings.margin.left, 50);
    centeredText("Resultados",doc.previousAutoTable.finalY + 10);

    doc.autoTable(res3.columns, res3.data);

    var res4 = doc.autoTableHtmlToJson(document.getElementById("tab4"));

    // var options3 = {
    //   didDrawPage: header,
    //   margin: {
    //     top: 80
    //   },
    //   startY: doc.previousAutoTable.finalY + 20
    // };

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Testing Report", data.settings.margin.left, 50);
    centeredText("Resultados",doc.previousAutoTable.finalY + 10);

    doc.autoTable(res4.columns, res4.data);

    html2canvas(document.getElementById('blanco'), {
      allowTaint: true,
      useCORS: false,
      scale: 1
    }).then(function (canvas) {
      var img = canvass.toDataURL("image/png");

      doc.setFontSize(10)

      //console.log("w" + width);
      //console.log("h" + height);

      doc.addImage(img
        , 'JPEG', 0, doc.previousAutoTable.finalY + 10);

      //Fecha

      // var d = new Date();
      // var n = d.toString();
      
      // doc.setFontSize(10);
      // doc.setTextColor(100);
      // doc.setFontStyle('normal');
      // centeredText(n,height - 10);

      doc.save("ReporteZapatas.pdf");

    });

  }

  imprimirElemento() {
    var elemento = document.querySelector("#resultados");
    var canvass = <HTMLCanvasElement>document.getElementById("micanvas");
    const dataUrl = canvass.toDataURL();

    let windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<head><title>' + document.title + '</title></head>';
    windowContent += '<body>';
    windowContent += elemento.innerHTML;
    windowContent += '<style type="text/css" media="print">@media print {#nuevo {display:block;} #numeroZapata {display:block;} .table .thead-dark th {color: #fff;background-color: #343a40;border-color: #454d55;} .table-bordered td, .table-bordered th {border: 1px solid cadetblue;}}</style>';
    windowContent += '<br> <img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';

    const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
    // printWin.document.open();
    printWin.document.write(windowContent);

    printWin.document.addEventListener('load', function () {
      printWin.focus();
      printWin.print();
      printWin.document.close();
      printWin.close();
    }, true);

  }

  limpiar() {
    $('#div2 tbody').each(function () {
      $(this).find('tr').each(function (i, e) {
        $(this).find('td').each(function (a, u) {
          // alert("u:" + u.innerText);
          u.innerHTML = "";
        });
      });
    });
  }

  Redondeo(numero, decimales) {
    var flotante = parseFloat(numero);
    var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
    return resultado;
  }


  myFunction() {

    // $("#select option:first").attr('selected','selected');
    $("#select").val('0');

    //limpia la pantalla del canvas
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    document.getElementById('blanco').style.display = 'none';

    var nuevoArray = new Array(5);

    var bases = new Bases();
    var bx = [];
    var by = [];
    var e = [];
    var cx = [];
    var cy = [];
    var h = [];


    for (let index = 0; index < this.fx.length; index++) {
      nuevoArray[index] = new Array(5);
    }

    this.listaExcel = [];
    this.Bx = [];
    this.By = [];
    this.Cx = [];
    this.Cy = [];
    this.E = [];
    this.H = [];
    var hayLetras = false;

    $('#div2 tbody').each(function () {
      $(this).find('tr').each(function (i, e) {
        $(this).find('td').each(function (a, u) {

          var r = u.innerText.replace(",", ".");

          nuevoArray[i][a] = parseFloat(r);

          if (nuevoArray[i][a] == "") {
            // (<HTMLInputElement> document.getElementById("diseñar")).disabled = true;
          }

          //Validar datos numericos
          if (isNaN(parseFloat(r))) {
            // alert("Error! Solo debe ingresar datos numericos!");
            document.getElementById('blanco').style.display = 'none';
            hayLetras = true;
            return;
          }
        });
      });

    });
    // ////console.log(nuevoArray);
    // ////console.log("Arreglo :", nuevoArray[0][0]);
    // ////console.log("Arreglo :", nuevoArray[0][1]);
    // ////console.log("Arreglo :", nuevoArray[0][2]);
    // ////console.log("Arreglo :", nuevoArray[0][3]);
    // ////console.log("Arreglo :", nuevoArray[0][4]);
    // ////console.log("Arreglo :", nuevoArray[0][5]);

    this.listaExcel = nuevoArray;

    //Se leen al reves por columnas

    for (let index = 0; index < this.fx.length; index++) {

      bx.push(this.listaExcel[index][0]);
      this.Bx.push(this.listaExcel[index][0]);
      by.push(this.listaExcel[index][1]);
      this.By.push(this.listaExcel[index][1]);
      e.push(this.listaExcel[index][2]);
      this.E.push(this.listaExcel[index][2]);
      cx.push(this.listaExcel[index][3]);
      this.Cx.push(this.listaExcel[index][3]);
      cy.push(this.listaExcel[index][4]);
      this.Cy.push(this.listaExcel[index][4]);
      h.push(this.listaExcel[index][5]);
      this.H.push(this.listaExcel[index][5]);
    }
    //Se envian los datos al servidor
    bases.bx = bx;
    bases.by = by;
    bases.e = e;
    bases.cx = cx;
    bases.cy = cy;
    bases.h = h;
    bases.numeroEtabs = this.numeroEtabs;
    bases.numeroZapata = this.numeroZapata;
    this.zapatasService.postBases(bases)
      .subscribe(res => {
        //////console.log("Aqui se esta enviando el res:", res);
        var x = res;
        this.listaPesoZapata = x["listaPesoZapata"];
        this.listaPesoPedestal = x["listaPesoPedestal"]
        this.listaPesoSuelo = x["listaPesoSuelo"]
        this.listaCargaVertical = x["listaCargaVertical"]
        this.listaMomentoActuanteMX = x["listaMomentoActuanteMX"]
        this.listaMomentoActuanteMY = x["listaMomentoActuanteMY"]
        this.A = x["A"]
        this.Ly = x["Ly"]
        this.Lx = x["Lx"]
        this.QMax = x["QMax"]
        this.QMin = x["QMin"]
        this.Mdx = x["Mdx"]
        this.Mdy = x["Mdy"]
        this.Ax = x["Ax"]
        this.Ay = x["Ay"]
        this.Asx = x["Asx"]
        this.Asy = x["Asy"]
        this.Vx = x["Vx"]
        this.Vy = x["Vy"]
        this.Vc = x["Vc"]
        this.Vpuz = x["Vpuz"]
        this.Vcon = x["Vcon"]
        this.comparar();
      });

  }

  habilitado() {
    var habilitar: boolean;
    $('#div2 tbody').each(function () {
      $(this).find('tr').each(function (i, e) {
        $(this).find('td').each(function (a, u) {

          if (u.innerText != "") {
            habilitar = false;
          }
          else {
            habilitar = true;
          }
        });
      });
    });
    return habilitar;
  }

  darNumeroZapata() {
    this.zapatasService.getNumeroZapata()
      .subscribe(res => {

        var x = res;

        //console.log("X= " + x);

        if (x == null) {
          //console.log("X es igual a null!");
        }
        else if (x != null) {
          //console.log("X NO es igual a null!");
          this.zapatasService.numeroZapata = x as NumeroZapata;

          var lista: NumeroZapata = this.zapatasService.numeroZapata;

          this.numeroZapata = lista.numeroZapata;

          if (this.numeroZapata == -1) {
            //console.log("X es igual a -1");
            this.getZapata();
          }
          else {
            this.seleccionarZapata();
          }


        }

      });
  }

  guardarResultados() {
    var resultados = new Resultados();

    resultados.pesoSuelo = this.pesoSuelo;
    resultados.pesoConcreto = this.pesoConcreto,
      resultados.diametroAcero = this.diametroAcero,
      resultados.pesoZapata = this.pesoZapata,
      resultados.cargaViva = this.cargaViva,
      resultados.cargaMuerta = this.cargaMuerta,
      resultados.cargaAdmisibleSuelo = this.cargaAdmisibleSuelo,
      resultados.factorMayoracion = this.factorMayoracion,
      resultados.fx = this.fx,
      resultados.fy = this.fy,
      resultados.fz = this.fz,
      resultados.mx = this.mx,
      resultados.my = this.my,
      resultados.mz = this.mz,
      resultados.bx = this.Bx,
      resultados.by = this.By,
      resultados.e = this.E,
      resultados.cx = this.Cx,
      resultados.cy = this.Cy,
      resultados.h = this.H,
      resultados.listaPesoZapata = this.listaPesoZapata,
      resultados.listaPesoPedestal = this.listaPesoPedestal,
      resultados.listaPesoSuelo = this.listaPesoSuelo,
      resultados.listaCargaVertical = this.listaCargaVertical,
      resultados.listaMomentoActuanteMX = this.listaMomentoActuanteMX,
      resultados.listaMomentoActuanteMY = this.listaMomentoActuanteMY,
      resultados.A = this.A,
      resultados.Ly = this.Ly,
      resultados.QMax = this.QMax,
      resultados.QMin = this.QMin,
      resultados.Mdx = this.Mdx,
      resultados.Mdy = this.Mdy,
      resultados.Ax = this.Ax,
      resultados.Ay = this.Ay,
      resultados.Asx = this.Asx,
      resultados.Asy = this.Asy,
      resultados.Vx = this.Vx,
      resultados.Vy = this.Vy,
      resultados.Vc = this.Vc,
      resultados.Vpuz = this.Vpuz,
      resultados.Vcon = this.Vcon;

    // //console.log("MX" + this.listaMomentoActuanteMX);
    // //console.log("MY" + this.listaMomentoActuanteMY);
    // //console.log("QMAX" + this.QMax);
    // //console.log("QMIN" + this.QMin);

    this.zapatasService.postGuardarResultados(resultados)
      .subscribe(res => {
      });

  }


  darNumeroEtabs() {
    this.zapatasService.getNumeroEtabs()
      .subscribe(res => {

        var x = res;
        this.zapatasService.numeroEtabs = x as NumeroEtabs;

        var lista: NumeroEtabs = this.zapatasService.numeroEtabs;

        if (lista.numeroEtabs != null) {
          this.numeroEtabs = lista.numeroEtabs;
          ////console.log("Numero etabsssssssss----- " + this.numeroEtabs);
        }

        if (lista.numeroEtabs == null) {
          this.darNumeroEtabs();
        }

        if (this.numeroEtabs == 0) {
          // setTimeout(() => this.darCargas(), 1000);
          this.seleccionarCarga();
          // this.darCargas();
        }

        else if (this.numeroEtabs == -1) {
          this.darCargas();
          //  setTimeout(() => this.darCargas(), 200);
        }
        else {
          this.seleccionarCarga();
        }
      });

    // ////console.log("Numero Etabs: ----" + this.numeroEtabs)
    // alert(this.numeroEtabs);
  }

  seleccionarCarga() {

    // var numeroCarga = parseInt((<HTMLInputElement>document.getElementById("cargas")).value);

    var numeroCarga = this.numeroEtabs;

    // alert("Se envia " + numeroCarga);

    var excel = new Excel();

    excel.numeroCarga = numeroCarga;

    this.zapatasService.postSeleccionarCarga(excel)
      .subscribe(res => {

        this.zapatasService.cargas = res as Excel;

        var lista: Excel = this.zapatasService.cargas;

        this.base = lista.base;
        this.fx = lista.fx;
        this.fy = lista.fy;
        this.fz = lista.fz;
        this.mx = lista.mx;
        this.my = lista.my;
        this.mz = lista.mz;

      });

    this.limpiar();


  }

  seleccionarZapata() {

    // var numeroZapata = parseInt((<HTMLInputElement>document.getElementById("zapatas")).value);

    // alert("Se envia " + numeroCarga);

    var zapatas = new Zapatas();

    // zapatas.numeroZapata = numeroZapata;
    zapatas.numeroZapata = this.numeroZapata;

    this.zapatasService.postSeleccionarZapata(zapatas)
      .subscribe(res => {

        var x = res;

        if (x == null) {
          //console.log("X es igual a null!");
          // this.seleccionarZapata();
        }
        else {
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

        }



      });


  }

  darCargas() {
    this.zapatasService.getCargas()
      .subscribe(res => {
        var x = res;
        this.zapatasService.cargas = x["ultimaCarga"] as Excel;
        this.numeroCargas = x["listaCargas"];

        // this.zapatasService.cargas = res as Excel;
        var lista: Excel = this.zapatasService.cargas;


        this.base = lista.base;
        this.fx = lista.fx;
        this.fy = lista.fy;
        this.fz = lista.fz;
        this.mx = lista.mx;
        this.my = lista.my;
        this.mz = lista.mz;
      });
  }

  darCargaEstablecida() {
    var excel = new Excel();
    excel.numeroCarga = this.numeroEtabs;
    this.zapatasService.postEstablecerCarga(excel)
      .subscribe(res => {
        var x = res;
        this.zapatasService.cargas = x["cargaEstablecida"] as Excel;

        // this.zapatasService.cargas = res as Excel;
        var lista: Excel = this.zapatasService.cargas;


        this.base = lista.base;
        this.fx = lista.fx;
        this.fy = lista.fy;
        this.fz = lista.fz;
        this.mx = lista.mx;
        this.my = lista.my;
        this.mz = lista.mz;
      });
  }

  guardarDatos() {
    var bases = new Bases();

    // ////console.log("El fx es", this.fx);
    // ////console.log("El fy es", this.fy);
    // ////console.log("El fz es", this.fz);

    bases.bx = this.Bx;
    bases.by = this.By;
    bases.e = this.E;
    bases.cx = this.Cx;
    bases.cy = this.Cy;
    bases.h = this.H;

    this.zapatasService.postAgregarBases(bases)
      .subscribe(res => {
        // ////console.log("Se agrego correctamente!");
        ////console.log("Aqui se esta enviando el res:", res);

      });

  }

  irPedestal() {
    this.guardarDatos();
    this.guardarResultados();
    this.router.navigate(['/pedestal']);
  }


}
