import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Excel } from '../models/excel';
import { Zapatas } from '../models/zapatas';
import { Bases } from '../models/bases';
import { Pedestal } from '../models/pedestal';
import { NumeroEtabs } from '../models/numeroEtabs';
import { NumeroZapata } from '../models/numeroZapata';
import { Resultados } from '../models/resultados';

@Injectable({
  providedIn: 'root'
})
export class ZapatasService {

  selectedZapata: Zapatas;
  employees: Zapatas[];
  zapata: Zapatas; 
  selectedExcel: Excel[];
  cargas: Excel;
  selectedResultados: Resultados[];
  resultados: Resultados;
  numeroEtabs: NumeroEtabs;
  numeroZapata: NumeroZapata;
  selectedBases: Bases[];
  bases: Bases;

  
  
  readonly URL_API = '/api/zapatas';
  readonly URL_BAS = '/api/zapatas/bases';
  readonly URL_ZAP = '/api/zapatas/darZapata';
  readonly SEL_ZAP = '/api/zapatas/seleccionarZapata';
  readonly URL_EXC = '/api/excel';
  readonly URL_DEV_CAR_EST = '/api/excel/establecer';
  readonly SEL_CAR = '/api/excel/seleccionarCarga';
  readonly DAR_ETABS = '/api/numeroEtabs/darNumeroEtabs';
  readonly GUARDAR_ETABS = '/api/numeroEtabs/guardarNumeroEtabs';
  readonly GUARDAR_RESULT = '/api/resultados/guardarResultados';
  readonly GUARDAR_RESULT_PED = '/api/resultados/guardarResultadosPedestal';
  readonly ELIMINAR_RESULTADOS = '/api/resultados/eliminarResultados';
  readonly ELIMINAR_ZAPATAS = '/api/zapatas/eliminarZapatas';
  readonly DAR_RESULT = '/api/resultados/darResultados';
  readonly DAR_NUM_ZAP = '/api/numeroZapata/darNumeroZapata';
  readonly GUARDAR_NUM_ZAP = '/api/numeroZapata/guardarNumeroZapata';
  readonly URL_EXC_BASES = '/api/excel/darBases';
  readonly URL_AGR_BASES = '/api/bases/agregarBase';
  readonly URL_CAL_BASES = '/api/bases/calcularBase';
  readonly URL_DAR_BASES = '/api/bases/';

  constructor(private http: HttpClient) {
    this.selectedZapata = new Zapatas();
    this.cargas = new Excel();
    this.bases = new Bases();
    this.numeroEtabs = new NumeroEtabs();
    this.resultados = new Resultados();
  }

  postZapatas(zapatas: Zapatas) {
    return this.http.post(this.URL_API, zapatas);
  }

  postBases(bases: Bases) {
    return this.http.post(this.URL_BAS, bases);
  }

  postExcel(excel: Excel) {
    return this.http.post(this.URL_EXC_BASES, excel);
  }

  postAgregarBases(bases: Bases) {
    return this.http.post(this.URL_AGR_BASES, bases);
  }

  postCalcularPedestal(pedestal: Pedestal) {
    return this.http.post(this.URL_CAL_BASES, pedestal);
  }

  postExcelBases(excel: Excel) {
    return this.http.post(this.URL_EXC_BASES, excel);
  }

  postGuardarResultados(resultados: Resultados) {
    return this.http.post(this.GUARDAR_RESULT, resultados);
  }

  postGuardarResultadosPedestal(resultados: Resultados) {
    return this.http.post(this.GUARDAR_RESULT_PED, resultados);
  }

  postEliminarResultados(resultados: Resultados) {
    return this.http.post(this.ELIMINAR_RESULTADOS, resultados);
  }

  postEliminarZapatas(zapatas: Zapatas) {
    return this.http.post(this.ELIMINAR_ZAPATAS, zapatas);
  }

  postSeleccionarCarga(excel: Excel) {
    return this.http.post(this.SEL_CAR, excel);
  }

  getResultados()
  {
    return this.http.get(this.DAR_RESULT); 
  }

  getNumeroEtabs() {
    return this.http.get(this.DAR_ETABS);
  }

  getNumeroZapata() {
    return this.http.get(this.DAR_NUM_ZAP);
  }

  guardarNumeroEtabs(etabs: NumeroEtabs)
  {
    return this.http.post(this.GUARDAR_ETABS, etabs);
  }

  guardarNumeroZapata(numeroZapata: NumeroZapata)
  {
    return this.http.post(this.GUARDAR_NUM_ZAP, numeroZapata);
  }

  getZapatas() {
    return this.http.get(this.URL_API);
  }

  getZapata() {
    return this.http.get(this.URL_ZAP);
  }

  postSeleccionarZapata(zapata: Zapatas) {
    return this.http.post(this.SEL_ZAP, zapata);
  }
  

  getCargas(){
    return this.http.get(this.URL_EXC);
  }

  postEstablecerCarga(excel: Excel) {
    return this.http.post(this.URL_DEV_CAR_EST, excel);
  }

  getBases(){
    return this.http.get(this.URL_DAR_BASES);
  }

}
