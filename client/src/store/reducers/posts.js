import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        //posts 안에 post를 밀어넣는다. payload : res.data
        // res.data = post
        // 즉, posts: [post, ...state.posts]
        // post를 앞에두는 이유는 화면에 post를 위에 두려고
        posts: [payload, ...state.posts],
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // 1. 현재 GET_POSTS 즉 POST LIST에서 like/unlike를 하는 것
        // 2. 그러므로 전체 posts에서 찾아야한다. (posts.map을 사용하는 이유)
        // 3. post._id : Posts를 돌면서 id값을 띄우고,
        // 4. payload.id : 좋아요를 누른 post id 를 찾아서
        // 5. (if) 이 두개가 일치한다면 { ...post, likes: payload.likes }
        // 6. 일단 기존 post를 복사하고, likes 부분에 actions에서 넘어온 payload.likes를 넣는다.
        // 7. (else) 아니라면 그냥 post 그대로 !
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload }
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload)
        },
        loading: false
      };
    default:
      return state;
  }
}
