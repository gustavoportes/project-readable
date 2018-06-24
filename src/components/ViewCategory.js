import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import * as ReadableAPI from '../utils/ReadableAPI';
import Header from './Header';
import Categories from './Categories';
import PostsControl from './PostsControl';
import { loadCategories, loadPosts } from '../actions/index';

class ViewCategory extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    if ( params ) {
      if( params.category ) {
        ReadableAPI
          .getCategories()
          .then(categories => this.props.dispatch(loadCategories(categories)));
        ReadableAPI
          .getPostsByCategory( params.category )
          .then(posts => this.props.dispatch(loadPosts(posts)));
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params } } = this.props;
    if ( params ) {
      if( params.category ) {
        if( params.category !== prevProps.match.params.category ) {
          ReadableAPI
          .getPostsByCategory( params.category )
          .then(posts => this.props.dispatch(loadPosts(posts)));
        }
      }
    }
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

export default connect()(ViewCategory);