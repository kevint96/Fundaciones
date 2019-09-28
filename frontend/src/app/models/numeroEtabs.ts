export class NumeroEtabs {

    constructor(numeroEtabs = 0 ,irPedestal = false) {
        this.numeroEtabs= numeroEtabs;
        this.irPedestal = irPedestal;
    }
    numeroEtabs:number;
    irPedestal:boolean;
}