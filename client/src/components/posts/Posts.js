import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "../layout";
import { getPosts } from "../../store/actions/post";
import { PostItem, PostForm } from ".";

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome to the Tamastudy
      </p>
      <PostForm />
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  getPosts: PropTypes.func.isRequired,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
