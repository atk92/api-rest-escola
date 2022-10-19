const { Router } = require('express');
const router = new Router();
//Middlewares
const loginRequired = require('../middlewares/loginRequired');
//Rotas
const UserController = require('../controllers/UserController');

router.get('/', UserController.index);
router.get('/:id',loginRequired, UserController.show);
// Não deveria existir...


router.post('/', UserController.store);
router.put('/',loginRequired, UserController.update);
router.delete('/',loginRequired, UserController.delete);

module.exports = router;
