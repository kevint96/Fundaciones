const mongooseExcel = require('mongoose');
const URI = 'mongodb://localhost/etabs';

// mongooseExcel.connect(URI)
//     .then(db => console.log('Exceldb is connected'))
//     .catch(err => console.error(err));

module.exports = mongooseExcel;