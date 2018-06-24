import React from 'react';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import * as ReadableAPI from '../utils/ReadableAPI';
import { connect } from 'react-redux';
import { updateVoteComment, loadComments, setPost } from '../actions/index';

function CommentItem(props) {

  const upVote = event => {
    updateVoteComment('upVote');
  }

  const downVote = event => {
    updateVoteComment('downVote');
  }

  const updateVoteComment = vote => {
    ReadableAPI
      .updateVotingComment(props.comment.id, vote)
      .then(comment =>  props.updateVote(comment));
  }

  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.comment);
  }

  const deleteComment = (event) => {
    event.preventDefault();
    ReadableAPI.deleteComment(props.comment.id)
      .then(() => {
        ReadableAPI
          .getCommentsByPostId(props.comment.parentId)
          .then(comments => { 
            props.loadComments(comments);
            ReadableAPI.getPostById(props.comment.parentId)
            .then (
              post => props.updatePost(post)
            );
          });
      });
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item sm={3} >
            <Typography variant="body1">
              Author: {props.comment.author}
            </Typography>
            <Typography variant="caption">
              Date: {new Date(props.comment.timestamp).toLocaleString('en-GB')}
            </Typography>
            <CardActions>
              <Button size="small" color="default" variant="outlined" onClick={handleClick}>Edit</Button>
              <Button size="small" color="secondary" variant="outlined" onClick={deleteComment}>Delete</Button>
            </CardActions>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subheading">
              {props.comment.body}
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="body1">
              Votes: 
              <IconButton color="primary" onClick={upVote}>
                <ArrowDropUp/>
              </IconButton>
              {props.comment.voteScore}
              <IconButton color="secondary" onClick={downVote}>
                <ArrowDropDown/>
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {    
    updateVote: (comment) => dispatch(updateVoteComment(comment)),
    loadComments: (comment) => dispatch(loadComments(comment)),
    updatePost: (post) => dispatch(setPost(post))
  }
}

export default connect(null, mapDispatchToProps)(CommentItem);