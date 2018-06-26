import React from 'react';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { updateVotePost, loadPosts } from '../actions/index';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';
import './PostItem.css';

function PostItem(props) {

  const upVote = event => {
    updateVotePost('upVote');
  }

  const downVote = event => {
    updateVotePost('downVote');
  }

  const updateVotePost = vote => {
    ReadableAPI
      .updateVotingPost(props.id, vote)
      .then(post =>  props.updateVote(post));
  }

  const deletePost = (event) => {
    event.preventDefault();
    ReadableAPI.deletePost(props.id)
      .then(() => {
        ReadableAPI
          .getPosts()
          .then(posts => props.loadPosts(posts))
      });      
  }

  const post = props;
    
  return (
    <Card>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item sm={6}>
            <Link className="link-title" to={`/${post.category}/${post.id}`} >
              <Typography variant="subheading" color="primary">
                {post.title}
              </Typography>
            </Link>
            <CardActions>
              <Button component={Link} to={`/edit/${post.id}`} size="small" color="default" variant="outlined" >Edit</Button>
              <Button size="small" color="secondary" variant="outlined" onClick={deletePost}>Delete</Button>
              <Chip label={post.category} />
            </CardActions>
          </Grid>
          <Grid item sm={3} >
            <Typography variant="body1">
              Author: {post.author}
            </Typography>
            <Typography variant="caption">
              Date: {post.date}
            </Typography>
            <Typography variant="caption">
              Comments: {post.commentCount}
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="body1">
              Votes:
              <IconButton color="primary" onClick={upVote}>
                <ArrowDropUp/>
              </IconButton>
              {post.voteScore}
              <IconButton color="secondary" onClick={downVote}>
                <ArrowDropDown/>
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
        { (typeof post.body !== 'undefined') && (
          <Grid container spacing={24}>
            <Typography variant="body1" >
              {post.body}
            </Typography>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateVote: (post) => dispatch(updateVotePost(post)),
    loadPosts: (posts) => dispatch(loadPosts(posts))
  }
}

export default connect(null, mapDispatchToProps)(PostItem);