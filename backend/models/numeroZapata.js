const mongoose = require('mongoose');
const { Schema } = mongoose;

const numeroZapataSchema = new Schema({
    numeroZapata: { type: Number, required: true}
});

module.exports = mongoose.model('numeroZapata', numeroZapataSchema);