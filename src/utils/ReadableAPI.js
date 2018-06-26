const api = `http://localhost:3001`;

export const getCategories = () =>
  fetch(`${api}/categories`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json())
    .then(data => data.categories);

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const getPosts = () =>
   fetch(`${api}/posts`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const getPostById = (id) =>
  fetch(`${api}/posts/${id}`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const updateVotingPost = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json());

export const addPost = ({id, timestamp, title, body, author, category}) =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
    body: JSON.stringify({
      id,
      timestamp,
      title,
      body,
      author,
      category })
  });

export const editPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: "PUT",
    headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
    body: JSON.stringify({
      title,
      body })
  });

export const getCommentsByPostId = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(res => res.json());

export const updateVotingComment = (id, vote) =>
    fetch(`${api}/comments/${id}`, {
      method: "POST",
      headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
      body: JSON.stringify({ option: vote })
    }).then(res => res.json());

export const addComment = (id, timestamp, { body, author}, parentId ) =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
    body: JSON.stringify({
      id,
      timestamp,
      body,
      author,
      parentId })
  });

export const editComment = ({id, body}, timestamp) =>
  fetch(`${api}/comments/${id}`, {
    method: "PUT",
    headers: { 'Authorization': 'whatever-you-want', 'content-type': 'application/json' },
    body: JSON.stringify({
      timestamp,
      body })
  });

export const getCommentDetail = (id) =>
  fetch(`${api}/comments/${id}`, { headers: { 'Authorization': 'whatever-you-want' }})
  .then(res => res.json());

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, { 
    method: "DELETE",
    headers: { 'Authorization': 'whatever-you-want' }});

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, { 
    method: "DELETE",
    headers: { 'Authorization': 'whatever-you-want' }});