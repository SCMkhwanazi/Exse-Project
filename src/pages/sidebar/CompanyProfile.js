import React, { useState } from "react";
import "./CompanyProfile.css";

const CompanyProfile = () => {
  const [companyName, setCompanyName] = useState("My Awesome Store");
  const [isEditingName, setIsEditingName] = useState(false);

  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const handleSave = () => {
    alert("Company details saved successfully!");
  };

  return (
    <div className="company-profile">
      <div className="profile-container">

        {/* Card 1 - Company Profile Info */}
        <div className="vpromo-header ">
          <h2>Company Profile</h2>
          <p >
            Update your business data
          </p>
        </div>

        {/* Card 2 - Company Details */}
        <div className="profile-card">
          
          {/* Company Name Section */}
          <div className="company-name-section">
            <h3>Company Name</h3>

            {isEditingName ? (
              <div className="edit-name">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <button
                  className="save-small-btn"
                  onClick={() => setIsEditingName(false)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="company-name-display">
                <h4>{companyName}</h4>
                <button
                  className="edit-btn"
                  onClick={() => setIsEditingName(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Payout Details */}
          <div className="payout-section">
            <h3>Payout Details</h3>

            <div className="form-group">
              <label>Bank</label>
              <select value={bank} onChange={(e) => setBank(e.target.value)}>
                <option value="">Select Bank</option>
                <option value="Capitec">Capitec</option>
                <option value="Absa">Absa</option>
                <option value="Nedbank">Nedbank</option>
                <option value="FNB">FNB</option>
              </select>
            </div>

            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Account Holder</label>
              <input
                type="text"
                placeholder="Enter account holder name"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
              />
            </div>

            <button className="save-btn" onClick={handleSave}>
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;