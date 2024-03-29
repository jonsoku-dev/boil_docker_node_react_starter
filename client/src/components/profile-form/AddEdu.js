import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEdu } from "../../store/actions/profile";

const AddEdu = ({ addEdu, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const handleInputChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const handleSubmit = e => {
    e.preventDefault();
    addEdu(formData, history);
  };
  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* school"
            name="school"
            value={school}
            onChange={e => handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* degree"
            name="degree"
            value={degree}
            onChange={e => handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* fieldofstudy"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={e => handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>* From Date</h4>
          <input type="date" name="from" value={from} onChange={e => handleInputChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => handleInputChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => handleInputChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddEdu.propTypes = {
  addEdu: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEdu }
)(withRouter(AddEdu));
