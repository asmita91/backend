const mongoose = require("mongoose");

const healthInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    }, 
    age: { type: Number, required: true },
    height: { type: Number, required: true }, 
    weight: { type: Number, required: true }, 
    lastPeriodDate: { type: Date, required: true },
    periodDays: { type: Number, required: true },
    periodInterval: { type: Number, required: true }, // in days
    isRegularPeriod: { type: Boolean, default: false },
    hasCramps: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const HealthInfo = mongoose.model("HealthInfo", healthInfoSchema);

module.exports = HealthInfo;
