const mongoose = require('mongoose');
const { Schema } = mongoose;

const basesSchema = new Schema({
    bx: [{ type: Number }],
    by: [{ type: Number }],
    e:  [{ type: Number }],
    cx: [{ type: Number }],
    cy: [{ type: Number }],
    h:  [{ type: Number }],
    numeroEtabs: Number,
    numeroZapata: Number
});

module.exports = mongoose.model('Bases', basesSchema);