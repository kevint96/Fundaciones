const Resultados = require('../models/resultados');

const resultadosCtrl = {};

var listaResultados = [];

resultadosCtrl.getDatos = async (req, res, next) => {
    const resultados = await Resultados.find();
    listaCargas = resultados;
    var tamaño = listaCargas.length;
    res.json({
        cantidad: tamaño,
        listaCargas: listaCargas,
        ultimaCarga: listaCargas[listaCargas.length - 1]
    });
};

//Metodo para vaciar resultados!
resultadosCtrl.getResultados = async (req, res, next) => {
    const resultados = await Resultados.find();
    listaResultados = resultados;
    // await Resultados.remove();
    res.json(resultados);
    // //console.log("ultima: " + listaResultados[listaResultados.length - 1]);    
    // //console.log("Tamaño: " + listaResultados.length);
    // //console.log("Lista:" + listaResultados);
};

resultadosCtrl.eliminarResultado = async (req, res, next) => {

    //console.log("------------AQUI EMPIEZA EL ELIMINAR RESULTADO")

    const resultados = await Resultados.find();
    listaResultados = resultados;

    //console.log("Tamaño :" + listaResultados.length);

    // //console.log("Lista resultados: "+listaResultados);
    // //console.log("Resultados:" + resultados);

    var id = req.body.id;

    //console.log("id: " + id);

    await Resultados.deleteOne({"_id": id});


    //console.log("Tamaño after :" + listaResultados.length);

}

resultadosCtrl.guardarResultadosPedestal = async (req, res, next) => {

    //console.log("------------AQUI EMPIEZA EL RESULTADOSPEDESTAL")

    const resultados = await Resultados.find();
    listaResultados = resultados;

    //console.log("Lista resultados: "+listaResultados);
    // //console.log("Resultados:" + resultados);

    var idUltimo = listaResultados[listaResultados.length-1]._id;

    //console.log("IDULTIMO--------------->" + idUltimo);

    id= idUltimo;

    //console.log("id: " + id);

    //Se modifica datos de mongoDB
    const j = await Resultados.update({ _id: id }, {
        $set: {
            pedestal_pesoPedestal: req.body.pedestal_pesoPedestal,
            pedestal_cargaVerticalTotal: req.body.pedestal_cargaVerticalTotal,
            pedestal_Mx: req.body.pedestal_Mx,
            pedestal_My: req.body.pedestal_My,
            pedestal_relacionRecubrimiento: req.body.pedestal_relacionRecubrimiento,
            pedestal_cargaAdimensional: req.body.pedestal_cargaAdimensional,
            pedestal_momentoAdimensionalX: req.body.pedestal_momentoAdimensionalX,
            pedestal_momentoAdimensionalY: req.body.pedestal_momentoAdimensionalY,
            pedestal_condicionalesMomentoAdimensionalX: req.body.pedestal_condicionalesMomentoAdimensionalX,
            pedestal_condicionalesMomentoAdimensionalY: req.body.pedestal_condicionalesMomentoAdimensionalY,
            pedestal_mediatrizAm: req.body.pedestal_mediatrizAm,
            pedestal_mediatrizTm: req.body.pedestal_mediatrizTm,
            pedestal_mediatrizBm: req.body.pedestal_mediatrizBm,
            pedestal_diagonalAd: req.body.pedestal_diagonalAd,
            pedestal_diagonalTd: req.body.pedestal_diagonalTd,
            pedestal_diagonalBd: req.body.pedestal_diagonalBd,
            pedestal_coeficienteK1: req.body.pedestal_coeficienteK1,
            pedestal_coeficienteK2: req.body.pedestal_coeficienteK2,
            pedestal_coeficienteK3: req.body.pedestal_coeficienteK3,
            pedestal_cuantiaRequerida: req.body.pedestal_cuantiaRequerida,
            pedestal_cuantiaGeometrica: req.body.pedestal_cuantiaGeometrica,
            pedestal_areaLongitudinal: req.body.pedestal_areaLongitudinal,
            pedestal_separacionNorma: req.body.pedestal_separacionNorma,
            pedestal_areaPedestal: req.body.pedestal_areaPedestal,
            pedestal_areaRefuerzo: req.body.pedestal_areaRefuerzo,
            pedestal_seccionTransversalAshx: req.body.pedestal_seccionTransversalAshx,
            pedestal_seccionTransversalAshy: req.body.pedestal_seccionTransversalAshy,
            pedestal_fc: req.body.pedestal_fc,
            pedestal_r: req.body.pedestal_r,
            pedestal_pesoConcreto: req.body.pedestal_pesoConcreto,
            pedestal_e: req.body.pedestal_e,
            pedestal_cx: req.body.pedestal_cx,
            pedestal_cy: req.body.pedestal_cy,
            pedestal_h: req.body.pedestal_h,
        }
    });

    //Se modifica datos de mongoDB
    // const j = await resultados.update({_id: '5d615037134e6621d84d149a'}, {$set: {resultados: req.body.resultados}});

    res.json({
        status: 'Se actualizaron los datos!'
    });

    //console.log("LISTA DE RESULTADOS--------------------------------");
    //console.log(req.body);

}



resultadosCtrl.guardarResultados = async (req, res, next) => {

    const num = await Resultados.find();
    listaresultados = num;

    var id;

    if (listaresultados.length == 0) {
        id = 1;
        // await resultados.remove();
    }
    else if (listaresultados.length > 0) {
        var idUltimo = listaresultados[listaresultados.length-1]._id;

        //console.log("IDULTIMO--------------->" + idUltimo);

        id = idUltimo+1;
    }

    const resultados = new Resultados({
        _id: id,
        pesoSuelo: req.body.pesoSuelo,
        pesoConcreto: req.body.pesoConcreto,
        diametroAcero: req.body.diametroAcero,
        pesoZapata: req.body.pesoZapata,
        cargaViva: req.body.cargaViva,
        cargaMuerta: req.body.cargaMuerta,
        cargaAdmisibleSuelo: req.body.cargaAdmisibleSuelo,
        factorMayoracion: req.body.factorMayoracion,
        fx: req.body.fx,
        fy: req.body.fy,
        fz: req.body.fz,
        mx: req.body.mx,
        my: req.body.my,
        mz: req.body.mz,
        bx: req.body.bx,
        by: req.body.by,
        e: req.body.e,
        cx: req.body.cx,
        cy: req.body.cy,
        h: req.body.h,
        listaPesoZapata: req.body.listaPesoZapata,
        listaPesoPedestal: req.body.listaPesoPedestal,
        listaPesoSuelo: req.body.listaPesoSuelo,
        listaCargaVertical: req.body.listaCargaVertical,
        listaMomentoActuanteMX: req.body.listaMomentoActuanteMX,
        listaMomentoActuanteMY: req.body.listaMomentoActuanteMY,
        A: req.body.A,
        Ly: req.body.Ly,
        QMax: req.body.QMax,
        QMin: req.body.QMin,
        Mdx: req.body.Mdx,
        Mdy: req.body.Mdy,
        Ax: req.body.Ax,
        Ay: req.body.Ay,
        Asx: req.body.Asx,
        Asy: req.body.Asy,
        Vx: req.body.Vx,
        Vy: req.body.Vy,
        Vc: req.body.Vc,
        Vpuz: req.body.Vpuz,
        Vcon: req.body.Vcon,
    });



    // { _id: false }

    //Se guarda el nuevo dato en mongoDB
    await resultados.save();

    //Se modifica datos de mongoDB
    // const j = await resultados.update({_id: '5d615037134e6621d84d149a'}, {$set: {resultados: req.body.resultados}});

    res.json({
        status: 'Se agregaron los datos!'
    });

    // //console.log("LISTA DE RESULTADOS--------------------------------");
    // //console.log(req.body);

}
module.exports = resultadosCtrl;