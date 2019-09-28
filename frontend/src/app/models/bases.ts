import { NumeroEtabs } from './numeroEtabs';

export class Bases {

    constructor(bx = [], by = [], e = [], cx = [], cy = [], h = [], numeroEtabs = 0, numeroZapata = 0) {
        this.bx = bx;
        this.by = by;
        this.e = e;
        this.cx = cx;
        this.cy = cy;
        this.h = h;
        this.numeroEtabs = numeroEtabs;
        this.numeroZapata = numeroZapata;
    }

    bx: Array<number>
    by: Array<number>
    e: Array<number>
    cx: Array<number>
    cy: Array<number>
    h: Array<number>
    numeroEtabs: number;
    numeroZapata: number;
}