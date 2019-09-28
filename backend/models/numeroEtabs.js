const mongoose = require('mongoose');
const { Schema } = mongoose;

const numeroEtabsSchema = new Schema({
    numeroEtabs: { type: Number, required: true},
    irPedestal: { type: Boolean, required: true}
});

module.exports = mongoose.model('numeroEtabs', numeroEtabsSchema);