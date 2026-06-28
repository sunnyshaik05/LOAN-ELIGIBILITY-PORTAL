import { useState } from "react";
import axios from "axios";
import "./LoanForm.css";
import loanBanner from "../assets/loan-banner.png";

function LoanForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("Employed");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://loan-eligibility-portal.onrender.com/api/apply", {
        name,
        age,
        email,
        phone,
        employmentStatus,
        monthlyIncome,
        loanAmount,
        loanTenure,
      });
      setResult(response.data);
    } catch (error) {
      setResult({
        eligible: false,
        reason: "Server error. Please try again later.",
      });
    }
  };

  const resetForm = () => {
  setName("");
  setAge("");
  setEmail("");
  setPhone("");
  setEmploymentStatus("Employed");
  setMonthlyIncome("");
  setLoanAmount("");
  setLoanTenure("");
  setResult(null); // closes the modal
};



  return (
    <div className={`page ${result ? "blurred" : ""}`}>
      <div className="card">
        {/* LEFT SECTION */}
        <div className="left">
          <img src={loanBanner} className="banner" alt="Loan Banner" />
          <h1> LOAN ELIGIBILITY PORTAL <br></br><small>Your Dreams, Our Support</small></h1>
          <p>
            Fast, secure and hassle-free loan eligibility check. Get the
            financial support you deserve in just a few clicks.
          </p>

          <div className="features">
            <div className="feature">🔒 Secure & Safe</div>
            <div className="feature">⚡ Quick Processing</div>
            <div className="feature">✅ Trusted Platform</div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right">
          <h2>Applicant Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label>Full Name</label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Age</label>
                <input
                  className="input"
                  type="number"
                  min="18"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Email Address</label>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Employment Status</label>
                <select
                  className="input"
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                >
                  <option>Employed</option>
                  <option>Unemployed</option>
                </select>
              </div>

              <div>
                <label>Monthly Income</label>
                <input
                  className="input"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Loan Amount</label>
                <input
                  className="input"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Loan Tenure (Months)</label>
                <input
                  className="input"
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="button">Apply for Loan</button>
          </form>
        </div>
      </div>

      {/* RESULT MODAL */}
      {result && (
        <div className="modal">
          <div className="modal-content">
            <h2>{result.eligible ? "Loan Approved 🎉" : "Loan Not Approved ❌"}</h2>
            <p><strong>Applicant:</strong> {name}</p>
            <p><strong>Status:</strong> {result.eligible ? "Eligible" : "Not Eligible"}</p>
            <p><strong>Loan Amount:</strong> ₹{loanAmount}</p>
            <p><strong>Loan Tenure:</strong> {loanTenure} Months</p>
            <p><strong>Monthly Income:</strong> ₹{monthlyIncome}</p>
            <p><strong>Reason:</strong> {result.reason}</p>
           <button 
  type="button" 
  className="done-btn" 
  onClick={resetForm}
>
  Done ✓
</button>

          </div>
        </div>
      )}
    </div>
  );
}

export default LoanForm;