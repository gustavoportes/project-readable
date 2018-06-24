import React, { Component } from 'react';
import CommentItem from './CommentItem';
import Comment from './Comment';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class CommentList extends Component {

  state  = {
    comment: {},
  }

  handleEdit = (comment) => {
    this.setState( { comment, isEdit: true });
  }

  render() {
    const comment = this.state.comment;
    const { comments, parentId } = this.props;
    const arrayComments = comments.map(function(el, i) {
      return { index: i, value: el.voteScore };
    });
    arrayComments.sort(function(a, b) {
      return +(a.value < b.value) || +(a.value === b.value) - 1;
    });
    const result = arrayComments.map(function(el) {
      return comments[el.index];
    });
    return (
      <div>
        <Comment comment={comment} parentId={parentId} date={Date.now()}/>
        <Divider />        
        <Typography gutterBottom variant="title" component="h2" >
          Comments:
        </Typography>
        { result.length === 0 && 
          <Typography variant="body1" >
            There are no comments!!!
          </Typography> }
        { result.map(comment => (
          <CommentItem key={comment.id}
            comment={comment}
            onClick={this.handleEdit}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps ({ comments }) {
  return comments;
}

export default connect(mapStateToProps)(CommentList);