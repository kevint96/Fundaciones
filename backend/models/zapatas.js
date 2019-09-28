const mongoose = require('mongoose');
const { Schema } = mongoose;

const zapatasSchema = new Schema({
    _id: { type: Number },
    pesoSuelo: { type: Number, required: true},
    pesoConcreto: { type: Number, required: true},
    diametroAcero: { type: Number, required: true},
    pesoZapata: { type: Number, required: true},
    cargaViva: { type: Number, required: true},
    cargaMuerta: { type: Number, required: true},
    cargaAdmisibleSuelo: { type: Number, required: true},
    factorMayoracion: { type: Number, required: true},
    factorMayoracionUsuario: { type: Number, required: true}
});

module.exports = mongoose.model('Zapatas', zapatasSchema);
