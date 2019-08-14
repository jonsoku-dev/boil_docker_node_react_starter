import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../store/actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        class="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          value={text}
          cols="30"
          rows="5"
          placeholder="Create a Comment"
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
