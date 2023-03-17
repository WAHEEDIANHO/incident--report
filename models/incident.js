const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incidentsSchema = new Schema(
  {
      description: { type: String, required: true },
      address: { type: String, required: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },
    reportedTime: { type: Date, required: true },
    reportedBy: { type: String, required: true },
    securityAgent: { type: String, required: true },
    progressNote: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentsSchema);
