console.log("Applicant Controller Loaded");
const Applicant = require("../models/Applicant");

const applyLoan = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      phone,
      employmentStatus,
      monthlyIncome,
      loanAmount,
      loanTenure,
    } = req.body;

    let eligible = false;
    let reason = "";

    // Eligibility Logic
    if (age < 21 || age > 60) {
      reason = "Age should be between 21 and 60.";
    } else if (employmentStatus !== "Employed") {
      reason = "Applicant must be employed.";
    } else if (monthlyIncome < 30000) {
      reason = "Monthly income should be at least 30000.";
    } else if (loanAmount > monthlyIncome * 60) {
      reason = "Requested loan amount is too high.";
    } else {
      eligible = true;
      reason = "Congratulations! You are eligible for the loan.";
    }

    const applicant = new Applicant({
      name,
      age,
      email,
      phone,
      employmentStatus,
      monthlyIncome,
      loanAmount,
      loanTenure,
      eligible,
      reason,
    });

    await applicant.save();
    console.log("SAVED DATA:", applicant);

    res.status(201).json({
      success: true,
      eligible,
      reason,
      applicant,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

console.log("BEFORE EXPORT");
console.log({ applyLoan });

module.exports = { applyLoan };