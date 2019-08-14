import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

//GET POSTS
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add like
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/${postId}/like`);
    dispatch({
      type: UPDATE_LIKES,
      //object로 postId와 likes라는 key값에 res.data를 넣어서 넘겨준다.
      //res.data 예상값은 : res.json(post.likes) <- 서버에서반환하는것! likes만 반환
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Remove like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/${postId}/unlike`);
    dispatch({
      type: UPDATE_LIKES,
      //object로 postId와 likes라는 key값에 res.data를 넣어서 넘겨준다.
      //res.data 예상값은 : res.json(post.likes) <- 서버에서반환하는것! likes만 반환
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete POST
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
    dispatch(setAlert("포스트를 삭제했습니다", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add POST
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      //서버에서 res.json(post);를반환한다.
      //res.data = post
      payload: res.data
    });
    dispatch(setAlert("포스트가 작성되었습니다.", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//GET POST
export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      //서버에서 res.json(post);를반환한다.
      //res.data = post
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add POST
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/posts/${postId}/comment`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      //서버에서  res.json(post.comments);를 반환한다.
      //res.data = post.comments : 포스트 안의 comments 배열!
      payload: res.data
    });
    dispatch(setAlert("댓글이 작성되었습니다.", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add POST
export const deleteComment = (postId, commentId) => async dispatch => {
  console.log(postId, commentId);
  try {
    const res = await axios.delete(`/api/posts/${postId}/comment/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      // 일단 삭제하고,
      // 무슨 CommentId 가 들어왔는지 보내주고,
      // reducer에서 filter를 이용해서 state management를 한다.
      payload: commentId
    });
    dispatch(setAlert("댓글이 작성되었습니다.", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      //요 msg는 server에서 에러나면 항상 던져주던 그 err
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
