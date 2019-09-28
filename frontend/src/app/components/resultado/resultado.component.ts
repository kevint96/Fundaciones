import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'node_modules/html2canvas';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZapatasService } from 'src/app/services/zapatas.service';
import { Zapatas } from 'src/app/models/zapatas';
import { NumeroZapata } from 'src/app/models/numeroZapata';
import { Resultados } from 'src/app/models/resultados';
import { NumeroEtabs } from 'src/app/models/numeroEtabs';
import { Excel } from 'src/app/models/excel';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import 'jspdf-autotable';

map: { "jspdf"; "../node_modules/jspdf/dist/jspdf.min.js" }
map: { "html2canvas"; "../node_modules/html2canvas/dist/html2canvas.min.js" }


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {


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
  zapatas;
  resultados;
  numeroZapata: number;
  numeroEtabs: number;
  numeroBajar: number;

  numeroCargas: Array<number>;

  imagen1 = "../../../assets/zapataPedestal.jpg";

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  base: Array<number>;
  fx: Array<number>;
  fy: Array<number>;
  fz: Array<number>;
  mx: Array<number>;
  my: Array<number>;
  mz: Array<number>;

  constructor(public zapatasService: ZapatasService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    // this.ctx = this.canvas.nativeElement.getContext('2d');
    this.darCargas();
    this.darNumeroEtabs();
    this.getZapata();
    this.getZapatas();
    this.getResultados();
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

    var numeroCarga = this.numeroEtabs;

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

  Redondeo(numero, decimales) {
    var flotante = parseFloat(numero);
    var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
    return resultado;
  }

  getResultados() {
    this.zapatasService.getResultados()
      .subscribe(res => {
        this.zapatasService.resultados = res as Resultados;
        this.resultados = res;
        // console.log(this.resultados.length);
        // console.log("res", res);
        // console.log("peso concreto", res[0].pesoConcreto);
        if (this.resultados.length > 0) {
          document.getElementById('mensaje').innerHTML = "Seleccione la lista de resultados:";
        }
        else{
          document.getElementById('mensaje').innerHTML = "Actualmente no hay ningun resultado guardado!";
        }
      });
  }

  getZapatas() {
    this.zapatasService.getZapatas()
      .subscribe(res => {
        this.zapatasService.zapata = res as Zapatas;
        this.zapatas = res;
        var lista: Zapatas = this.zapatasService.zapata;
        ////console.log("GetZapatas--->:", res);
        ////console.log(res[0]);
        ////console.log(res[1]);
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
          //console.log("NO HAY ZAPATAS");
          //console.log("Tamaño: " + this.numeroZapatas.length);
          // $('#mensaje').append('NO HAY ZAPATAS CREADAS!');
          // document.getElementById('mensaje').style.display = 'block';
        }
        else {
          $("#zapatas option[value='-1']").remove();
          // document.getElementById('mensaje').style.display = 'none';
        }

        var lista: Zapatas = this.zapatasService.zapata;
      });
  }

  bajar(i) {
    var num = i;
    this.numeroBajar = num;
    var total = this.resultados.length;
    // //console.log("TOTAL: " + total);
    // //console.log("i" + i);
    $('html, body').animate({ scrollTop: 300 }, 'slow');
    for (let index = 0; index < this.resultados.length; index++) {
      document.getElementById('resultados-' + index).style.display = 'none';
      if (index == num) {
        document.getElementById('resultados-' + num).style.display = 'block';
      }
    }
  }
  cerrar(i){
    var num = i;
    this.numeroBajar = num;
    var total = this.resultados.length;
    // //console.log("TOTAL: " + total);
    // //console.log("i" + i);
    $('html, body').animate({ scrollTop: 300 }, 'slow');
    for (let index = 0; index < this.resultados.length; index++) {
      document.getElementById('resultados-' + index).style.display = 'none';
      if (index == num) {
        document.getElementById('resultados-' + num).style.display = 'none';
      }
    }
  }

  eliminarResultado() {
    var resultados = new Resultados();

    var id = this.resultados[this.numeroBajar]._id;

    console.log("ID--------------->" + id);

    resultados.id = id;

    this.zapatasService.postEliminarResultados(resultados)
      .subscribe(res => {
        //console.log(res);
      });

    setTimeout(() => this.getResultados(), 400);
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    // this.router.navigate(['/zapatas']);

  }

  seleccionar(i) {

    this.numeroZapata = i;

    ////console.log("Numero zapata: " + this.numeroZapata);

    var numeroZapata = new NumeroZapata();
    numeroZapata.numeroZapata = this.numeroZapata;

    this.zapatasService.guardarNumeroZapata(numeroZapata)
      .subscribe(res => {
        // ////console.log("Se agrego correctamente!");
        ////console.log("Aqui se esta enviando el res:", res);

      });

    var opcion = confirm("Se ha seleccionado la zapata, ¿Desea continuar?");
    if (opcion == true) {
      this.router.navigate(['/home']);
    }

  }

  prueba() {
    console.log("prueba");

    var elemento = document.querySelector("#resulta-" + this.numeroBajar);

    var doc = new jsPDF('p', 'pt');

    var num = this.numeroBajar + 1;

    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();


    var centeredText = function (text, y) {
      var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(textOffset, y, text);
    }

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Testing Report", data.settings.margin.left, 50);
    centeredText("Resultado #" + num, 50);

    var res = doc.autoTableHtmlToJson(document.getElementById("tabla1-" + this.numeroBajar));
    doc.autoTable(res.columns, res.data, { margin: { top: 80 } });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Testing Report", data.settings.margin.left, 50);
    centeredText("Datos iniciales", 70);

    var res2 = doc.autoTableHtmlToJson(document.getElementById("tabla2-" + this.numeroBajar));

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
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res2.columns, res2.data);

    var res3 = doc.autoTableHtmlToJson(document.getElementById("tabla3-" + this.numeroBajar));

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
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res3.columns, res3.data);

    var res4 = doc.autoTableHtmlToJson(document.getElementById("tabla4-" + this.numeroBajar));

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
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res4.columns, res4.data);


    var res5 = doc.autoTableHtmlToJson(document.getElementById("tabla5-" + this.numeroBajar));

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res5.columns, res5.data);

    var res6 = doc.autoTableHtmlToJson(document.getElementById("tabla6-" + this.numeroBajar));

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res6.columns, res6.data);

    var res7 = doc.autoTableHtmlToJson(document.getElementById("tabla7-" + this.numeroBajar));

    // document.getElementById("tabla7-" + this.numeroBajar).style.fontSize = "10px";

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res7.columns, res7.data);

    var res8 = doc.autoTableHtmlToJson(document.getElementById("tabla8-" + this.numeroBajar));

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res8.columns, res8.data);

    var res9 = doc.autoTableHtmlToJson(document.getElementById("tabla9-" + this.numeroBajar));

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.setFontStyle('normal');
    centeredText("Resultados", doc.previousAutoTable.finalY + 10);

    doc.autoTable(res9.columns, res9.data);


    doc.save("ReporteFinalFundaciones.pdf");

  }

  imprimirElemento() {
    var elemento = document.querySelector("#resulta-" + this.numeroBajar);
    // var canvass = <HTMLCanvasElement>document.getElementById("micanvas");
    // const dataUrl = canvass.toDataURL();

    let windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<head><title>' + document.title + '</title></head>';
    windowContent += '<body>';
    windowContent += elemento.innerHTML;
    windowContent += '<style type="text/css" media="print">@media print {#nuevo {display:block;} #resultados-' + this.numeroBajar + '{width: 100%;overflow-x: auto;} #numeroZapata {display:block;} .table .thead th {color: #fff;background-color: #343a40;border-color: black; text-align: center; width: 100%;margin-bottom: 1rem;} .table-bordered td, .table-bordered th {border: 1px solid #343a40; text-align: center; width:100%} table thead th  {color: #fff;background-color: #343a40;border-color: black;text-align: center; width: 100%;overflow-x: auto;}}</style>';
    // windowContent += '<br> <img src="' + dataUrl + '">';
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

  animate(): void {

    // this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // var m = (<HTMLInputElement>document.getElementById("select")).value;

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
    ctx.fillText("Bx= " + this.resultados[0].bx[0], 300, this.canvas.nativeElement.height - 240);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("By= " + this.resultados[0].bx[0], 300, this.canvas.nativeElement.height - 220);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cx= " + this.resultados[0].bx[0], 300, this.canvas.nativeElement.height - 200);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cy= " + this.resultados[0].bx[0], 300, this.canvas.nativeElement.height - 180);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ax= " + Math.round(this.resultados[0].bx[0] * 100) / 100, 500, this.canvas.nativeElement.height - 240);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ay= " + Math.round(this.resultados[0].bx[0] * 100) / 100, 500, this.canvas.nativeElement.height - 220);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asx= " + Math.round(this.resultados[0].bx[0] * 100) / 100, 500, this.canvas.nativeElement.height - 200);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asy= " + Math.round(this.resultados[0].bx[0] * 100) / 100, 500, this.canvas.nativeElement.height - 180);
  }

}
