/*
 * action types
 */
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_POSTS = 'LOAD_POSTS';
export const POSTS_ORDER_BY = 'POSTS_ORDER_BY';
export const UPDATE_VOTE_POST = 'UPDATE_VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const UPDATE_VOTE_COMMENT = 'UPDATE_VOTE_COMMENT';
export const SET_POST = 'SET_POST';

/*
 * action creators
 */
export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories
});

export const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts
});

export const orderBy = (orderBy) => ({
  type: POSTS_ORDER_BY,
  orderBy
});

export const updateVotePost = (post) => ({
  type: UPDATE_VOTE_POST,
  post
});

export const deletePost = id => ({
  type: DELETE_POST,
  id
});

export const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
});

export const updateVoteComment = (comment) => ({
  type: UPDATE_VOTE_COMMENT,
  comment
});

export const setPost = (post) => ({
  type: SET_POST,
  post
});
