import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ZapatasService } from '../../services/zapatas.service';
import { Zapatas } from '../../models/zapatas';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { NumeroZapata } from '../../models/numeroZapata';

@Component({
  selector: 'app-seleccionar-zapata',
  templateUrl: './seleccionar-zapata.component.html',
  styleUrls: ['./seleccionar-zapata.component.css']
})
export class SeleccionarZapataComponent implements OnInit {

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
  numeroZapata: number;
  pulsacion: number;
  numeroBajar: number;

  constructor(public zapatasService: ZapatasService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.getZapata();
    this.getZapatas();
    this.pulsacion = 0;
  }

  //Se devuelven todas las zapatas en json
  getZapatas() {
    this.zapatasService.getZapatas()
      .subscribe(res => {
        this.zapatasService.zapata = res as Zapatas;
        this.zapatas = res;
        var lista: Zapatas = this.zapatasService.zapata;
        //console.log("GetZapatas--->:", res);
        //console.log(res[0]);
        //console.log(res[1]);
        console.log(this.zapatas.length);
        document.getElementById('mensaje').style.display = 'block';
        if (this.zapatas.length > 0) {
          document.getElementById('mensaje').innerHTML = "Seleccione la zapata de la lista:";
        }
        else {
          document.getElementById('mensaje').innerHTML = "Actualmente no hay ningún dato guardado!";
        }
      });
  }

  //se devuelven las zapatas en partes json
  getZapata() {
    this.zapatasService.getZapata()
      .subscribe(res => {

        var x = res;
        this.zapatasService.zapata = x["ultimaZapata"] as Zapatas;
        this.numeroZapatas = x["listaZapatas"];

        if (this.numeroZapatas.length == 0) {
          //  $("#zapatas").append()
          $('#zapatas').append('<option value="-1" selected="selected">NO HAY ZAPATAS CREADAS!</option>');
          console.log("NO HAY ZAPATAS");
          console.log("Tamaño: " + this.numeroZapatas.length);
          $('#mensaje').append('NO HAY ZAPATAS CREADAS!');
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
    var total = this.zapatas.length;
    // //console.log("TOTAL: " + total);
    // //console.log("i" + i);
    for (let index = 0; index < this.zapatas.length; index++) {
      document.getElementById('zapatas-' + index).style.display = 'none';
      if (index == num) {
        document.getElementById('zapatas-' + num).style.display = 'block';

        var tamaño = document.getElementById('zapatas-' + num).clientHeight;

        console.log("tamaño: " + tamaño)
        $('html, body').animate({ scrollTop: tamaño + 10}, 'slow');
        // this.pulsacion++;
        // console.log("pulsacion..." + this.pulsacion);
      }
    }
    // if (this.pulsacion == 2) {
    //     document.getElementById('zapatas-' + num).style.display = 'none';
    //     this.pulsacion = 0;
    //   }

  }

  eliminarZapata() {
    var opcion = confirm("¿Seguro que desea eliminar esta fundación?");
    if (opcion == true) {

      var id = this.zapatas[this.numeroBajar]._id;

      console.log("ID--------------->" + id);
      console.log("ZAPATAS: " , this.zapatas);
      console.log("NUM BAJAR: " , this.numeroBajar);
      console.log("ZAPATA array: " , this.zapatas[this.numeroBajar]);
      
      var zapatas = new Zapatas();

      zapatas.id = id;

      this.zapatasService.postEliminarZapatas(zapatas)
        .subscribe(res => {
          //console.log(res);
        });

      setTimeout(() => this.getZapatas(), 400);
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      // this.router.navigate(['/zapatas']);
    }



  }

  seleccionar(i) {

    this.numeroZapata = i;

    //console.log("Numero zapata: " + this.numeroZapata);

    var numeroZapata = new NumeroZapata();
    numeroZapata.numeroZapata = this.numeroZapata;

    this.zapatasService.guardarNumeroZapata(numeroZapata)
      .subscribe(res => {
        // //console.log("Se agrego correctamente!");
        //console.log("Aqui se esta enviando el res:", res);

      });

    var opcion = confirm("Se ha seleccionado la zapata, ¿Desea continuar?");
    if (opcion == true) {
      this.router.navigate(['/home']);
    }

  }

}
