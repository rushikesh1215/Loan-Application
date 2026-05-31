const express = require('express');
const router = express.Router();
const appController = require('../controllers/application.controller');
const { validateApplicationInput, validateStatusUpdate } = require('../middleware/validate');


router.post('/applications', validateApplicationInput, appController.createApplication);
router.get('/applications', appController.getApplications);
router.patch('/applications/:id/status', validateStatusUpdate, appController.updateApplicationStatus);


router.get('/summary', appController.getSummary);

module.exports = router;