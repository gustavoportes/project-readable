import React from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';

function PostList(props) {
  const orderBy = props.orderBy;
  const posts = props.posts;
  
  const arrayPosts = posts.map(function(el, i) {
    return { index: i, value: ( orderBy === 'voteScore' ? el.voteScore : el.timestamp ) };
  });
  arrayPosts.sort(function(a, b) {
    return +(a.value < b.value) || +(a.value === b.value) - 1;
  });
  const result = arrayPosts.map(function(el) {
    return posts[el.index];
  });

  return (
    <div>
      {result.map(post => (
        <PostItem key={post.id}
          id={post.id}
          title={post.title}
          author={post.author}
          commentCount={post.commentCount}
          date={new Date(post.timestamp).toLocaleString('en-GB')}
          voteScore={post.voteScore}
          body=''
          category={post.category}
        />
      ))}
    </div>
  );
}

function mapStateToProps ({ posts }) {
  return posts;
}

export default connect(mapStateToProps)(PostList);