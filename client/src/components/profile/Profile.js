import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "../layout";
import { getProfileById } from "../../store/actions/profile";
import { ProfileTop, ProfileAbout, ProfileExp, ProfileEdu, ProfileGithub } from ".";

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuth && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-1">
              <h2 className="text-primary">경력</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(exp => (
                    <ProfileExp key={exp._id} exp={exp} />
                  ))}
                </>
              ) : (
                <h4>경력정보가 존재하지 않습니다. </h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">학력</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(edu => (
                    <ProfileEdu key={edu._id} edu={edu} />
                  ))}
                </>
              ) : (
                <h4>학력정보가 존재하지 않습니다. </h4>
              )}
            </div>

            {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
