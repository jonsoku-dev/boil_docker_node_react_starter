import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEdu } from "../../store/actions/profile";

const Edu = ({ education, deleteEdu }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? " Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
      </td>
      <td>
        <button onClick={() => deleteEdu(edu._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">학력란</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide sm">Degree</th>
            <th className="hide sm">Years</th>
            <th />
          </tr>
        </thead>

        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Edu.propTypes = {
  deleteEdu: PropTypes.func.isRequired,
  education: PropTypes.array
};

export default connect(
  null,
  { deleteEdu }
)(Edu);
