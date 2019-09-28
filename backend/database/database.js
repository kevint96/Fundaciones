const mongoose = require('mongoose');
const URI = 'mongodb://localhost/fundaciones';
//CONST URI

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true
})
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;