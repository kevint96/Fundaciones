import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
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
import * as jsPDF from 'jspdf';
import { Pedestal } from 'src/app/models/pedestal';
import { NumeroEtabs } from 'src/app/models/numeroEtabs';
import { NumeroZapata } from 'src/app/models/numeroZapata';
import { Resultados } from 'src/app/models/resultados';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgForm } from '@angular/forms';

map: { "jspdf"; "../node_modules/jspdf/dist/jspdf.min.js" }
map: { "html2canvas"; "../node_modules/html2canvas/dist/html2canvas.min.js" }


const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-pedestal',
  templateUrl: './pedestal.component.html',
  styleUrls: ['./pedestal.component.css']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule      //<----------make sure you have added this.
  ],
})
export class PedestalComponent implements OnInit {

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
  irPedestal: boolean;
  irPedestalEtabs: boolean;

  bx: Array<number>;
  by: Array<number>;
  e: Array<number>;
  cx: Array<number>;
  cy: Array<number>;
  h: Array<number>;
  fc: Array<number>;
  r: Array<number>;
  listaPesoConcreto: Array<number>;

  listaPedestal: Array<number>;

  //Listas de datos de respuestas

  //Datos internos
  pesoPedestal: Array<number>;
  cargaVerticalTotal: Array<number>;
  Mx: Array<number>;
  My: Array<number>;
  relacionRecubrimiento: Array<number>;
  cargaAdimensional: Array<number>;
  momentoAdimensionalX: Array<number>;
  momentoAdimensionalY: Array<number>;
  condicionalesMomentoAdimensionalX: Array<number>;
  condicionalesMomentoAdimensionalY: Array<number>;
  mediatrizAm: Array<number>;
  mediatrizTm: Array<number>;
  mediatrizBm: Array<number>;
  diagonalAd: Array<number>;
  diagonalTd: Array<number>;
  diagonalBd: Array<number>;
  coeficienteK1: Array<number>;
  coeficienteK2: Array<number>;
  coeficienteK3: Array<number>;
  cuantiaRequerida: Array<number>;
  cuantiaGeometrica: Array<number>;
  areaLongitudinal: Array<number>;
  separacionNorma: Array<number>;
  areaPedestal: Array<number>;
  areaRefuerzo: Array<number>;
  seccionTransversalAshx: Array<number>;
  seccionTransversalAshy: Array<number>;
  Bx: Array<number>;
  By: Array<number>;
  Cx: Array<number>;
  Cy: Array<number>;
  E: Array<number>;
  H: Array<number>;
  Fc: Array<number>;
  R: Array<number>;
  LISTAPESOCONCRETO: Array<number>;
  numeroZapatas: Array<number>;
  numeroCargas: Array<number>;
  numeroZapata: number;

  primerCx: number;
  primerCy: number;
  primerH: number;

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
  numeroEtabs: number;
  condicionAst: boolean;

  imagen1 = "../../../assets/Pedestal.jpg";
  // imagen1 = "../../../assets/zapataPedestal.jpg";

  constructor(public zapatasService: ZapatasService, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    setTimeout(() => this.darNumeroEtabs(), 500);
    setTimeout(() => this.darNumeroZapata(), 100);
    // this.darNumeroZapata();
    // setTimeout(() => this.darCargas(), 1000);
    // swal("Datos etabs!", "Se han guardado correctamente los datos de etabs!", "success");
  }

  getZapata() {
    //console.log("Entro a getZapata");
    this.zapatasService.getZapata()
      .subscribe(res => {

        var x = res;
        this.zapatasService.zapata = x["ultimaZapata"] as Zapatas;
        this.numeroZapatas = x["listaZapatas"];

        var lista: Zapatas = this.zapatasService.zapata;
        //console.log("GetZapata ultima:", res);
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

  darNumeroZapata() {
    //console.log("Esta en darNumeroZapata");
    this.zapatasService.getNumeroZapata()
      .subscribe(res => {

        var x = res;

        //console.log("res: " + res);
        //console.log("X= " + x);

        if (x == null) {
          //console.log("X es igual a null!");
        }
        else {
          //console.log("X NO es igual a null y no es -1!");
          this.zapatasService.numeroZapata = x as NumeroZapata;

          var lista: NumeroZapata = this.zapatasService.numeroZapata;

          this.numeroZapata = lista.numeroZapata;

          if (this.numeroZapata == -1) {
            //console.log("numeroZapata es igual a -1");
            this.getZapata();
          }
          else {
            this.seleccionarZapata();
          }

          ////console.log("Numero zapataaaa----- " + this.numeroZapata);
        }

        // this.seleccionarZapata();
      });
  }

  seleccionarZapata() {

    var zapatas = new Zapatas();

    // zapatas.numeroZapata = numeroZapata;
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

      });


  }

  guardarResultados() {

    //Si irPedestalEtabs != true es porque el usuario ya paso por zapatas y las guardo!
    // y se insertaran los datos con un update en los datos faltantes...!

    if (!this.irPedestalEtabs) {

      //console.log("Entro a guardar resultados - IrPedestalEtabs positivo!");

      var resultados = new Resultados();


      resultados.pedestal_pesoPedestal = this.pesoPedestal,
        resultados.pedestal_cargaVerticalTotal = this.cargaVerticalTotal,
        resultados.pedestal_Mx = this.Mx,
        resultados.pedestal_My = this.My,
        resultados.pedestal_relacionRecubrimiento = this.relacionRecubrimiento,
        resultados.pedestal_cargaAdimensional = this.cargaAdimensional,
        resultados.pedestal_momentoAdimensionalX = this.momentoAdimensionalX,
        resultados.pedestal_momentoAdimensionalY = this.momentoAdimensionalY,
        resultados.pedestal_condicionalesMomentoAdimensionalX = this.condicionalesMomentoAdimensionalX,
        resultados.pedestal_condicionalesMomentoAdimensionalY = this.condicionalesMomentoAdimensionalY,
        resultados.pedestal_mediatrizAm = this.mediatrizAm,
        resultados.pedestal_mediatrizTm = this.mediatrizTm,
        resultados.pedestal_mediatrizBm = this.mediatrizBm,
        resultados.pedestal_diagonalAd = this.diagonalAd,
        resultados.pedestal_diagonalTd = this.diagonalTd,
        resultados.pedestal_diagonalBd = this.diagonalBd,
        resultados.pedestal_coeficienteK1 = this.coeficienteK1,
        resultados.pedestal_coeficienteK2 = this.coeficienteK2,
        resultados.pedestal_coeficienteK3 = this.coeficienteK3,
        resultados.pedestal_cuantiaRequerida = this.cuantiaRequerida,
        resultados.pedestal_cuantiaGeometrica = this.cuantiaGeometrica,
        resultados.pedestal_areaLongitudinal = this.areaLongitudinal,
        resultados.pedestal_separacionNorma = this.separacionNorma,
        resultados.pedestal_areaPedestal = this.areaPedestal,
        resultados.pedestal_areaRefuerzo = this.areaRefuerzo,
        resultados.pedestal_seccionTransversalAshx = this.seccionTransversalAshx,
        resultados.pedestal_seccionTransversalAshy = this.seccionTransversalAshy,
        resultados.pedestal_fc = this.Fc,
        resultados.pedestal_r = this.R,
        resultados.pedestal_pesoConcreto = this.LISTAPESOCONCRETO,
        resultados.pedestal_e = this.E,
        resultados.pedestal_cx = this.Cx,
        resultados.pedestal_cy = this.Cy,
        resultados.pedestal_h = this.H


      this.zapatasService.postGuardarResultadosPedestal(resultados)
        .subscribe(res => {
          //console.log(res);
        });
    }
    else {
      //console.log("NO HACE NADA!!!");
    }

  }


  darNumeroEtabs() {
    this.zapatasService.getNumeroEtabs()
      .subscribe(res => {
        var x = res;
        this.zapatasService.numeroEtabs = x as NumeroEtabs;

        var lista: NumeroEtabs = this.zapatasService.numeroEtabs;

        if (lista.numeroEtabs != null) {
          this.numeroEtabs = lista.numeroEtabs;
          this.irPedestalEtabs = lista.irPedestal;
          console.log("Numero etabsssssssss----- " + this.numeroEtabs);
        }

        if (lista.numeroEtabs == null) {
          this.darNumeroEtabs();
        }

        if (this.numeroEtabs == 0) {
          console.log("Entro a numero etabs = 0");
          // setTimeout(() => this.darCargas(), 1000);
          this.seleccionarCarga();

          if (this.irPedestalEtabs) {
            //console.log("IrPedestalEtabs true readonly");
            document.getElementById('pesoConcreto').removeAttribute("readonly");
          }
          // this.darCargas();
        }

        else if (this.numeroEtabs == -1) {
          //console.log("Entro a numero etabs = -1");
          this.darCargas();
          //  setTimeout(() => this.darCargas(), 10);
        }
        else if (this.numeroEtabs == -2) {
          //console.log("Entro a numero etabs = -2");
          this.darCargaDirectaPedestal();
          //  setTimeout(() => this.darCargas(), 10);
        }
        else {
          console.log("Else!");
          this.seleccionarCarga();

          setTimeout(() => this.zapatasService.getCargas()
            .subscribe(res => {
              var x = res;
              this.zapatasService.cargas = x["ultimaCarga"] as Excel;
              this.numeroCargas = x["listaCargas"];

              // this.zapatasService.cargas = res as Excel;
              var lista: Excel = this.zapatasService.cargas;

              this.irPedestal = lista.irPedestal;

              ////console.log("IR PEDESTAL VALOR: " + this.irPedestal);
              // //console.log("IR PEDESTAL ETABS:" + this.irPedestalEtabs);

              if (this.irPedestalEtabs) {

                document.getElementById('pesoConcreto').removeAttribute("readonly");

                for (let index = 0; index < this.fx.length; index++) {
                  var nuevoArray = new Array(this.fx.length);
                  this.cx = nuevoArray;
                  this.cy = nuevoArray;
                  this.h = nuevoArray;
                }

              }
              else {
                this.darBases();
              }

            }), 1000);
          ;
        }
      });

    // ////console.log("Numero Etabs: ----" + this.numeroEtabs)
    // //alert(this.numeroEtabs);
  }

  darCargas() {
    // ////console.log("Esta en dar cargas!!");
    this.zapatasService.getCargas()
      .subscribe(res => {
        var x = res;
        this.zapatasService.cargas = x["ultimaCarga"] as Excel;
        this.numeroCargas = x["listaCargas"];

        // this.zapatasService.cargas = res as Excel;
        var lista: Excel = this.zapatasService.cargas;


        this.irPedestal = lista.irPedestal;

        ////console.log("IR PEDESTAL AQUI:" + this.irPedestal);


        // ////console.log("LISTAAAA FX:" + lista.fx);
        // ////console.log("LISTAAAA FY:" + lista.fy);
        // ////console.log("LISTAAAA FZ:" + lista.fz);
        // ////console.log("LISTAAAA MX:" + lista.mx);
        // ////console.log("LISTAAAA MY:" + lista.my);
        // ////console.log("LISTAAAA MZ:" + lista.mz);

        //alert("Ir pedestal :" + this.irPedestal);

        this.base = lista.base;
        this.fx = lista.fx;
        this.fy = lista.fy;
        this.fz = lista.fz;
        this.mx = lista.mx;
        this.my = lista.my;
        this.mz = lista.mz;

        ////console.log("Tamaño fx: ---" + this.fx.length);

        // document.getElementById('CxTabla').contentEditable;
        // document.getElementById('CyTabla').contentEditable;
        // document.getElementById('HTabla').contentEditable;

        if (this.irPedestal == true) {
          ////console.log("Trueeeee");
          //alert("Datos nuevos!!!");
          // document.getElementById('Cx').removeAttribute("readonly");
          // document.getElementById('Cy').removeAttribute("readonly");
          // document.getElementById('ProfundidadH').removeAttribute("readonly");
          document.getElementById('pesoConcreto').removeAttribute("readonly");


          for (let index = 0; index < this.fx.length; index++) {
            var nuevoArray = new Array(this.fx.length);
            this.cx = nuevoArray;
            this.cy = nuevoArray;
            this.h = nuevoArray;
          }
        }
        else {
          ////console.log("Negativoooo!!!");
          this.fx = lista.fx;
          // setTimeout(() => this.darBases(), 200);
          this.darBases();
          $("#Cx").attr("readonly", "readonly");
          $("#Cy").attr("readonly", "readonly");
          $("#Profundidad").attr("readonly", "readonly");
        }

      });
  }

  darCargaDirectaPedestal() {
    // ////console.log("Esta en dar cargas!!");
    this.zapatasService.getCargas()
      .subscribe(res => {
        var x = res;
        this.zapatasService.cargas = x["ultimaCarga"] as Excel;
        this.numeroCargas = x["listaCargas"];

        // this.zapatasService.cargas = res as Excel;
        var lista: Excel = this.zapatasService.cargas;


        this.irPedestal = lista.irPedestal;

        ////console.log("IR PEDESTAL AQUI:" + this.irPedestal);


        this.base = lista.base;
        this.fx = lista.fx;
        this.fy = lista.fy;
        this.fz = lista.fz;
        this.mx = lista.mx;
        this.my = lista.my;
        this.mz = lista.mz;

        document.getElementById('pesoConcreto').removeAttribute("readonly");

        for (let index = 0; index < this.fx.length; index++) {
          var nuevoArray = new Array(this.fx.length);
          this.cx = nuevoArray;
          this.cy = nuevoArray;
          this.h = nuevoArray;
        }
      });
  }

  //Se dan las bases solo si se paso primero por zapata aislada!
  darBases() {
    ////console.log("Dar basessss!!");
    this.zapatasService.getBases()
      .subscribe(res => {
        this.zapatasService.bases = res as Bases;
        var lista: Bases = this.zapatasService.bases;

        lista.cx.length = this.fx.length;


        this.bx = lista.bx;
        this.by = lista.by;
        this.e = lista.e;
        this.cx = lista.cx;
        this.primerCx = lista.cx[0];
        this.primerCy = lista.cy[0];
        this.primerH = lista.h[0];
        this.cy = lista.cy;
        this.h = lista.h;



        ////console.log("TAMAÑOSSSSSSS: FX ------" + this.fx.length + " TAMAÑO CX : " + this.cx.length);
      });
  }

  habilitarBoton() {
    var habilitar: boolean;

    var Concreto = (<HTMLInputElement>document.getElementById("Concreto")).value;
    var Rec = (<HTMLInputElement>document.getElementById("Rec")).value;
    var pesoConcreto = (<HTMLInputElement>document.getElementById("pesoConcreto")).value;

    if (Concreto == "" || pesoConcreto == "") {
      habilitar = false;
    }
    else {
      habilitar = true;
    }

    return habilitar;
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

  guardarDatos() {
    var pedestal = new Pedestal();


    pedestal.fc = this.Fc;
    pedestal.r = this.R;
    pedestal.pesoConcreto = this.LISTAPESOCONCRETO;
    pedestal.e = this.E;
    pedestal.cx = this.Cx;
    pedestal.cy = this.Cy;
    pedestal.h = this.H;

    this.zapatasService.postCalcularPedestal(pedestal)
      .subscribe(res => {
        // ////console.log("Se agrego correctamente!");
        ////console.log("Aqui se esta enviando el res:", res);

      });

  }

  myFunction() {
    $("#select").val('0');
    var nuevoArray = new Array(3);

    var pedestal = new Pedestal();

    var fc = [];
    var r = [];
    var listaPesoConcreto = [];
    var e = [];
    var cx = [];
    var cy = [];
    var h = [];


    for (let index = 0; index < this.fx.length; index++) {
      nuevoArray[index] = new Array(3);
    }

    this.listaPedestal = [];

    this.Fc = [];
    this.R = [];
    this.LISTAPESOCONCRETO = [];
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
            // document.getElementById('blanco').style.display = 'none';
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

    this.listaPedestal = nuevoArray;

    ////console.log("LISTA PEDESTAL :" + this.listaPedestal);

    var Concreto = parseFloat((<HTMLInputElement>document.getElementById("Concreto")).value);
    var Rec = parseFloat((<HTMLInputElement>document.getElementById("Rec")).value);
    var pesoConcreto = parseFloat((<HTMLInputElement>document.getElementById("pesoConcreto")).value);

    ////console.log("CONCRETO: " + Concreto);
    ////console.log("REC: " + Rec);
    ////console.log("PESO CONCRETO: " + pesoConcreto);

    //Se leen al reves por columnas

    for (let index = 0; index < this.fx.length; index++) {

      fc.push(Concreto);
      this.Fc.push(Concreto);
      r.push(Rec);
      this.R.push(Rec);
      listaPesoConcreto.push(pesoConcreto);
      this.LISTAPESOCONCRETO.push(pesoConcreto);
      e.push(this.listaPedestal[index][0]);
      this.E.push(this.listaPedestal[index][0]);
      cx.push(this.listaPedestal[index][1]);
      this.Cx.push(this.listaPedestal[index][1]);
      cy.push(this.listaPedestal[index][2]);
      this.Cy.push(this.listaPedestal[index][2]);
      h.push(this.listaPedestal[index][3]);
      this.H.push(this.listaPedestal[index][3]);
    }
    //Se envian los datos al servidor
    pedestal.fc = this.Fc;
    pedestal.r = this.R;
    pedestal.pesoConcreto = this.LISTAPESOCONCRETO;
    pedestal.e = this.E;
    pedestal.cx = this.Cx;
    pedestal.cy = this.Cy;
    pedestal.h = this.H;

    if (this.numeroEtabs != 0) {
      pedestal.numeroCarga = this.numeroEtabs;
    }

    ////console.log("NUME: " + this.numeroEtabs);

    this.zapatasService.postCalcularPedestal(pedestal)
      .subscribe(res => {
        //////console.log("Aqui se esta enviando el res:", res);
        var x = res;

        this.pesoPedestal = x["listapesoPedestal"];
        this.cargaVerticalTotal = x["listacargaVerticalTotal"];
        this.Mx = x["Mx"];
        this.My = x["My"];
        this.relacionRecubrimiento = x["Recubrimiento"];
        this.cargaAdimensional = x["CargaAdimensional"];
        this.momentoAdimensionalX = x["MomentoAdimensionalX"];
        this.momentoAdimensionalY = x["MomentoAdimensionalY"];
        this.condicionalesMomentoAdimensionalX = x["CondicionalesMomentoAdimensionalX"];
        this.condicionalesMomentoAdimensionalY = x["CondicionalesMomentoAdimensionalY"];
        this.mediatrizAm = x["MediatrizAm"];
        this.mediatrizTm = x["MediatrizTm"];
        this.mediatrizBm = x["MediatrizBm"];
        this.diagonalAd = x["DiagonalAd"];
        this.diagonalTd = x["DiagonalTd"];
        this.diagonalBd = x["DiagonalBd"];
        this.coeficienteK1 = x["CoeficienteK1"];
        this.coeficienteK2 = x["CoeficienteK2"];
        this.coeficienteK3 = x["CoeficienteK3"];
        this.cuantiaRequerida = x["CuantiaRequerida"];
        this.cuantiaGeometrica = x["CuantiaGeometrica"];
        this.areaLongitudinal = x["AreaLongitudinal"];
        this.separacionNorma = x["SeparacionPorNorma"];
        this.areaPedestal = x["AreaPedestal"];
        this.areaRefuerzo = x["AreaRefuerzo"];
        this.seccionTransversalAshx = x["SeccionTransversalAshx"];
        this.seccionTransversalAshy = x["SeccionTransversalAshy"];
        this.comparar();
      });

  }

  comparar() {
    this.advertenciaAst();

    if (this.condicionAst) {
      // document.getElementById('blanco').style.display = 'none';
      // document.getElementById('pedestal').style.display = 'none';
      // swal("Error en el esfuerzo actuante!", "El esfuerzo actuante Qmax no puede ser mayor a la carga admisible!", "error");
      this.toastr.error("Error en el refuerzo longitudinal!", "El Ast no debe ser menor que 0,01(Area pedestal), ni mayor que 0,04(Area pedestal).!");
      //limpia la pantalla del canvas
      // this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }

    $('body,html').animate({
      scrollTop: '1000px'

    }, 1000);

    document.getElementById('blanco').style.display = 'block';

    //console.log("SEPARACION NORMA: " + this.separacionNorma[0]);
    this.animate();

    // $("#select option[value=0]").attr('selected', 'selected');



    $('#div3').animate({ scrollRight: 200 }, 150);

  }

  advertenciaAst() {
    this.condicionAst = false;
    for (let i = 0; i < this.areaLongitudinal.length; i++) {
      if (this.areaLongitudinal[i] < 0.01 * this.areaPedestal[i] || this.areaLongitudinal[i] > 0.04 * this.areaPedestal[i]) {
        this.condicionAst = true;
      }
    }
    return this.condicionAst;
  }




  seleccionarCarga() {

    //alert("Esta en seleccionar carga!!");

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

        if (this.irPedestalEtabs) {

          document.getElementById('pesoConcreto').removeAttribute("readonly");

          for (let index = 0; index < this.fx.length; index++) {
            var nuevoArray = new Array(this.fx.length);
            this.cx = nuevoArray;
            this.cy = nuevoArray;
            this.h = nuevoArray;
          }
        }
        else {
          this.darBases();
          $('#CxTabla').prop('contenteditable', false );
          // document.getElementById('CxTabla').removeAttribute("contentEditable");
          // document.getElementById('CyTabla').removeAttribute("contentEditable");
          // document.getElementById('HTabla').removeAttribute("contentEditable");
          // document.getElementById('pesoConcreto').removeAttribute("readonly");
        }

      });

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

  animate2(): void {

    // alert("El numero es " + m);


    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    var m = (<HTMLInputElement>document.getElementById("select")).value;

    //console.log("M es :" + m);

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
    ctx.fillText("E= " + this.E[m], 300, this.canvas.nativeElement.height - 140);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cx= " + this.Cx[m], 300, this.canvas.nativeElement.height - 120);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cy= " + this.Cy[m], 300, this.canvas.nativeElement.height - 100);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("H= " + this.H[m], 300, this.canvas.nativeElement.height - 80);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("S= " + Math.round(this.separacionNorma[m] * 100) / 100, 500, this.canvas.nativeElement.height - 140);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ast= " + Math.round(this.areaLongitudinal[m] * 100) / 100, 500, this.canvas.nativeElement.height - 120);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asx= " + Math.round(this.seccionTransversalAshx[m] * 100) / 100, 500, this.canvas.nativeElement.height - 100);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asy= " + Math.round(this.seccionTransversalAshy[m] * 100) / 100, 500, this.canvas.nativeElement.height - 80);

    var num = parseInt(m) + 1;
    document.getElementById('numeroZapata').innerHTML = "Pedestal #" + num;
    // document.getElementById('numeroZapata').style.display = 'block';

    document.getElementById('labelPesoPedestal').innerHTML = this.pesoPedestal[m].toString();
    document.getElementById('labelCargaVertical').innerHTML = this.cargaVerticalTotal[m].toString();
    document.getElementById('labelMomentoActuanteMX').innerHTML = this.Mx[m].toString();
    document.getElementById('labelMomentoActuanteMY').innerHTML = this.My[m].toString();

    document.getElementById('labelRelacionRecubrimiento').innerHTML = this.relacionRecubrimiento[m].toString();
    document.getElementById('labelCargaAdimensional').innerHTML = this.cargaAdimensional[m].toString();
    document.getElementById('labelMomentoUx').innerHTML = this.momentoAdimensionalX[m].toString();
    document.getElementById('labelMomentoUy').innerHTML = this.momentoAdimensionalY[m].toString();

    document.getElementById('labelCondicionalX').innerHTML = this.condicionalesMomentoAdimensionalX[m].toString();
    document.getElementById('labelCondicionalY').innerHTML = this.condicionalesMomentoAdimensionalY[m].toString();
    document.getElementById('labelMediatrizAm').innerHTML = this.mediatrizAm[m].toString();
    document.getElementById('labelMediatrizTm').innerHTML = this.mediatrizTm[m].toString();

    document.getElementById('labelMediatrizBm').innerHTML = this.mediatrizBm[m].toString();
    document.getElementById('labelDiagonalAd').innerHTML = this.diagonalAd[m].toString();
    document.getElementById('labelDiagonalTd').innerHTML = this.diagonalTd[m].toString();
    document.getElementById('labelDiagonalBd').innerHTML = this.diagonalBd[m].toString();

    document.getElementById('labelCuantiaK1').innerHTML = this.coeficienteK1[m].toString();
    document.getElementById('labelCuantiaK2').innerHTML = this.coeficienteK2[m].toString();
    document.getElementById('labelCuantiaK3').innerHTML = this.coeficienteK3[m].toString();
    document.getElementById('labelCuantiaRequerida').innerHTML = this.cuantiaRequerida[m].toString();
    document.getElementById('labelCuantiaGeometrica').innerHTML = this.cuantiaGeometrica[m].toString();
    document.getElementById('labelAreaRefuerzoLongitudinal').innerHTML = this.areaLongitudinal[m].toString();
    document.getElementById('labelSeparacionNorma').innerHTML = this.separacionNorma[m].toString();
    document.getElementById('labelAreaPedestal').innerHTML = this.areaPedestal[m].toString();

    document.getElementById('labelAreaRefuerzo').innerHTML = this.areaRefuerzo[m].toString();
    document.getElementById('labelSeccionTransversalAshx').innerHTML = this.seccionTransversalAshx[m].toString();
    document.getElementById('labelSeccionTransversalAshy').innerHTML = this.seccionTransversalAshy[m].toString();


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
    ctx.fillText("E= " + this.E[0], 300, this.canvas.nativeElement.height - 140);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cx= " + this.Cx[0], 300, this.canvas.nativeElement.height - 120);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Cy= " + this.Cy[0], 300, this.canvas.nativeElement.height - 100);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("H= " + this.H[0], 300, this.canvas.nativeElement.height - 80);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("S= " + Math.round(this.separacionNorma[0] * 100) / 100, 500, this.canvas.nativeElement.height - 140);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Ast= " + Math.round(this.areaLongitudinal[0] * 100) / 100, 500, this.canvas.nativeElement.height - 120);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asx= " + Math.round(this.seccionTransversalAshx[0] * 100) / 100, 500, this.canvas.nativeElement.height - 100);

    ctx.textAlign = 'center';
    ctx.font = "oblique bold 120% cursive";
    ctx.fillText("Asy= " + Math.round(this.seccionTransversalAshy[0] * 100) / 100, 500, this.canvas.nativeElement.height - 80);

    document.getElementById('numeroZapata').innerHTML = "Pedestal #1";
    // document.getElementById('numeroZapata').style.display = 'block';

    document.getElementById('labelPesoPedestal').innerHTML = this.pesoPedestal[0].toString();
    document.getElementById('labelCargaVertical').innerHTML = this.cargaVerticalTotal[0].toString();
    document.getElementById('labelMomentoActuanteMX').innerHTML = this.Mx[0].toString();
    document.getElementById('labelMomentoActuanteMY').innerHTML = this.My[0].toString();

    document.getElementById('labelRelacionRecubrimiento').innerHTML = this.relacionRecubrimiento[0].toString();
    document.getElementById('labelCargaAdimensional').innerHTML = this.cargaAdimensional[0].toString();
    document.getElementById('labelMomentoUx').innerHTML = this.momentoAdimensionalX[0].toString();
    document.getElementById('labelMomentoUy').innerHTML = this.momentoAdimensionalY[0].toString();

    document.getElementById('labelCondicionalX').innerHTML = this.condicionalesMomentoAdimensionalX[0].toString();
    document.getElementById('labelCondicionalY').innerHTML = this.condicionalesMomentoAdimensionalY[0].toString();
    document.getElementById('labelMediatrizAm').innerHTML = this.mediatrizAm[0].toString();
    document.getElementById('labelMediatrizTm').innerHTML = this.mediatrizTm[0].toString();

    document.getElementById('labelMediatrizBm').innerHTML = this.mediatrizBm[0].toString();
    document.getElementById('labelDiagonalAd').innerHTML = this.diagonalAd[0].toString();
    document.getElementById('labelDiagonalTd').innerHTML = this.diagonalTd[0].toString();
    document.getElementById('labelDiagonalBd').innerHTML = this.diagonalBd[0].toString();

    document.getElementById('labelCuantiaK1').innerHTML = this.coeficienteK1[0].toString();
    document.getElementById('labelCuantiaK2').innerHTML = this.coeficienteK2[0].toString();
    document.getElementById('labelCuantiaK3').innerHTML = this.coeficienteK3[0].toString();
    document.getElementById('labelCuantiaRequerida').innerHTML = this.cuantiaRequerida[0].toString();
    document.getElementById('labelCuantiaGeometrica').innerHTML = this.cuantiaGeometrica[0].toString();
    document.getElementById('labelAreaRefuerzoLongitudinal').innerHTML = this.areaLongitudinal[0].toString();
    document.getElementById('labelSeparacionNorma').innerHTML = this.separacionNorma[0].toString();
    document.getElementById('labelAreaPedestal').innerHTML = this.areaPedestal[0].toString();

    document.getElementById('labelAreaRefuerzo').innerHTML = this.areaRefuerzo[0].toString();
    document.getElementById('labelSeccionTransversalAshx').innerHTML = this.seccionTransversalAshx[0].toString();
    document.getElementById('labelSeccionTransversalAshy').innerHTML = this.seccionTransversalAshy[0].toString();

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

  irResultados()
  {
   this.router.navigate(['/resultado']);
  }

  generarPDF() {

    this.guardarResultados();

    swal("Resultado guardado!!", "Se han guardado correctamente los datos!", "success");

    (<HTMLInputElement> document.getElementById("guardarDatos")).disabled = true;

    // var div = document.querySelector("#blanco");
    // this.imprimirElemento(div);

    // var canvass = <HTMLCanvasElement>document.getElementById("micanvas");
    // var elemento = document.querySelector("#resultados");

    // var m = (<HTMLInputElement>document.getElementById("select")).value;
    // //////console.log("Este boton se presionoooooooo!!!");
    // html2canvas(document.getElementById('blanco'), {
    //   allowTaint: true,
    //   useCORS: false,
    //   scale: 1
    // }).then(function (canvas) {
    //   var img = canvass.toDataURL("image/png");
    //   var doc = new jsPDF();

    //   doc.setFontSize(10)

    //   doc.addImage(img
    //     , 'JPEG', 7, 20, 195, 105);
    //   doc.save('zapatas.pdf');

    // });
  }



}
