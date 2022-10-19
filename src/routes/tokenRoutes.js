const { Router } = require('express');
const router = new Router();

//--
const TokenController = require('../controllers/TokenController');

router.post('/', TokenController.store);



module.exports = router;
