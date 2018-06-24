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
import * as ReadableAPI from '../utils/ReadableAPI';
import { uuid } from '../utils/SimpleUUID';

class Post extends Component {

  state = {
    author: '',
    title: '',
    body: '',
    category: '', 
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
              author: post.author,
              title: post.title,
              body: post.body,
              category: post.category,
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

  handleSubmit = event => {
    const errors = this.validate();
    this.setState({errors});
    if ( Object.keys(errors).length === 0) {
      if( this.state.isNew ) {
        ReadableAPI.addPost(uuid(),Date.now(),this.state);
      } else {
        const { match: { params } } = this.props;
        ReadableAPI.editPost(params.id,this.state.title,this.state.body);
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

export default Post;