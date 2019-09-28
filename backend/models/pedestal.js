const mongoose = require('mongoose');
const { Schema } = mongoose;

const pedestalSchema = new Schema({
    fc: [{ type: Number }],
    r: [{ type: Number }],
    cx:  [{ type: Number }],
    cy: [{ type: Number }],
    h: [{ type: Number }],
    e:  [{ type: Number }],
    pesoConcreto: [{ type: Number }]
});

module.exports = mongoose.model('Pedestal', pedestalSchema);