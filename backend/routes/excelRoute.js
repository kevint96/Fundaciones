const express = require('express');
const router = express.Router();

const excel = require('../controllers/excel.controller');


router.get('/', excel.getDatos);
router.post('/establecer', excel.getCargaEstablecida);
router.post('/darBases', excel.guardar);
router.post('/seleccionarCarga', excel.seleccionarCarga);

module.exports = router;