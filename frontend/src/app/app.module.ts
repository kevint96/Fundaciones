import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import {NgbModal, ModalDismissReasons, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';




//rutas
import {app_routing} from "./app-routing.module";
import { ResultadoComponent } from './components/resultado/resultado.component';
import { ZapatasComponent } from './components/zapatas/zapatas.component';
import { PedestalComponent } from './components/pedestal/pedestal.component';
import { SeleccionarZapataComponent } from './components/seleccionar-zapata/seleccionar-zapata.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ResultadoComponent,
    ZapatasComponent,
    PedestalComponent,
    SeleccionarZapataComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    app_routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
