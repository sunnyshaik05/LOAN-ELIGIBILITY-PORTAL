const express = require("express");
const router = express.Router();

const controller = require("../controllers/applicantController");

router.post("/apply", controller.applyLoan);

module.exports = router;