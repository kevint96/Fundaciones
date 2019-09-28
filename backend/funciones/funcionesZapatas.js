const funciones = {};



funciones.darMayoracion = function (cargaViva, cargaMuerta) {
    var resultado = cargaViva + cargaMuerta;
    return resultado;
}

funciones.darPesoZapata = function (bx,by,e,pesoZapata) {
    var resultado =0;
    var lista = [];
    for (let i = 0; i < bx.length; i++) {
        resultado = parseFloat(bx[i] * by[i] * e[i] * pesoZapata);
        //resultado = Math.round(resultado*100)/100;
        console.log(i,"El resultado de peso zapata: ", bx[i] ,"*", by[i] ,"*" ,e[i] , "*" ,pesoZapata ,"=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darPesoPedestal = function (cx,cy,h,e,pesoZapata) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cx.length; i++) {
        resultado = parseFloat(cx[i] * cy[i] * (h[i] - e[i]) * pesoZapata);
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de peso pedestal: ", cx[i] ,"*", cy[i] ,"*" , "(", h[i] , "-", e[i], ")", "*" ,pesoZapata ,"=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darPesoSuelo = function (bx,by,cx,cy,h,e,pesoSuelo) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < bx.length; i++) {
        resultado = parseFloat((bx[i] * by[i]) - (cx[i] * cy[i]))  * (h[i] - e[i]) * pesoSuelo;
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de peso suelo: ", "((", bx[i] ,"*", by[i] ,")","-","(",cx[i],"*",cy[i],"))","*" , "(", h[i] , "-", e[i], ")", "*" ,pesoSuelo ,"=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darCargaVertical = function (listaPesoZapata,listaPesoPedestal,listaPesoSuelo,listaFz) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < listaPesoZapata.length; i++) {
        resultado = parseFloat(listaPesoZapata[i] + listaPesoPedestal[i] + listaPesoSuelo[i] + parseFloat(listaFz[i]));
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de carga vertical: ",listaPesoZapata[i] ,"+", listaPesoPedestal[i] ,"+", listaPesoSuelo[i] ,"+", parseFloat(listaFz[i]),"=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darMomentosActuantesMx = function (Mx,Fy,h,e) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < h.length; i++) {
        resultado = parseFloat(parseFloat(Mx[i]) - parseFloat(Fy[i]) * (h[i] - e[i]));
        //resultado = Math.round(resultado*100)/100;
        // console.log("Tamaño M" + h.length);
        // console.log("FUNCION MX:" + resultado);
        //console.log(i,"El resultado de momento actuante mx: ",parseFloat(Mx[i]) ,"-", parseFloat(Fy[i]),"*", "(",h[i] ,"-", e[i],")","=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darMomentosActuantesMy = function (My,Fx,h,e) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < h.length; i++) {
        resultado = parseFloat(parseFloat(My[i]) + parseFloat(Fx[i]) * (h[i] - e[i]));
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de momento actuante my: ",parseFloat(My[i]) ,"+", parseFloat(Fx[i]),"*", "(",h[i] ,"-", e[i],")","=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darPropiedadGeometricaA = function (bx,by) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < bx.length; i++) {
        resultado = parseFloat(bx[i] * by[i]);
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de prop A: ","(",bx[i] ,"*", by[i], ")","=", resultado);
        lista.push(resultado);
    }
    return lista;
}


funciones.darPropiedadGeometricaLx = function (bx,by) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < bx.length; i++) {
        resultado = parseFloat(bx[i] * Math.pow(by[i],3) / 12);
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de prop Lx: ","(",bx[i] ,"*", Math.pow(by[i],3), "/", 12, ")","=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darPropiedadGeometricaLy = function (by,bx) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < by.length; i++) {
        resultado = parseFloat(by[i] * Math.pow(bx[i],3) / 12);
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de prop LY: ","(",by[i] ,"*", Math.pow(bx[i],3), "/", 12, ")","=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darEsfuerzosActuantesQMax = function (cargaVertical,a,mx,by,lx,my,bx,ly) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cargaVertical.length; i++) {
        resultado = parseFloat(cargaVertical[i] / a[i] +  mx[i] * by[i] / 2 / lx[i] + my[i] * by[i] / 2 / ly[i]);
        resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de QMax: ", "(",cargaVertical[i] ,"/", a[i],")" ,"+", "(", mx[i] ,"*", by[i] , "/", 2 ,"/", lx[i],")", "+", "(",my[i] ,"*", by[i] ,"/", 2 ,"/", ly[i],")","=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darEsfuerzosActuantesQMin = function (cargaVertical,a,mx,by,lx,my,bx,ly) {
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < cargaVertical.length; i++) {
        resultado = parseFloat(cargaVertical[i] / a[i] -  mx[i] * by[i] / 2 / lx[i] - my[i] * by[i] / 2 / ly[i]);
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de QMin: ", "(",cargaVertical[i] ,"/", a[i],")" ,"-", "(", mx[i] ,"*", by[i] , "/", 2 ,"*", lx[i],")", "-", "(",my[i] ,"*", by[i] ,"/", 2 ,"*", ly[i],")","=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darDiseñoFlexionMdx = function (Qmax,by,cy,fm) { 
    var resultado =0;
    var raiz = 0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Qmax.length; i++) {
        raiz = Math.pow((by[i] - cy[i])/2,2)
        resultado = parseFloat((Qmax[i] * by[i] * ( raiz / 2))* fm);
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de mdx: ", "(",Qmax[i] ,"*", by[i] ,"*", "(","(", raiz,", ","/", "2))",")", "*", fm,")", "=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darDiseñoFlexionMdy = function (Qmax,bx,cx,fm) { 
    var resultado =0;
    var raiz = 0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Qmax.length; i++) {
        raiz = Math.pow((bx[i] - cx[i])/2,2)
        resultado = parseFloat((Qmax[i] * bx[i] * ( raiz / 2)) * fm);
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de mdy: ", "(",Qmax[i] ,"*", bx[i] ,"*", "(","(", "Math.pow","(",bx[i] ,"-", cx[i] ,"/", "2,2)", "/", "2))" ,"*", fm,")",")", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darAreaAceroAx = function (Mdy,e,by) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Mdy.length; i++) {
        resultado = parseFloat(Math.max((Mdy[i] /0.9 / 4200 / (e[i] - 0.07)),0.0018 * by[i] * e[i] * Math.pow(100,2)));
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de acero AX: ", "parseFloat(Math.max((Mdy[i] /0.9 * 4200 * (e[i] - 0.07)),0.0018 * by[i] * e[i] * Math.pow(100,2)))", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darAreaAceroAy = function (Mdx,e,by) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Mdx.length; i++) {
        resultado = parseFloat(Math.max((Mdx[i] /0.9  / 4200 / (e[i] - 0.07)),0.0018 * by[i] * e[i] * Math.pow(100,2)));
        //resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de acero AY: ", "parseFloat(Math.max((Mdx[i] /0.9 * 4200 * (e[i] - 0.07)),0.0018 * by[i] * e[i] * Math.pow(100,2)))", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darSepCabillasAsx = function (A,By,Ax) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < By.length; i++) {
        resultado = parseFloat(A * (By[i] - 0.14) / Ax[i]);
        resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de ASX: ", "parseFloat(",A[i] ,"*", By[i] ,"-", 0.14,")", "/", Ax[i],")", "=", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darSepCabillasAsy = function (A,Bx,Ay) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Bx.length; i++) {
        resultado = parseFloat(A * (Bx[i] - 0.14) / Ay[i]);
        resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de ASY: ", "parseFloat(A[i] * (Bx[i] - 0.14) / Ay[i])", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darDiseñoPorCorteVx = function (Qmax,Qmin,By,Bx,Cx,e,) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Qmax.length; i++) {
        resultado = parseFloat((Math.max(Qmax[i],Qmin[i]) * By[i] * ((Bx[i] - Cx[i] ) / 2 - (e[i] - 0.07)) * 1.6) / 0.75 / By[i] / (e[i] - 0.07) / 10000);
        resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de VX: ", "parseFloat((Math.max(Qmax[i],Qmin[i]) * By[i] * ((Bx[i] - Cx[i] / 2) - (e[i] - 0.07) * 1.6)) / 0.75 * By[i] * (e[i] - 0.07) * 10000)", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darDiseñoPorCorteVy = function (Qmax,Qmin,By,Bx,Cy,e,) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Qmax.length; i++) {
        resultado = parseFloat((Math.max(Qmax[i],Qmin[i]) * Bx[i] * ((By[i] - Cy[i] ) / 2 - (e[i] - 0.07)) * 1.6) / 0.75 / Bx[i] / (e[i] - 0.07) / 10000);
        resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de VY: ", "parseFloat((Math.max(Qmax[i],Qmin[i]) * By[i] * ((Bx[i] - Cx[i] / 2) - (e[i] - 0.07) * 1.6)) / 0.75 * By[i] * (e[i] - 0.07) * 10000)", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darDiseñoPorCorteVc = function (bx,pesoConcreto) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < bx.length; i++) {
        resultado = parseFloat(0.53 * Math.sqrt(pesoConcreto));
        resultado = Math.round(resultado*100)/100;
        // console.log(i,"El resultado de VC: ", "parseFloat(0.53 * Math.sqrt(pesoConcreto))", resultado);
        // console.log(parseFloat(0.53 * Math.sqrt(pesoConcreto)));
        // console.log("Peso concreto : " + pesoConcreto);
        // console.log("raiz cuadrada :" + Math.sqrt(pesoConcreto));
        lista.push(resultado);
    }
    return lista;
}

funciones.darPunzonadoVpuz = function (Qmax,Qmin,Bx,By,Cx,e,Cy,) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Qmax.length; i++) {
        resultado = parseFloat(Math.max(Qmax[i],Qmin[i]) * 1.6 * (Bx[i] * By[i] - ((Cx[i] + e[i] - 0.07) * (Cy[i] + e[i] - 0.07))) / 0.75 / 2 / (Cx[i] + Cy[i] + (e[i] -0.07)) / 10000 / (e[i]-0.07));
        resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de vPUZ: ", "parseFloat(Math.max(Qmax[i],Qmin[i]) * 1.6 * (Bx[i] * By[i] - ((Cx[i] + (e[i] - 0.007)) * (Cy[i]+ (e[i] - 0.007)))) / 0.75 * 2 * (Cx[i] + Cy[i] + (e[i] -0.07)) * 10000 * (e-0.07));", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.darPunzonadoVcon = function (Qmax,pesoConcreto) { 
    var resultado =0;
    var lista = [];
    lista.length= 0;
    for (let i = 0; i < Qmax.length; i++) {
        resultado = parseFloat(1.06 * Math.sqrt(pesoConcreto));
        resultado = Math.round(resultado*100)/100;
        //console.log(i,"El resultado de VCON: ", "parseFloat(1.06 * Math.sqrt(pesoConcreto))", resultado);
        lista.push(resultado);
    }
    return lista;
}

funciones.advertenciaCargaAdmisible = function (QMax,cargaAdmisibleSuelo) { 
    var condicionCargaAdmisible = false;
    for (let i = 0; i < QMax.length; i++) {
      if (QMax[i] > cargaAdmisibleSuelo) {
        condicionCargaAdmisible = true;
        console.log("Error en el esfuerzo actuante en la posición " + i + " El QMAX " + QMax[i] + " No puede ser mayor a la carga admisible " + cargaAdmisibleSuelo )
        // swal("Error en el esfuerzo actuante!", "El esfuerzo actuante Qmax no puede ser mayor a la carga admisible!", "error");
      }
    }
    return condicionCargaAdmisible;
  }

  funciones.advertenciaDiseñoCorte = function (Vx,Vc) { 
    var condicionCorte = false;
    for (let i = 0; i < Vx.length; i++) {
      if (Vx[i] > Vc[i]) {
        condicionCorte = true;
        console.log("Error en el Diseño por corte en la posición " + i + " El VX " + Vx[i] + " No puede ser mayor al Vc " + Vc[i] );
        // swal("Error en el Diseño por corte Vx!", "El Vx no puede ser mayor al Vc!", "error");
      }
    }
    return condicionCorte;
  }

  funciones.advertenciaPunzonado = function (Vpuz,Vcon) {
    var condicionPunzonado = false;
    for (let i = 0; i < Vpuz.length; i++) {
      if (Vpuz[i] > Vcon[i]) {
        condicionPunzonado = true;
        console.log("Error en el Punzonado en la posición " + i + " El Vpnz " + Vpuz[i] + " No puede ser mayor al Vcon " + Vcon[i] );
        // swal("Error en el punzonado Vpnz!", "El Vpuz no puede ser mayor al Vconc!", "error");
      }
    }
    return condicionPunzonado;
  }



module.exports = funciones;