export class Pedestal {


    constructor(fc = [], r = [], cx = [], cy = [], h = [], e = [], pesoConcreto = [] , numeroCarga = 0 ) {
        this.fc = fc;
        this.r = r;
        this.cx = cx;
        this.cy = cy;
        this.h = h;
        this.e = e;
        this.pesoConcreto = pesoConcreto;
        this.numeroCarga = numeroCarga;
    }

    fc: Array<number>
    r: Array<number>
    e: Array<number>
    cx: Array<number>
    cy: Array<number>
    h: Array<number>
    pesoConcreto: Array<number>
    numeroCarga: number;
}