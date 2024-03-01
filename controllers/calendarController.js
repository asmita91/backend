const Calendar = require('../model/calendarModel'); 

exports.getUserCalendarEvents = async (req, res) => {
  const { userId } = req.params; 
  try {
    const calendarEvents = await Calendar.findOne({ userId });
    if (!calendarEvents) {
      return res.status(404).json({ message: 'Calendar events not found' });
    }
    res.json(calendarEvents);
  } catch (error) {
    console.error('CalendarController.getUserCalendarEvents:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
