const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.get('/api/v1/check_route', auth.checkRoute);
