import { combineReducers } from 'redux';
import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  POSTS_ORDER_BY,
  UPDATE_VOTE_POST,
  LOAD_COMMENTS,
  UPDATE_VOTE_COMMENT,
  SET_POST
} from '../actions'

const categoriesReducer = (state = { categories:[] }, action) => {
  if ( action.type === LOAD_CATEGORIES ) {
    const categories = action.categories;
    return { ...state, categories };    
  }
  return state;
}

const postReducer = (state = { posts:[], orderBy: 'voteScore', post:{}}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      const posts = action.posts;
      return { ...state, posts };
    case POSTS_ORDER_BY:
      const orderBy = action.orderBy;
      return { ...state, orderBy };
    case UPDATE_VOTE_POST:
      const postUpdate = action.post;
      const postsUpdate = state.posts.map(post => {
        if(post.id === postUpdate.id){
          return postUpdate;
        }
        return post;
      })
      return {...state, posts: postsUpdate, post: postUpdate };
    case SET_POST:
      const setPost = action.post;
      return { ...state, post: setPost };
    default:
      return state;
  }
}

const commentReducer = (state = { comments:[] }, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      const comments = action.comments;
      return { ...state, comments };
    case UPDATE_VOTE_COMMENT:
      const commentUpdate = action.comment;
      const commentsUpdate = state.comments.map(comment => {
        if(comment.id === commentUpdate.id){
          return commentUpdate;
        }
        return comment;
      })
      return {...state, comments: commentsUpdate };
    default:
      return state;
  }
}

export default combineReducers({
  categories: categoriesReducer,
  posts: postReducer,
  comments: commentReducer
});
