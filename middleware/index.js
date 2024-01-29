const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.get('/api/smartfins/check_route', verifikasi, auth.checkRoute);
router.post('/api/smartfins/registerUser', auth.registerUser);
router.post('/api/smartfins/loginUser', auth.loginUser);
router.get('/api/smartfins/getDevice', verifikasi, auth.viewDeviceByUser);
router.post('/api/smartfins/insertDevice', verifikasi, auth.insertDevice);

module.exports = router;
