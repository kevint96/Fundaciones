const express = require('express');
const router = express.Router();

const bases = require('../controllers/bases.controller');


router.get('/', bases.getDatos);
router.post('/agregarBase', bases.guardar);
router.post('/calcularBase', bases.calcular);

module.exports = router;