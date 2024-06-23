import React, { useState } from "react";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
    }
    if (
      ["Developer", "Designer"].includes(formData.position) &&
      !formData.relevantExperience
    ) {
      newErrors.relevantExperience = "Relevant Experience is required";
    } else if (
      formData.relevantExperience &&
      formData.relevantExperience <= 0
    ) {
      newErrors.relevantExperience =
        "Relevant Experience must be greater than 0";
    }
    if (formData.position === "Designer" && !formData.portfolioURL) {
      newErrors.portfolioURL = "Portfolio URL is required";
    } else if (
      formData.portfolioURL &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioURL)
    ) {
      newErrors.portfolioURL = "Portfolio URL is invalid";
    }
    if (formData.position === "Manager" && !formData.managementExperience) {
      newErrors.managementExperience = "Management Experience is required";
    }
    if (!Object.values(formData.additionalSkills).some((skill) => skill)) {
      newErrors.additionalSkills = "At least one skill must be selected";
    }
    if (!formData.preferredInterviewTime) {
      newErrors.preferredInterviewTime = "Preferred Interview Time is required";
    } else if (new Date(formData.preferredInterviewTime) <= new Date()) {
      newErrors.preferredInterviewTime =
        "Preferred Interview Time must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  const renderSummary = () => (
    <div className="form-summary">
      <h2>Form Summary</h2>
      <p>
        <strong>Full Name:</strong> {submittedData.fullName}
      </p>
      <p>
        <strong>Email:</strong> {submittedData.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {submittedData.phoneNumber}
      </p>
      <p>
        <strong>Applying for Position:</strong> {submittedData.position}
      </p>
      {["Developer", "Designer"].includes(submittedData.position) && (
        <p>
          <strong>Relevant Experience (years):</strong>{" "}
          {submittedData.relevantExperience}
        </p>
      )}
      {submittedData.position === "Designer" && (
        <p>
          <strong>Portfolio URL:</strong> {submittedData.portfolioURL}
        </p>
      )}
      {submittedData.position === "Manager" && (
        <p>
          <strong>Management Experience:</strong>{" "}
          {submittedData.managementExperience}
        </p>
      )}
      <p>
        <strong>Additional Skills:</strong>{" "}
        {Object.entries(submittedData.additionalSkills)
          .filter(([skill, selected]) => selected)
          .map(([skill]) => skill)
          .join(", ")}
      </p>
      <p>
        <strong>Preferred Interview Time:</strong>{" "}
        {new Date(submittedData.preferredInterviewTime).toLocaleString()}
      </p>
    </div>
  );

  return (
    <div>
      {submittedData ? (
        renderSummary()
      ) : (
        <form onSubmit={handleSubmit} className="job-application-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="form-group">
            <label>Applying for Position:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.position && (
              <span className="error">{errors.position}</span>
            )}
          </div>
          {["Developer", "Designer"].includes(formData.position) && (
            <div className="form-group">
              <label>Relevant Experience (years):</label>
              <input
                type="number"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                required
              />
              {errors.relevantExperience && (
                <span className="error">{errors.relevantExperience}</span>
              )}
            </div>
          )}
          {formData.position === "Designer" && (
            <div className="form-group">
              <label>Portfolio URL:</label>
              <input
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
                required
              />
              {errors.portfolioURL && (
                <span className="error">{errors.portfolioURL}</span>
              )}
            </div>
          )}
          {formData.position === "Manager" && (
            <div className="form-group">
              <label>Management Experience:</label>
              <input
                type="text"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                required
              />
              {errors.managementExperience && (
                <span className="error">{errors.managementExperience}</span>
              )}
            </div>
          )}
          <div className="form-group">
            <label>Additional Skills:</label>
            <label>
              <input
                type="checkbox"
                name="JavaScript"
                checked={formData.additionalSkills.JavaScript}
                onChange={handleChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="CSS"
                checked={formData.additionalSkills.CSS}
                onChange={handleChange}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                name="Python"
                checked={formData.additionalSkills.Python}
                onChange={handleChange}
              />
              Python
            </label>
            {errors.additionalSkills && (
              <span className="error">{errors.additionalSkills}</span>
            )}
          </div>
          <div className="form-group">
            <label>Preferred Interview Time:</label>
            <input
              type="datetime-local"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
              required
            />
            {errors.preferredInterviewTime && (
              <span className="error">{errors.preferredInterviewTime}</span>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default JobApplicationForm;
