import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { loadCategories, loadPosts } from '../actions/index';
import { connect } from 'react-redux';
import Header from './Header';
import Categories from './Categories';
import PostsControl from './PostsControl';
import * as ReadableAPI from '../utils/ReadableAPI';

class App extends Component {

  componentDidMount() {
    ReadableAPI
      .getCategories()
      .then(categories => this.props.dispatch(loadCategories(categories)));
    ReadableAPI
      .getPosts()
      .then(posts => this.props.dispatch(loadPosts(posts)));
  }  

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Header />
          <Grid item xs={12}>
            <Categories />
          </Grid>
          <Grid item xs={12}>
            <PostsControl />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect()(App);