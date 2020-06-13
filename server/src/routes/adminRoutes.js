const {Router} = require('express');
const router = Router();

const adminController = require('../controllers/adminController');
router.get('/listUser/:ruc', adminController.listUser);
router.post('/addUser/', adminController.addUser);
router.post('/updateUser/', adminController.updateUser);
router.post('/deleteUser/', adminController.deleteUser);

module.exports = router;
