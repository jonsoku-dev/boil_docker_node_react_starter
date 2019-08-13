import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile, deleteAccount } from "../../store/actions/profile";
import Spinner from "../layout/Spinner";
import { DashboardActions } from ".";
import { Exp, Edu } from ".";

const Dashboard = ({
  deleteAccount,
  getProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> {user && user.name}님 환영합니다!
      </p>
      {profile != null ? (
        <>
          <DashboardActions />
          <Exp experience={profile.experience} />
          <Edu education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user minus" />
              계정삭제
            </button>
          </div>
        </>
      ) : (
        <>
          <p>프로필이 존재하지않습니다. 프로필을 생성해주세요 !</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToState = state => ({
  deleteAccount: PropTypes.func.isRequired,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToState,
  { getProfile, deleteAccount }
)(Dashboard);
