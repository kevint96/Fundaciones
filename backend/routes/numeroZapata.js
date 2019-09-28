const express = require('express');
const router = express.Router();

const numeroZapata = require('../controllers/numeroZapata.controller');


router.get('/', numeroZapata.getDatos);
router.get('/darNumeroZapata', numeroZapata.getNumeroZapata)
router.post('/guardarNumeroZapata', numeroZapata.guardarNumeroZapata);

module.exports = router;