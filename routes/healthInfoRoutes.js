// // Import dependencies
// const router = require('express').Router();
// const { createHealthInfo, getHealthInfo, updateHealthInfo } = require('../controllers/healthInfoController');
// const { authGuard } = require('../middleware/authGuard');

// // Route to create health info for a user, protected by authGuard
// router.post('/create_health_info', authGuard, createHealthInfo);

// // Route to retrieve health info for a specific user, protected by authGuard
// router.get('/get_health_info/:userId', authGuard, getHealthInfo);

// // Route to update health info for a specific user, protected by authGuard
// router.put('/update_health_info/:userId', authGuard, updateHealthInfo);

// // ... include other routes for additional CRUD operations as needed

// // Export the router
// module.exports = router;
const express = require('express');
const router = express.Router();
const healthInfoController = require('../controllers/healthInfoController'); // Adjust the path as needed


router.post('/:userId/healthinfo', healthInfoController.addOrUpdateHealthInfo);

router.get('/:userId/healthinfo', healthInfoController.getHealthInfo);

module.exports = router;
