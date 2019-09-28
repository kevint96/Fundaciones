const Bases = require('../models/bases');
const Funciones = require('../funciones/funcionesPedestal');
const Zapatas = require('../models/zapatas');
const Excel = require('../models/excel');
const Pedestal = require('../models/pedestal');
const basesCtrl = {};
var listaBases = [];
var listaPedestal = [];


//Datos internos
var pesoPedestal = [];
var cargaVerticalTotal = [];
var Mx = [];
var My = [];
var relacionRecubrimiento = [];
var cargaAdimensional = [];
var momentoAdimensionalX = [];
var momentoAdimensionalY = [];
var condicionalesMomentoAdimensionalX = [];
var condicionalesMomentoAdimensionalY = [];
var mediatrizAm = [];
var mediatrizTm = [];
var mediatrizBm = [];
var diagonalAd = [];
var diagonalTd = [];
var diagonalBd = [];
var coeficienteK1 = [];
var coeficienteK2 = [];
var coeficienteK3 = [];
var cuantiaRequerida = [];
var cuantiaGeometrica = [];
var areaLongitudinal = [];
var separacionNorma = [];
var areaPedestal = [];
var areaRefuerzo = [];
var seccionTransversalAshx = [];
var seccionTransversalAshy = [];

basesCtrl.calcular = async (req, res, next) => {

    //Datos que se traen de las zapatas
    const zapatas = await Zapatas.find();
    listazapatas = zapatas;
    //Lista de ultima zapata almacenada
    var lista = listazapatas[listazapatas.length - 1];

    //Datos que se traen de las cargas de etabs excel
    const excel = await Excel.find();
    listaCargas = excel;
    var listaEtabs = listaCargas[listaCargas.length - 1];

    // //console.log("---------- LISTA ETABS: "+listaEtabs);

    const pedestal = new Pedestal({
        fc: req.body.fc,
        r: req.body.r,
        cx: req.body.cx,
        cy: req.body.cy,
        h: req.body.h,
        e: req.body.e,
        pesoConcreto: req.body.pesoConcreto
    })

    var numeroEtabs = req.body.numeroCarga;


    //console.log("----------------------------------> Numero carga:  " + numeroEtabs);
    //Si numero etabs > 0 es porque es un dato viejo que se selecciono de la lista y se busca de la lista de etabs
    //Si numero etabs < 0 (-1,-2) es porque es un dato nuevo y se selecciona la ultima carga de etabs
    if(numeroEtabs>=0)
    {
        listaEtabs = listaCargas[numeroEtabs];

        //console.log("---------- LISTA ETABS numero: "+listaEtabs);



        //console.log("FC: ",req.body.fc);
        //console.log("R: ",req.body.r);
        //console.log("CX: ",req.body.cx);
        //console.log("CY: ",req.body.cy);
        //console.log("H: ",req.body.h);
        //console.log("E: ",req.body.e);
        //console.log("peso concreto: ",req.body.pesoConcreto);
    
    
        listaFc = [];
        listaR = [];
        listaCx = [];
        listaCy = [];
        listaH = [];
        listaE = [];
        listaPesoConcreto = [];
        ////console.log("tamaño:", req.body.fc.length);
        for (let i = 0; i < req.body.fc.length; i++) {
            listaFc.push(req.body.fc[i]);
            listaR.push(req.body.r[i]);
            listaCx.push(req.body.cx[i]);
            listaCy.push(req.body.cy[i]);
            listaH.push(req.body.h[i]);
            listaE.push(req.body.e[i]);
            listaPesoConcreto.push(req.body.pesoConcreto[i]);
        }
    
        ////console.log("Lista etabs" , listaEtabs);
    
    
        // listaPedestal.push(pedestal);
    
        // await pedestal.save();
    
        pesoPedestal = [];
        cargaVerticalTotal = [];
        Mx=[];
        My=[];
        relacionRecubrimiento = [];
        cargaAdimensional = [];
        momentoAdimensionalX = [];
        momentoAdimensionalY = [];
        condicionalesMomentoAdimensionalX = [];
        condicionalesMomentoAdimensionalY = [];
        mediatrizAm = [];
        mediatrizBm = [];
        mediatrizTm = [];
        diagonalAd = [];
        diagonalBd = [];
        diagonalTd = [];
        coeficienteK1 = [];
        coeficienteK2 = [];
        coeficienteK3 = [];
        cuantiaRequerida = [];
        cuantiaGeometrica = [];
        areaLongitudinal = [];
        separacionNorma = [];
        areaPedestal = [];
        areaRefuerzo = [];
        seccionTransversalAshx = [];
        seccionTransversalAshy = [];
    
    
        pesoPedestal = Funciones.darPesoPedestal(listaCx,listaCy,listaH,listaE,listaPesoConcreto);
        cargaVerticalTotal = Funciones.darCargaVerticalTotal(listaEtabs.fz, pesoPedestal);
        Mx = Funciones.darMomentoActuanteX(listaEtabs.mx,listaEtabs.fy,listaH,listaE);
        My = Funciones.darMomentoActuanteY(listaEtabs.my,listaEtabs.fx,listaH,listaE);
        relacionRecubrimiento = Funciones.darRelacionCubrimiento(listaCy,listaR);
        cargaAdimensional = Funciones.darCargaAdimensional(cargaVerticalTotal,listaFc,listaCx,listaCy);
        momentoAdimensionalX = Funciones.darMomentoAdimensionalX(Mx,listaFc,listaCy,listaCx);
        momentoAdimensionalY = Funciones.darMomentoAdimensionalY(My,listaFc,listaCx,listaCy);
        condicionalesMomentoAdimensionalX = Funciones.darCondicionalMomentoAdimensionalX(momentoAdimensionalX,momentoAdimensionalY);
        condicionalesMomentoAdimensionalY = Funciones.darCondicionalMomentoAdimensionalY(momentoAdimensionalX,momentoAdimensionalY);
        mediatrizAm = Funciones.darMediatrizAm(cargaAdimensional);
        mediatrizTm = Funciones.darMediatrizTm(relacionRecubrimiento,cargaAdimensional);
        mediatrizBm = Funciones.darMediatrizBm(cargaAdimensional);
        diagonalAd = Funciones.darDiagonalAd(cargaAdimensional);
        diagonalTd = Funciones.darDiagonalTd(relacionRecubrimiento,cargaAdimensional);
        diagonalBd = Funciones.darDiagonalBd(cargaAdimensional);
        coeficienteK1 = Funciones.darCoeficienteK1(diagonalTd,diagonalBd,mediatrizTm,mediatrizBm);
        coeficienteK2 = Funciones.darCoeficienteK2(mediatrizTm,mediatrizBm,diagonalAd,momentoAdimensionalY,diagonalTd,diagonalBd,momentoAdimensionalX,mediatrizAm);
        coeficienteK3 = Funciones.darCoeficienteK3(mediatrizAm,diagonalAd,momentoAdimensionalY,momentoAdimensionalX);
        cuantiaRequerida = Funciones.darCuentiaRequerida(coeficienteK2,coeficienteK1,coeficienteK3);
        cuantiaGeometrica = Funciones.darCuentiaGeometrica(cuantiaRequerida,listaFc);
        areaLongitudinal = Funciones.darAreaRefuerzoLongitudinal(cuantiaGeometrica,listaCx,listaCy);
        separacionNorma = Funciones.darSeparacionPorNorma(listaCx,listaCy);
        areaPedestal = Funciones.darAreaPedestal(listaCx,listaCy);
        areaRefuerzo = Funciones.darAreaOcupaEsfuerzo(listaCx,listaCy,listaR);
        seccionTransversalAshx = Funciones.darAreaSeccionTransversalX(separacionNorma,listaCy,listaR,listaFc,areaPedestal,areaRefuerzo);
        seccionTransversalAshy = Funciones.darAreaSeccionTransversalY(separacionNorma,listaCx,listaR,listaFc,areaPedestal,areaRefuerzo);
    
        //console.log("listapesoPedestal :", pesoPedestal);
        //console.log("listacargaVerticalTotal :", cargaVerticalTotal);
        //console.log("Mx :", Mx);
        //console.log("My :", My);
        //console.log("Recubrimiento :", relacionRecubrimiento);
        //console.log("Carga adimensional :", cargaAdimensional);
        //console.log("Momento adimensional X :", momentoAdimensionalX);
        //console.log("Momento adimensional Y :", momentoAdimensionalY);
        //console.log("Condicionales momento adimensional x :", condicionalesMomentoAdimensionalX);
        //console.log("Condicionales momento adimensional y :", condicionalesMomentoAdimensionalY);
        //console.log("Mediatriz Am :", mediatrizAm);
        //console.log("Mediatriz Tm :", mediatrizTm);
        //console.log("Mediatriz Bm :", mediatrizBm);
        //console.log("Diagonal Ad :", diagonalAd);
        //console.log("Diagonal Td :", diagonalTd);
        //console.log("Diagonal Bd :", diagonalBd);
        //console.log("Coeficiente K1 :", coeficienteK1);
        //console.log("Coeficiente K2 :", coeficienteK2);
        //console.log("Coeficiente K3 :", coeficienteK3);
        //console.log("Cuantia requerida :", cuantiaRequerida);
        //console.log("Cuantia geometrica :", cuantiaGeometrica);
        //console.log("Area longitudinal :", areaLongitudinal);
        //console.log("Separacion por norma :", separacionNorma);
        //console.log("Area pedestal :", areaPedestal);
        //console.log("Area refuerzo :", areaRefuerzo);
        //console.log("Seccion transversal ashx :", seccionTransversalAshx);
        //console.log("Seccion transversal ashy :", seccionTransversalAshy);

    }
    else
    {
        listaEtabs = listaCargas[listaCargas.length - 1];
        ////console.log(req.body.fc);
        ////console.log(req.body.r);
        ////console.log(req.body.cx);
        ////console.log(req.body.cy);
        ////console.log(req.body.h);
        ////console.log(req.body.e);
        ////console.log(req.body.pesoConcreto);
    
    
        listaFc = [];
        listaR = [];
        listaCx = [];
        listaCy = [];
        listaH = [];
        listaE = [];
        listaPesoConcreto = [];
        ////console.log("tamaño:", req.body.fc.length);
        for (let i = 0; i < req.body.fc.length; i++) {
            listaFc.push(req.body.fc[i]);
            listaR.push(req.body.r[i]);
            listaCx.push(req.body.cx[i]);
            listaCy.push(req.body.cy[i]);
            listaH.push(req.body.h[i]);
            listaE.push(req.body.e[i]);
            listaPesoConcreto.push(req.body.pesoConcreto[i]);
        }
    
        ////console.log("Lista etabs" , listaEtabs);
    
    
        // listaPedestal.push(pedestal);
    
        // await pedestal.save();
    
        pesoPedestal = [];
        cargaVerticalTotal = [];
        Mx=[];
        My=[];
        relacionRecubrimiento = [];
        cargaAdimensional = [];
        momentoAdimensionalX = [];
        momentoAdimensionalY = [];
        condicionalesMomentoAdimensionalX = [];
        condicionalesMomentoAdimensionalY = [];
        mediatrizAm = [];
        mediatrizBm = [];
        mediatrizTm = [];
        diagonalAd = [];
        diagonalBd = [];
        diagonalTd = [];
        coeficienteK1 = [];
        coeficienteK2 = [];
        coeficienteK3 = [];
        cuantiaRequerida = [];
        cuantiaGeometrica = [];
        areaLongitudinal = [];
        separacionNorma = [];
        areaPedestal = [];
        areaRefuerzo = [];
        seccionTransversalAshx = [];
        seccionTransversalAshy = [];
    
    
        pesoPedestal = Funciones.darPesoPedestal(listaCx,listaCy,listaH,listaE,listaPesoConcreto);
        cargaVerticalTotal = Funciones.darCargaVerticalTotal(listaEtabs.fz, pesoPedestal);
        Mx = Funciones.darMomentoActuanteX(listaEtabs.mx,listaEtabs.fy,listaH,listaE);
        My = Funciones.darMomentoActuanteY(listaEtabs.my,listaEtabs.fx,listaH,listaE);
        relacionRecubrimiento = Funciones.darRelacionCubrimiento(listaCy,listaR);
        cargaAdimensional = Funciones.darCargaAdimensional(cargaVerticalTotal,listaFc,listaCx,listaCy);
        momentoAdimensionalX = Funciones.darMomentoAdimensionalX(Mx,listaFc,listaCy,listaCx);
        momentoAdimensionalY = Funciones.darMomentoAdimensionalY(My,listaFc,listaCx,listaCy);
        condicionalesMomentoAdimensionalX = Funciones.darCondicionalMomentoAdimensionalX(momentoAdimensionalX,momentoAdimensionalY);
        condicionalesMomentoAdimensionalY = Funciones.darCondicionalMomentoAdimensionalY(momentoAdimensionalX,momentoAdimensionalY);
        mediatrizAm = Funciones.darMediatrizAm(cargaAdimensional);
        mediatrizTm = Funciones.darMediatrizTm(relacionRecubrimiento,cargaAdimensional);
        mediatrizBm = Funciones.darMediatrizBm(cargaAdimensional);
        diagonalAd = Funciones.darDiagonalAd(cargaAdimensional);
        diagonalTd = Funciones.darDiagonalTd(relacionRecubrimiento,cargaAdimensional);
        diagonalBd = Funciones.darDiagonalBd(cargaAdimensional);
        coeficienteK1 = Funciones.darCoeficienteK1(diagonalTd,diagonalBd,mediatrizTm,mediatrizBm);
        coeficienteK2 = Funciones.darCoeficienteK2(mediatrizTm,mediatrizBm,diagonalAd,momentoAdimensionalY,diagonalTd,diagonalBd,momentoAdimensionalX,mediatrizAm);
        coeficienteK3 = Funciones.darCoeficienteK3(mediatrizAm,diagonalAd,momentoAdimensionalY,momentoAdimensionalX);
        cuantiaRequerida = Funciones.darCuentiaRequerida(coeficienteK2,coeficienteK1,coeficienteK3);
        cuantiaGeometrica = Funciones.darCuentiaGeometrica(cuantiaRequerida,listaFc);
        areaLongitudinal = Funciones.darAreaRefuerzoLongitudinal(cuantiaGeometrica,listaCx,listaCy);
        separacionNorma = Funciones.darSeparacionPorNorma(listaCx,listaCy);
        areaPedestal = Funciones.darAreaPedestal(listaCx,listaCy);
        areaRefuerzo = Funciones.darAreaOcupaEsfuerzo(listaCx,listaCy,listaR);
        seccionTransversalAshx = Funciones.darAreaSeccionTransversalX(separacionNorma,listaCy,listaR,listaFc,areaPedestal,areaRefuerzo);
        seccionTransversalAshy = Funciones.darAreaSeccionTransversalY(separacionNorma,listaCx,listaR,listaFc,areaPedestal,areaRefuerzo);
    
        //console.log("listapesoPedestal :", pesoPedestal);
        //console.log("listacargaVerticalTotal :", cargaVerticalTotal);
        //console.log("Mx :", Mx);
        //console.log("My :", My);
        //console.log("Recubrimiento :", relacionRecubrimiento);
        //console.log("Carga adimensional :", cargaAdimensional);
        //console.log("Momento adimensional X :", momentoAdimensionalX);
        //console.log("Momento adimensional Y :", momentoAdimensionalY);
        //console.log("Condicionales momento adimensional x :", condicionalesMomentoAdimensionalX);
        //console.log("Condicionales momento adimensional y :", condicionalesMomentoAdimensionalY);
        //console.log("Mediatriz Am :", mediatrizAm);
        //console.log("Mediatriz Tm :", mediatrizTm);
        //console.log("Mediatriz Bm :", mediatrizBm);
        //console.log("Diagonal Ad :", diagonalAd);
        //console.log("Diagonal Td :", diagonalTd);
        //console.log("Diagonal Bd :", diagonalBd);
        //console.log("Coeficiente K1 :", coeficienteK1);
        //console.log("Coeficiente K2 :", coeficienteK2);
        //console.log("Coeficiente K3 :", coeficienteK3);
        //console.log("Cuantia requerida :", cuantiaRequerida);
        //console.log("Cuantia geometrica :", cuantiaGeometrica);
        //console.log("Area longitudinal :", areaLongitudinal);
        //console.log("Separacion por norma :", separacionNorma);
        //console.log("Area pedestal :", areaPedestal);
        //console.log("Area refuerzo :", areaRefuerzo);
        //console.log("Seccion transversal ashx :", seccionTransversalAshx);
        //console.log("Seccion transversal ashy :", seccionTransversalAshy);

    }

    //Se envian los datos como respuesta:

    res.json({
        listapesoPedestal : pesoPedestal,
        listacargaVerticalTotal : cargaVerticalTotal,
        Mx : Mx,
        My : My,
        Recubrimiento : relacionRecubrimiento,
        CargaAdimensional : cargaAdimensional,
        MomentoAdimensionalX : momentoAdimensionalX,
        MomentoAdimensionalY : momentoAdimensionalY,
        CondicionalesMomentoAdimensionalX : condicionalesMomentoAdimensionalX,
        CondicionalesMomentoAdimensionalY : condicionalesMomentoAdimensionalY,
        MediatrizAm : mediatrizAm,
        MediatrizTm : mediatrizTm,
        MediatrizBm : mediatrizBm,
        DiagonalAd : diagonalAd,
        DiagonalTd : diagonalTd,
        DiagonalBd : diagonalBd,
        CoeficienteK1 : coeficienteK1,
        CoeficienteK2 : coeficienteK2,
        CoeficienteK3 : coeficienteK3,
        CuantiaRequerida : cuantiaRequerida,
        CuantiaGeometrica : cuantiaGeometrica,
        AreaLongitudinal : areaLongitudinal,
        SeparacionPorNorma : separacionNorma,
        AreaPedestal : areaPedestal,
        AreaRefuerzo : areaRefuerzo,
        SeccionTransversalAshx : seccionTransversalAshx,
        SeccionTransversalAshy : seccionTransversalAshy
    });
}

//Metodo para vaciar bases!
basesCtrl.getDatos = async (req, res, next) => {
    const bases = await Bases.find();
    listaBases = bases;
    // await Bases.remove();
    res.json(listaBases[listaBases.length - 1]);
};

//Guarda en mongodb todos los pedestales despues de estar correctos!

basesCtrl.guardarPedestal = async (req, res, next) => {
    const pedestal = new Pedestal({
        fc: req.body.fc,
        r: req.body.r,
        cx: req.body.cx,
        cy: req.body.cy,
        h: req.body.h,
        e: req.body.e,
        pesoConcreto: req.body.pesoConcreto
    })

    listaPedestal.push(pedestal);

    await pedestal.save();
    res.json({
        status: 'pedestal guardado!'
    });

}

basesCtrl.guardar = async (req, res, next) => {
    const bases = new Bases({

        bx: req.body.bx,
        by: req.body.by,
        e: req.body.e,
        cx: req.body.cx,
        cy: req.body.cy,
        h: req.body.h
    });

    var tamaño = req.body.bx.length;

    listaBases.push(bases);

    ////console.log(req.body)
    await bases.save();
    // ////console.log("El tamaño es:", tamaño);
    res.json({
        status: 'bases created',
        tamaño: tamaño
    });
};

module.exports = basesCtrl;