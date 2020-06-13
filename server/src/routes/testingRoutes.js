const {Router} = require('express');
const router = Router();

const testingController = require('../controllers/testingController') ;
//router.get('getList/:id/:ruc/:envio', testingController.testing_list);
router.get('/list/', testingController.testing2_list);
//router.post('/',testingController.textingpost_list);

module.exports = router;
