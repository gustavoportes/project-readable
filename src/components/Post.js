import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import { connect } from 'react-redux';
import { setNewPost, setEditPost } from '../actions/index';
import * as ReadableAPI from '../utils/ReadableAPI';
import { uuid } from '../utils/SimpleUUID';

class Post extends Component {

  state = {
    id: '',
    timestamp: '',
    author: '',
    title: '',
    body: '',
    category: '',
    voteScore: '',
    deleted: '',
    categories: [],
    isNew: true,
    errors: {}
  };
  
  componentDidMount() {
    const { match: { params } } = this.props;
    if(params) {
      if(params.id){      
        ReadableAPI.getPostById(params.id)
          .then(post => {
            this.setState({
              id: post.id,
              timestamp: post.timestamp,
              author: post.author,
              title: post.title,
              body: post.body,
              category: post.category,
              voteScore: post.voteScore,
              deleted: post.deleted,
              isNew: false
             });
          });
      }
    }

    ReadableAPI.getCategories()
      .then(categories => this.setState({ categories }));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  validate = () => {
    const errors = {};
    const { author, title, body, category } = this.state;
    if( !author || !author.trim>0 ) {
      errors.author = "Author is required!!!";
    }
    if( !title || !title.trim>0 ) {
      errors.title = "Title is required!!!";
    }
    if( !body || !body.trim>0 ) {
      errors.body = "Body is required!!!";
    }
    if( !category || !category.trim>0 ) {
      errors.category = "Category is required!!!";
    }
    return errors;
  }

  getNewPost = () => {
    return {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      voteScore: 1,
      deleted: false
    };
  }
  
  getEditPost = () => {
    return {
      id: this.state.id,
      timestamp: this.state.timestamp,
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      voteScore: this.state.voteScore,
      deleted: this.state.deleted
    }
  }

  handleSubmit = event => {
    const errors = this.validate();
    this.setState({errors});
    if ( Object.keys(errors).length === 0) {
      if( this.state.isNew ) {
        const newPost = this.getNewPost();
        ReadableAPI.addPost(newPost)
          .then(() => this.props.dispatch(setNewPost(newPost))); 
      } else {
        const editPost = this.getEditPost();
        ReadableAPI.editPost(this.state.id,this.state.title,this.state.body)
          .then(() => this.props.dispatch(setEditPost(editPost)));
      }
      this.props.history.goBack();
    }
  }

  handleCancel = event => {
    this.props.history.goBack();
  }

  render() {
    const { author, title, body, category, categories, isNew, errors } = this.state;
    return (
      <div>
        <Grid container spacing={24}>
          <Header />
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2" >
                  { isNew ? "New Post" : "Edit Post" }
                </Typography>
                <Card>
                  <CardContent>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                      <FormControl>
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <NativeSelect
                          value={category}
                          onChange={this.handleChange('category')}
                          disabled={!isNew}
                        >
                          <option value="" />
                            {categories.map(category => (
                              <option key={category.name} value={category.name}>{category.name}</option>
                            ))}
                        </NativeSelect>
                        { errors.category && <FormHelperText error id="category-error-text">{errors.category}</FormHelperText> }
                      </FormControl>
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
                          id="title"
                          label="Title"
                          value={title}
                          onChange={this.handleChange('title')}
                          margin="normal"
                          fullWidth
                        />
                        { errors.title && <FormHelperText error id="title-error-text">{errors.title}</FormHelperText> }
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
                        <Button size="small" color="secondary" variant="contained" onClick={this.handleCancel}>Cancel</Button>
                      </CardActions>
                    </form>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect()(Post);