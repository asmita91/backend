

const HealthInfo = require('../model/healthInfoModel');
const Calendar = require('../model/calendarModel');

// // Assuming you have a function to calculate the next periods based on the user's health info

const calculatePeriodDates = (lastPeriodDate, periodDays, periodInterval) => {
  console.log(`Last period date: ${lastPeriodDate}, Period days: ${periodDays}, Period interval: ${periodInterval}`);

  const nextPeriodStart = new Date(lastPeriodDate);
  nextPeriodStart.setDate(nextPeriodStart.getDate() + periodInterval);
  console.log(`Next period start: ${nextPeriodStart}`);

  const nextPeriodEnd = new Date(nextPeriodStart);
  nextPeriodEnd.setDate(nextPeriodEnd.getDate() + periodDays - 1); // Assuming the period starts on the first day
  console.log(`Next period end: ${nextPeriodEnd}`);

  const ovulationDay = new Date(nextPeriodStart);
  ovulationDay.setDate(ovulationDay.getDate() - 14);
  console.log(`Ovulation day: ${ovulationDay}`);

  const fertileWindowStart = new Date(ovulationDay);
  fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);
  const fertileWindowEnd = new Date(ovulationDay);
  console.log(`Fertile window start: ${fertileWindowStart}, Fertile window end: ${fertileWindowEnd}`);

  return [
    { type: 'periodStart', date: nextPeriodStart },
    { type: 'periodEnd', date: nextPeriodEnd },
    { type: 'ovulationDay', date: ovulationDay },
    { type: 'fertileWindowStart', date: fertileWindowStart },
    { type: 'fertileWindowEnd', date: fertileWindowEnd }
  ];
};


exports.addOrUpdateHealthInfo = async (req, res) => {
  const  userId  = req.params.userId; 
  const {
    age,
    height,
    weight,
    lastPeriodDate,
    periodDays,
    periodInterval,
    isRegularPeriod,
    hasCramps
  } = req.body;

  try {
    // Update or create health info
    let healthInfo = await HealthInfo.findOneAndUpdate(
      { userId },
      { age, height, weight, lastPeriodDate, periodDays, periodInterval, isRegularPeriod, hasCramps },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Calculate the next period dates and any other related data
    const periodEvents = calculatePeriodDates(lastPeriodDate, periodDays, periodInterval);

    // Update or create calendar events
    const calendar = await Calendar.findOneAndUpdate(
      { userId },
      { $set: { events: periodEvents } },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Health information and calendar updated successfully',
      data: {
        healthInfo,
        calendarEvents: calendar.events
      }
    });
  } catch (error) {
    console.error('HealthInfoController.addOrUpdateHealthInfo:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
// HealthInfoController.js
// ... (other parts of the file remain unchanged)

// Function to get a user's health info
exports.getHealthInfo = async (req, res) => {
  const {userId} = req.params;
  console.log(req.params)

  try {
    // Find the health info for the given userId
    const healthInfo = await HealthInfo.findOne({ userId }).populate('userId', 'firstName lastName email');

    // If no health info is found, return a 404 error
    if (!healthInfo) {
      return res.status(404).json({
        success: false,
        message: "Health information not found for the provided user ID."
      });
    }

    // If health info is found, return it to the client
    res.json({
      success: true,
      message: 'Health information retrieved successfully',
      data: healthInfo
    });

  } catch (error) {
    // Log the error and return a 500 internal server error status
    console.error('HealthInfoController.getHealthInfo:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving health information',
      error: error.message
    });
  }
};
