const express = require('express');
const router = express.Router();

const resultados = require('../controllers/resultados.controller');


router.get('/', resultados.getDatos);
router.get('/darResultados', resultados.getResultados)
router.post('/guardarResultados', resultados.guardarResultados);
router.post('/guardarResultadosPedestal', resultados.guardarResultadosPedestal);
router.post('/eliminarResultados', resultados.eliminarResultado);

module.exports = router;