var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicleta');

// ruta raiz
router.get('/', bicicletaController.bicicleta_list);

// ruta CREATE
router.get('/create', bicicletaController.bicicleta_create_get);
router.post('/create', bicicletaController.bicicleta_create_post);

// ruta UPDATE
router.get('/:id/update', bicicletaController.bicicleta_update_get);
router.post('/:id/update', bicicletaController.bicicleta_update_post);

// ruta DELETE con parametro
router.post('/:id/delete', bicicletaController.bicicleta_delete_post);


module.exports = router;