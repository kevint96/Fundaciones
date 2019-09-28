const express = require('express');
const router = express.Router();

const zapatas = require('../controllers/zapatas.controller');
const excel = require('../controllers/excel.controller');


router.get('/', zapatas.getZapatas);
router.get('/darZapata', zapatas.darZapata);
router.post('/seleccionarZapata', zapatas.seleccionarZapata);
router.get('/darBases', zapatas.darBases);
router.post('/', zapatas.sumar);
router.post('/AgregarBases',zapatas.agregarBases);
router.post('/', excel.guardar);
router.post('/bases', zapatas.bases);
router.post('/eliminarZapatas', zapatas.eliminarZapatas);


module.exports = router;


