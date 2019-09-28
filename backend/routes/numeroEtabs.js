const express = require('express');
const router = express.Router();

const numeroEtabs = require('../controllers/numeroEtabs.controller');


router.get('/', numeroEtabs.getDatos);
router.get('/darNumeroEtabs', numeroEtabs.getNumeroEtabs)
router.post('/guardarNumeroEtabs', numeroEtabs.guardarNumeroEtabs);

module.exports = router;