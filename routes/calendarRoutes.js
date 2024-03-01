const express = require('express');
const router = express.Router();

const CalendarController = require('../controllers/calendarController'); 

router.get('/user/:userId/calendar', CalendarController.getUserCalendarEvents);
module.exports = router;
