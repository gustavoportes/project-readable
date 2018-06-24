import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as ReadableAPI from '../utils/ReadableAPI';
import { uuid } from '../utils/SimpleUUID';
import { loadComments, setPost } from '../actions/index';

class Comment extends Component {

  state = {
    author: '',
    body: '',
    id: '',
    parentId: '',
    isNew: true,
    errors: {}
  };

  componentDidUpdate(prevProps) {
    const commentEdit = this.props.comment;
    if ( Object.keys(commentEdit).length > 0) {
      if ( commentEdit.id.length > 0 && prevProps.comment.body !== commentEdit.body ) {
          ReadableAPI.getCommentDetail(commentEdit.id)
            .then(comment => {
              this.setState({
                author: comment.author,
                body: comment.body,
                id: comment.id,
                parentId: comment.parentId,
                isNew: false
              });
            });        
      }
    }
  }

  initForm = () => {
    this.setState({
      author: '',
      body: '',
      id: '',
      parentId: '',
      isNew: true,
      errors: {}
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  validate = () => {
    const errors = {};
    const { author, body } = this.state;
    if( !author || !author.trim>0 ) {
      errors.author = "Author is required!!!";
    }
    if( !body || !body.trim>0 ) {
      errors.body = "Body is required!!!";
    }
    return errors;
  }

  updatePost = () => {
    ReadableAPI.getCommentsByPostId(this.props.parentId)
        .then(comments => { 
          this.props.dispatch(loadComments(comments));
          ReadableAPI.getPostById(this.props.parentId)
          .then (
            post => {
              this.props.dispatch(setPost(post));
              this.initForm();
            });          
        });
  }

  handleSubmit = event => {
    const errors = this.validate();
    this.setState({errors});
    if ( Object.keys(errors).length === 0) {
      if( this.state.isNew ) {
        ReadableAPI.addComment(uuid(), Date.now(), this.state, this.props.parentId)
        .then(() => this.updatePost());
      } else {
        ReadableAPI.editComment(this.state, Date.now())
        .then(() => this.updatePost());
      }
    }
    event.preventDefault();
  }

  handleClear = event => {
    this.initForm();
    
    event.preventDefault();
  }
  render() {
    const { author, body, isNew, errors } = this.state;
    
    return (
      <div>
        <Typography gutterBottom variant="title" component="h2" >
          New/Edit Comment
        </Typography>
        <form autoComplete="off" onSubmit={this.handleSubmit} >
          <Grid item xs={6}  container>
            <TextField
              id="author"
              label="Author"
              value={author}
              onChange={this.handleChange('author')}
              margin="normal"
              disabled={!isNew}
              fullWidth
            />
            { errors.author && <FormHelperText error id="author-error-text">{errors.author}</FormHelperText> }
          </Grid>
          <Grid item xs={6} container>
            <TextField
              id="body"
              label="Text/Body"
              value={body}
              onChange={this.handleChange('body')}
              margin="normal"
              fullWidth
              multiline
            />
            { errors.body && <FormHelperText error id="body-error-text">{errors.body}</FormHelperText> }
          </Grid>
          <CardActions>
            <Button size="small" color="primary" variant="contained" onClick={this.handleSubmit}>Save</Button>
            <Button size="small" color="inherit" variant="contained" onClick={this.handleClear}>Clean</Button>
          </CardActions>
        </form>
      </div>
    );
  }
}

export default connect()(Comment);