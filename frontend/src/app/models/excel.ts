export class Excel {

    constructor(base = [],fx = [],fy = [],fz = [],mx = [],my = [],mz = [], numeroCarga = 0, irPedestal = false){
        this.base = base;
        this.fx=fx;
        this.fy=fy;
        this.fz=fz;
        this.mx=mx;
        this.my=my;
        this.mz=mz;
        this.numeroCarga = numeroCarga;
        this.irPedestal = irPedestal;
    }

    base: Array<number>
    fx: Array<number>
    fy: Array<number>
    fz: Array<number>
    mx: Array<number>
    my: Array<number>
    mz: Array<number>
    numeroCarga: number;
    irPedestal: boolean;

    
}

