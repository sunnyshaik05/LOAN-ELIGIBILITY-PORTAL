const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  employmentStatus: {
    type: String,
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  loanTenure: {
    type: Number,
    required: true,
  },
  eligible: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Applicant", applicantSchema);