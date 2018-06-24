import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import PostItem from './PostItem';
import CommentList from './CommentList';
import NotFound from './NotFound';
import * as ReadableAPI from '../utils/ReadableAPI';
import { loadComments, setPost } from '../actions/index';

class PostDetail extends Component {

  state = {
    isComment: false,
    isDeleted: false,
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    if( params ) {
      if(params.post_id) {
        ReadableAPI.getPostById(params.post_id)
          .then ( post => {
              if ( Object.keys(post).length > 0) {
                this.props.dispatch(setPost(post));
                ReadableAPI.getCommentsByPostId(params.post_id)
                .then(
                  comments => {
                    this.setState({ isComment: true });
                    this.props.dispatch(loadComments(comments));
                  });
              } else {
                this.setState({ isDeleted: true })
              }
            }
          )
      }
    }
  }

  render() {
    const { isComment, isDeleted } = this.state;
    const post = this.props.post;
    return (
      <div>
        <Grid container spacing={24}>
          <Header />
          <Grid item xs={12}>
            <Card>
            { !isDeleted ? (
              <CardContent>
                <PostItem 
                  id={post.id}
                  title={post.title}
                  author={post.author}
                  commentCount={post.commentCount}
                  date={new Date(post.timestamp).toLocaleString('en-GB')}
                  voteScore={post.voteScore}
                  body={post.body}
                  category={post.category}
                />
                <Card>
                  <CardContent>
                    { isComment && <CommentList parentId={post.id}/> }
                  </CardContent>
                </Card>
              </CardContent>
            ) : <NotFound /> }
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps ({ posts: post }) {
  return post;
}

export default connect(mapStateToProps)(PostDetail);