const router = require('express').Router();
const { signup, getbill } = require('../controllers/controller.js')


router.post('/user/signup',signup);
router.post('/product/getbill',getbill);

module.exports = router;