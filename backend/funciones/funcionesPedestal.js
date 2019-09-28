const funcionesPedestal = {};

funcionesPedestal.darPesoPedestal = function (cx,cy,h,e,pesoZapata) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cx.length; i++) {
        var res = parseFloat(cx[i] * cy[i] * (h[i] - e[i]) * pesoZapata[i]);
        resultado = this.redondeo(res,2);
        // //console.log("Resultadooo: ", cx[i]  + "*"  + cy[i] + "*" + "("+ h[i]  + "-"  + e[i] + ")"+ "*" + pesoZapata[i]);
        // // //console.log("Suma: " + parseFloat(pes[i] + e[i]));
        // resultado = Math.round(resultado*100)/100;
        // //console.log(i,"El resultado de peso pedestal: ", cx[i] ,"*", cy[i] ,"*" , "(", h[i] , "-", e[i], ")", "*" ,pesoZapata ,"=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCargaVerticalTotal = function (fz,pesoPedestal) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < fz.length; i++) {
        // //console.log("Fz: " + Math.round(fz[i] * 100)/100);
        // //console.log("PESO PEDESTAL: " + Math.round(pesoPedestal[i]*100)/100);
        var res = parseFloat(Math.round(fz[i] * 100)/100 + Math.round(pesoPedestal[i]*100)/100);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darMomentoActuanteX = function (mx,fy,h,e) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < mx.length; i++) {
        // //console.log(parseFloat(h[i] - e[i]));
        var res = parseFloat(mx[i] - fy[i] * (h[i] - e[i]));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darMomentoActuanteY = function (my,fx,h,e) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < my.length; i++) {
        // //console.log("darmomentoy MY: " + parseFloat(my[i]));
        // //console.log("darmomentoy: MY TYPEOF" + typeof(my[i]));
        // //console.log("darmomentoy FX: " +parseFloat(fx[i]));
        // //console.log("darmomentoy: FX TYPEOF" + typeof(fx[i]));
        // //console.log("darmomentoy H: " +parseFloat(h[i]));
        // //console.log("darmomentoy: H TYPEOF" + typeof(h[i]));
        // //console.log("darmomentoy E: "+ parseFloat(e[i]));
        // //console.log("darmomentoy: E TYPEOF" + typeof(e[i]));
        // //console.log("darmomentoy: H-E "+ parseFloat(h[i] - e[i]));
        // //console.log("darmomentoy: MY+FX "+ parseFloat(my[i] + fx[i]));
        var res = parseFloat(my[i] + fx[i] * (h[i] - e[i]));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darRelacionCubrimiento = function (cy,r) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cy.length; i++) {
        var res = parseFloat((cy[i] - r[i] / 100) / cy[i]);
        resultado = this.redondeo(res,3);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCargaAdimensional = function (cargaVertical,fc,cx,cy) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cargaVertical.length; i++) {
        var res = parseFloat((cargaVertical[i])/(0.85 * fc[i] * cx[i] * cy[i] * 10000));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darMomentoAdimensionalX = function (mx,fc,cy,cx) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < mx.length; i++) {
        // //console.log("darmomento adimensional X MX: " + parseFloat(mx[i]));
        // //console.log("darmomento adimensional X FC: " + parseFloat(fc[i]));
        // //console.log("darmomento adimensional X CY: " + parseFloat(cy[i]));
        // //console.log("darmomento adimensional X CX: " + parseFloat(cx[i]));
        var resultado1 = parseFloat(mx[i] * 100);
        // //console.log("RES1:" + resultado1);
        var resultado2 = parseFloat(0.85*fc[i] * cy[i] * 100);
        // //console.log("RES2:" + resultado2);
        var resultado3 = parseFloat(cx[i] * cy[i] * 10000);
        // //console.log("RES3:" + resultado3);
        var res = resultado1/(resultado2*resultado3);
        resultado = this.redondeo(res,4);
        // resultado = parseFloat(Math.abs((mx[i] * 100) / 0.85 * fc[i] * cy[i] * 100 * (cx[i] * cy[i] * 10000)));
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darMomentoAdimensionalY = function (my,fc,cx,cy) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < my.length; i++) {
        var resultado1 = parseFloat(my[i] * 100);
        // //console.log("RES1:" + resultado1);
        var resultado2 = parseFloat(0.85*fc[i] * cx[i] * 100);
        // //console.log("RES2:" + resultado2);
        var resultado3 = parseFloat(cx[i] * cy[i] * 10000);
        // //console.log("RES3:" + resultado3);
        var res = resultado1/(resultado2*resultado3);
        resultado = this.redondeo(res,4);
        // resultado = parseFloat(Math.abs((my[i] * 100) / 0.85 * fc[i] * cx[i] * 100 * (cx[i] * cy[i] * 10000)));
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCondicionalMomentoAdimensionalX = function (momentoAdimensionalX,momentoAdimensionalY) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < momentoAdimensionalX.length; i++) {
        resultado = ( momentoAdimensionalX[i] > momentoAdimensionalY[i] ) ? momentoAdimensionalX[i] : momentoAdimensionalY[i] ;
        // resultado = parseFloat(Math.abs((my[i] * 100) / 0.85 * fc[i] * cx[i] * 100 * (cx[i] * cx[i] * 10000)));
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCondicionalMomentoAdimensionalY = function (momentoAdimensionalX,momentoAdimensionalY) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < momentoAdimensionalX.length; i++) {
        resultado = ( momentoAdimensionalX[i] > momentoAdimensionalY[i] ) ? momentoAdimensionalY[i] : momentoAdimensionalX[i] ;
        // resultado = parseFloat(Math.abs((my[i] * 100) / 0.85 * fc[i] * cx[i] * 100 * (cx[i] * cx[i] * 10000)));
        lista.push(resultado);
    }
    return lista;
}


funcionesPedestal.darMediatrizAm = function (cargaAdimensional) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cargaAdimensional.length; i++) {
        var res = parseFloat((0.5 - 0.7143 * cargaAdimensional[i] ) * cargaAdimensional[i]);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darMediatrizTm = function (recubrimiento,cargaAdimensional) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < recubrimiento.length; i++) {
        // //console.log("Recubrimiento :" + recubrimiento[i]);
        // //console.log("Carga adimensional :" + cargaAdimensional[i]);
        // //console.log("TYPEOFRECUBRIMIENTO" + typeof(recubrimiento[i]));
        // //console.log("TYPEOFCARGAADIMENSIONAL" + typeof(cargaAdimensional[i]));
        // var valor1 = parseFloat(1 + 1.75 * (recubrimiento[i] - 0.8));
        // //console.log("1 valor :" + valor1);
        // var valor2= parseFloat(cargaAdimensional[i] - 0.35/ 1.2);
        // //console.log("2 valor :"+  valor2);
        // var valor3 = parseFloat(Math.pow(valor2,2));
        // //console.log("3 valor :"+ valor3);
        // var valor4 = parseFloat(Math.pow(1-valor3,5));
        // //console.log("4 valor :"+ valor4);
        var res = parseFloat(1+1.75*(recubrimiento[i]-0.8)*Math.pow((1-(Math.pow((cargaAdimensional[i]-0.35)/1.2 ,2))),5));
        // //console.log("Finaaaaaal :"+ res);
        // var m = 1+1.75*(recubrimiento[i]-0.8)*Math.pow((1-(Math.pow((cargaAdimensional[i]-0.35)/1.2 ,2))),5);
        // //console.log("m" + m);
        resultado = this.redondeo(res,5);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darMediatrizBm = function (cargaAdimensional) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cargaAdimensional.length; i++) {
        var res = parseFloat(0.2427 - 0.3694 * cargaAdimensional[i] + 0.4147 * Math.pow(cargaAdimensional[i],2) + 0.04973 * Math.pow(cargaAdimensional[i],3));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darDiagonalAd = function (cargaAdimensional) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cargaAdimensional.length; i++) {
        var res = parseFloat((0.356 - 0.543 * cargaAdimensional[i] + 0.0523 * Math.pow(cargaAdimensional[i],2)) * cargaAdimensional[i]);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darDiagonalTd = function (recubrimiento,cargaAdimensional) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < recubrimiento.length; i++) {
        // var res = parseFloat(1 + 2.25 * (recubrimiento[i] - 0.8) * Math.pow((1 - Math.pow((0.009 - 0.33 / 1.33),2)),5));
        var res = parseFloat(1+2.25*(recubrimiento[i]-0.8)*Math.pow((1-(Math.pow((cargaAdimensional[i]-0.33)/1.33 ,2))),5));
        resultado = this.redondeo(res,5);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darDiagonalBd = function (cargaAdimensional) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cargaAdimensional.length; i++) {
        var res = parseFloat(0.1488 - 0.2875 * cargaAdimensional[i] + 0.366 * Math.pow(cargaAdimensional[i],2) - 0.01786 * Math.pow(cargaAdimensional[i],3));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCoeficienteK1 = function (td,bd,tm,bm) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < td.length; i++) {
        var res = parseFloat(td[i] * bd[i] * tm[i] * bm[i]);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCoeficienteK2 = function (tm,bm,diagonalAd,momentoAdimensionalY,td,bd,momentoAdimensionalX,mediatrizAm) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < tm.length; i++) {
        var res = parseFloat(tm[i] * bm[i] *(diagonalAd[i] - momentoAdimensionalY[i]) - td[i] * bd[i] * (momentoAdimensionalX[i] - momentoAdimensionalY[i] - mediatrizAm[i]));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCoeficienteK3 = function (mediatrizAm,diagonalAd,momentoAdimensionalY,momentoAdimensionalX) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < mediatrizAm.length; i++) {
        var res = parseFloat(mediatrizAm[i] * (diagonalAd[i] - momentoAdimensionalY[i]) - diagonalAd[i] * (momentoAdimensionalX[i] - momentoAdimensionalY[i]));
        resultado = this.redondeo(res,5);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCuentiaRequerida = function (K2,K1,K3) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < K2.length; i++) {
        // console.log("------------------ CUENTIA ---------------");
        // console.log("K2: " + K2[i]);
        // console.log("K1: " + K1[i]);
        // console.log("K3: " + K3[i]);
        var valor1 = Math.pow(K2[i],2);
        // console.log("Valor 1: Math.pow(K2[i],2) :" + valor1);
        var valor2 = 4*K1[i];
        // console.log("Valor 2: 4*K1[i]: " + valor2);
        var valor3 = K3[i];
        // console.log("Valor 3: K3[i] :" + valor3);
        var primeraParte = this.redondeo(valor1-valor2*valor3,7);
        // console.log("Primera parte: valor1-valor2*valor3 : " + primeraParte );
        var valor4 = -K2[i];
        // console.log("Valor 4: -K2[i] :" + valor4);
        var valor5 = Math.pow(K2[i],2);
        // console.log("Valor 5: Math.pow(K2[i],2) :" + valor5);
        var valor6 = 4*K1[i];
        // console.log("Valor 6: 4*K1[i] :" + valor6);
        var valor7 = Math.pow(valor5-valor6*K3[i],0.5);
        // console.log("Valor 7: Math.pow(valor5-valor6*K3[i],0.5) :" + valor7);
        var valor8 = valor4+valor7;
        // console.log("Valor 8: valor4+valor7 :" + valor8);
        var valor9 = valor8/2/K1[i]; 
        // console.log("Valor 9: valor8/2/K1[i] :" + valor9);
        if (isNaN(valor9)) {
            valor9 = 0;
        }
        // //console.log("2Parte : " + valor4);
        var res = parseFloat((primeraParte < 0 ) ? 0 : (-K2[i] + Math.pow((Math.pow(K2[i],2) - 4 * K1[i] * K3[i]),0.5)/ 2 * K1[i]));
        // resultado = parseFloat(mediatrizAm[i] * (diagonalAd[i] - momentoAdimensionalY[i]) - diagonalAd[i] * (momentoAdimensionalX[i] - momentoAdimensionalY[i]));
        resultado = this.redondeo(valor9,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darCuentiaGeometrica = function (w,fc) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < w.length; i++) {
        var res = parseFloat(w[i] * fc[i] * 0.85 / 4200);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darAreaRefuerzoLongitudinal = function (p,cx,cy) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < p.length; i++) {
        var res = parseFloat((p[i] * cx[i] * 100 > 0.01 * cx[i] * 100 * cy[i] * 100) ? p[i] * cx[i] * 100 * cy[i] * 100 : 0.01 * cx[i] * 100 * cy[i] * 100) ;
        // resultado = parseFloat(w[i] * fc[i] * 0.85 / 4200);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darSeparacionPorNorma = function (cx,cy) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cx.length; i++) {
        var res = parseFloat((Math.min(cx[i],cy[i])/4) * 100);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darAreaPedestal = function (cx,cy) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cx.length; i++) {
        var res = parseFloat(cx[i] * 100 * cy[i] * 100);
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darAreaOcupaEsfuerzo = function (cx,cy,r) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cx.length; i++) {
        var res = parseFloat((cx[i] * 100 - 2 * r[i]) * (cy[i] * 100 - 2 * r[i]));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darAreaSeccionTransversalX = function (s,cy,r,fc,a,ach) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < s.length; i++) {
        var res = parseFloat((0.3 * s[i] * (cy[i] * 100 - 2 * r[i]) * fc[i]/4200 * (a[i]/ach[i] - 1) > 0.09 * s[i] * (cy[i] * 100 - 2 * r[i]) * (fc[i]/4200)) ? 0.3 * s[i] * (cy[i] * 100 - 2 * r[i]) * (fc[i]/4200) * (a[i]/ach[i]-1) : 0.09 * s[i] * (cy[i] * 100 - 2 * r[i]) * fc[i]/4200) ;
        // resultado = parseFloat((cx[i] * 100 - 2 * r[i]) * (cy[i] * 100 - 2 * r[i]));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.darAreaSeccionTransversalY = function (s,cx,r,fc,a,ach) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cx.length; i++) {
        var res = parseFloat((0.3 * s[i] * (cx[i] * 100 - 2 * r[i]) * fc[i]/4200 * (a[i]/ach[i] - 1) > 0.09 * s[i] * (cx[i] * 100 - 2 * r[i]) * (fc[i]/4200)) ? 0.3 * s[i] * (cx[i] * 100 - 2 * r[i]) * (fc[i]/4200) * (a[i]/ach[i]-1) : 0.09 * s[i] * (cx[i] * 100 - 2 * r[i]) * fc[i]/4200) ;
        // resultado = parseFloat((cx[i] * 100 - 2 * r[i]) * (cy[i] * 100 - 2 * r[i]));
        resultado = this.redondeo(res,4);
        lista.push(resultado);
    }
    return lista;
}

funcionesPedestal.redondeo = function (numero, decimales)
{
var flotante = parseFloat(numero);
var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);
return resultado;
}

module.exports = funcionesPedestal;
