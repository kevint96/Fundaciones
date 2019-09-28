import { Component } from '@angular/core';
import html2canvas from 'node_modules/html2canvas';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'Generar PDF con Angular JS 5';
  imagen1 = "../../../assets/zapatas.jpg"
  imagen2 = "../../../assets/zapatas.jpg"
  imagen3 = "../../../assets/zapatas.jpg"

  	generarPDF(){
      console.log("Este boton se presionoooooooo!!!");
	    html2canvas(document.getElementById('contenido'), {
        allowTaint: true,
        useCORS: false,
        scale: 1
      }).then(function(canvas) {
		    var img = canvas.toDataURL("image/png");
		    var doc = new jsPDF();
		    doc.addImage(img,'PNG',7, 20, 195, 105);
		    doc.save('prueba.pdf');
	    });
  	}
}
