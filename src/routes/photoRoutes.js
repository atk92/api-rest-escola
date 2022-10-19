
const { Router } = require('express');
const router = new Router();

//--Middlewares
const loginRequired = require('../middlewares/loginRequired');
//--Controller
const PhotoController = require('../controllers/PhotoController');

// router.get('/',  PhotoController.index);
router.post('/', PhotoController.store);



module.exports = router;
