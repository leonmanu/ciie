const express = require('express');
const router = express.Router();

// Import controller functions
const exampleController = require('../controllers/exampleController');

// Define routes and link them to controller functions
router.get('/example', exampleController.exampleFunction);

module.exports = router;