const mongooseExcel = require('mongoose');
const { Schema } = mongooseExcel;

const excelSchema = new Schema({
    base: [{type: Number}],
    fx: [{type: Number}],
    fy: [{type: Number}],
    fz: [{type: Number}],
    mx: [{type: Number}],
    my: [{type: Number}],
    mz: [{type: Number}],
    irPedestal: [{type: Boolean}]
});

module.exports = mongooseExcel.model('excel', excelSchema);
