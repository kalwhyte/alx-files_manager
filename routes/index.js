/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');

const AppController = require('../controllers/AppController');

const router = express.Router();

// Endpoint: GET /status => AppController.getStatus
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
