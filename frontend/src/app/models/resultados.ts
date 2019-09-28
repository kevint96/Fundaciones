export class Resultados {

    constructor(id = 0,pesoSuelo = 0, pesoConcreto = 0, diametroAcero = 0, pesoZapata = 0, cargaViva = 0,
        cargaMuerta = 0, cargaAdmisibleSuelo = 0, factorMayoracion = 0, fx = [],
        fy = [],
        fz = [],
        mx = [],
        my = [],
        mz = [],
        bx = [],
        by = [],
        e = [],
        cx = [],
        cy = [],
        h = [],
        listaPesoZapata = [],
        listaPesoPedestal = [],
        listaPesoSuelo = [],
        listaCargaVertical = [],
        listaMomentoActuanteMX = [],
        listaMomentoActuanteMY = [],
        A = [],
        Ly = [],
        QMax = [],
        QMin = [],
        Mdx = [],
        Mdy = [],
        Ax = [],
        Ay = [],
        Asx = [],
        Asy = [],
        Vx = [],
        Vy = [],
        Vc = [],
        Vpuz = [],
        Vcon = [],

        pedestal_pesoPedestal = [],
        pedestal_cargaVerticalTotal = [],
        pedestal_Mx = [],
        pedestal_My = [],
        pedestal_relacionRecubrimiento = [],
        pedestal_cargaAdimensional = [],
        pedestal_momentoAdimensionalX = [],
        pedestal_momentoAdimensionalY = [],
        pedestal_condicionalesMomentoAdimensionalX = [],
        pedestal_condicionalesMomentoAdimensionalY = [],
        pedestal_mediatrizAm = [],
        pedestal_mediatrizTm = [],
        pedestal_mediatrizBm = [],
        pedestal_diagonalAd = [],
        pedestal_diagonalTd = [],
        pedestal_diagonalBd = [],
        pedestal_coeficienteK1 = [],
        pedestal_coeficienteK2 = [],
        pedestal_coeficienteK3 = [],
        pedestal_cuantiaRequerida = [],
        pedestal_cuantiaGeometrica = [],
        pedestal_areaLongitudinal = [],
        pedestal_separacionNorma = [],
        pedestal_areaPedestal = [],
        pedestal_areaRefuerzo = [],
        pedestal_seccionTransversalAshx = [],
        pedestal_seccionTransversalAshy = [],
        pedestal_fc = [],
        pedestal_r = [],
        pedestal_pesoConcreto = [],
        pedestal_e = [],
        pedestal_cx = [],
        pedestal_cy = [],
        pedestal_h = [],
    ) {
        this.id = id;
        this.pesoSuelo = pesoSuelo;
        this.pesoConcreto = pesoConcreto,
            this.diametroAcero = diametroAcero,
            this.pesoZapata = pesoZapata,
            this.cargaViva = cargaViva,
            this.cargaMuerta = cargaMuerta,
            this.cargaAdmisibleSuelo = cargaAdmisibleSuelo,
            this.factorMayoracion = factorMayoracion,
            this.fx = fx,
            this.fy = fy,
            this.fz = fz,
            this.mx = mx,
            this.my = my,
            this.mz = mz,
            this.bx = bx,
            this.by = by,
            this.e = e,
            this.cx = cx,
            this.cy = cy,
            this.h = h,
            this.listaPesoZapata = listaPesoZapata,
            this.listaPesoPedestal = listaPesoPedestal,
            this.listaPesoSuelo = listaPesoSuelo,
            this.listaCargaVertical = listaCargaVertical,
            this.listaMomentoActuanteMX = listaMomentoActuanteMX,
            this.listaMomentoActuanteMY = listaMomentoActuanteMY,
            this.A = A,
            this.Ly = Ly,
            this.QMax = QMax,
            this.QMin = QMin,
            this.Mdx = Mdx,
            this.Mdy = Mdy,
            this.Ax = Ax,
            this.Ay = Ay,
            this.Asx = Asx,
            this.Asy = Asy,
            this.Vx = Vx,
            this.Vy = Vy,
            this.Vc = Vc,
            this.Vpuz = Vpuz,
            this.Vcon = Vcon;

            this.pedestal_pesoPedestal = pedestal_pesoPedestal,
            this.pedestal_cargaVerticalTotal = pedestal_cargaVerticalTotal,
            this.pedestal_Mx = pedestal_Mx,
            this.pedestal_My = pedestal_My,
            this.pedestal_relacionRecubrimiento = pedestal_relacionRecubrimiento,
            this.pedestal_cargaAdimensional = pedestal_cargaAdimensional,
            this.pedestal_momentoAdimensionalX = pedestal_momentoAdimensionalX,
            this.pedestal_momentoAdimensionalY = pedestal_momentoAdimensionalY,
            this.pedestal_condicionalesMomentoAdimensionalX = pedestal_condicionalesMomentoAdimensionalX,
            this.pedestal_condicionalesMomentoAdimensionalY = pedestal_condicionalesMomentoAdimensionalY,
            this.pedestal_mediatrizAm = pedestal_mediatrizAm,
            this.pedestal_mediatrizTm = pedestal_mediatrizTm,
            this.pedestal_mediatrizBm = pedestal_mediatrizBm,
            this.pedestal_diagonalAd = pedestal_diagonalAd,
            this.pedestal_diagonalTd = pedestal_diagonalTd,
            this.pedestal_diagonalBd = pedestal_diagonalBd,
            this.pedestal_coeficienteK1 = pedestal_coeficienteK1,
            this.pedestal_coeficienteK2 = pedestal_coeficienteK2,
            this.pedestal_coeficienteK3 = pedestal_coeficienteK3,
            this.pedestal_cuantiaRequerida = pedestal_cuantiaRequerida,
            this.pedestal_cuantiaGeometrica = pedestal_cuantiaGeometrica,
            this.pedestal_areaLongitudinal = pedestal_areaLongitudinal,
            this.pedestal_separacionNorma = pedestal_separacionNorma,
            this.pedestal_areaPedestal = pedestal_areaPedestal,
            this.pedestal_areaRefuerzo = pedestal_areaRefuerzo,
            this.pedestal_seccionTransversalAshx = pedestal_seccionTransversalAshx,
            this.pedestal_seccionTransversalAshy = pedestal_seccionTransversalAshy,
            this.pedestal_fc = pedestal_fc,
            this.pedestal_r = pedestal_r,
            this.pedestal_pesoConcreto = pedestal_pesoConcreto,
            this.pedestal_e = pedestal_e,
            this.pedestal_cx = pedestal_cx,
            this.pedestal_cy = pedestal_cy,
            this.pedestal_h = pedestal_h
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
    listaPesoZapata: Array<number>;
    listaPesoPedestal: Array<number>;
    listaPesoSuelo: Array<number>;
    listaCargaVertical: Array<number>;
    listaMomentoActuanteMX: Array<number>;
    listaMomentoActuanteMY: Array<number>;
    A: Array<number>;
    Ly: Array<number>;
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


    pedestal_pesoPedestal: Array<number>;
    pedestal_cargaVerticalTotal: Array<number>;
    pedestal_Mx: Array<number>;
    pedestal_My: Array<number>;
    pedestal_relacionRecubrimiento: Array<number>;
    pedestal_cargaAdimensional: Array<number>;
    pedestal_momentoAdimensionalX: Array<number>;
    pedestal_momentoAdimensionalY: Array<number>;
    pedestal_condicionalesMomentoAdimensionalX: Array<number>;
    pedestal_condicionalesMomentoAdimensionalY: Array<number>;
    pedestal_mediatrizAm: Array<number>;
    pedestal_mediatrizTm: Array<number>;
    pedestal_mediatrizBm: Array<number>;
    pedestal_diagonalAd: Array<number>;
    pedestal_diagonalTd: Array<number>;
    pedestal_diagonalBd: Array<number>;
    pedestal_coeficienteK1: Array<number>;
    pedestal_coeficienteK2: Array<number>;
    pedestal_coeficienteK3: Array<number>;
    pedestal_cuantiaRequerida: Array<number>;
    pedestal_cuantiaGeometrica: Array<number>;
    pedestal_areaLongitudinal: Array<number>;
    pedestal_separacionNorma: Array<number>;
    pedestal_areaPedestal: Array<number>;
    pedestal_areaRefuerzo: Array<number>;
    pedestal_seccionTransversalAshx: Array<number>;
    pedestal_seccionTransversalAshy: Array<number>;
    pedestal_fc: Array<number>;
    pedestal_r: Array<number>;
    pedestal_pesoConcreto: Array<number>;
    pedestal_e: Array<number>;
    pedestal_cx: Array<number>;
    pedestal_cy: Array<number>;
    pedestal_h: Array<number>;
}