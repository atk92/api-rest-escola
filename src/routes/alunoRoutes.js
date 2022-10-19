const { Router } = require('express');
const router = new Router();

//--Middlewares
const loginRequired = require('../middlewares/loginRequired');
//--Controller
const AlunoController = require('../controllers/AlunoController');

router.get('/', AlunoController.index);
router.post('/', AlunoController.store);
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id', AlunoController.delete);
router.get('/:id', AlunoController.show);



module.exports = router;

