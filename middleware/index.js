const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.get('/api/v1/check_route', auth.checkRoute);
router.post('/api/smartfins/registerUser', auth.registerUser);
router.post('/api/smartfins/loginUser', auth.loginUser);
router.get('/api/smartfins/getDevice', auth.viewSensor);
module.exports = router;
