export class Zapatas {

    constructor(id = 0,pesoSuelo = 0, pesoConcreto = 0, diametroAcero = 0, pesoZapata = 0, cargaViva = 0, cargaMuerta = 0, cargaAdmisibleSuelo = 0, factorMayoracion = 0, factorMayoracionUsuario = 0, numeroZapata = 0) {
        this.id = id;
        this.pesoSuelo = pesoSuelo;
        this.pesoConcreto = pesoConcreto;
        this.diametroAcero = diametroAcero;
        this.pesoZapata = pesoZapata;
        this.cargaViva = cargaViva;
        this.cargaMuerta = cargaMuerta;
        this.cargaAdmisibleSuelo = cargaAdmisibleSuelo;
        this.factorMayoracion = factorMayoracion;
        this.factorMayoracionUsuario = factorMayoracionUsuario;
        this.numeroZapata = numeroZapata;
    }
    id: number;
    pesoSuelo: number;
    pesoConcreto: number;
    diametroAcero: number;
    pesoZapata: number;
    cargaViva: number;
    cargaMuerta: number;
    cargaAdmisibleSuelo: number;
    factorMayoracion: number;
    factorMayoracionUsuario: number;
    numeroZapata: number;
}

