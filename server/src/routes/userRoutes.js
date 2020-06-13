const {Router} = require('express');
const router = Router();

const userController = require('../controllers/userController');
router.get('/list/', userController.list);
router.post('/checkuser/', userController.checkuser);
router.post('/registerUser/', userController.registerUser);
router.post('/registerCompany/', userController.registerCompany);

module.exports = router;
