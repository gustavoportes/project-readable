import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import * as ReadableAPI from '../utils/ReadableAPI';
import Header from './Header';
import Categories from './Categories';
import PostsControl from './PostsControl';
import NotFound from './NotFound';
import { loadCategories, loadPosts } from '../actions/index';

class ViewCategory extends Component {

  state = {
    notCategory: false
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    if ( params ) {
      if( params.category ) {
        ReadableAPI
          .getCategories()
          .then(categories => {
            if(this.checkCategory(categories,params.category)) {
              this.props.dispatch(loadCategories(categories))
            } else {
              this.setState({ notCategory: true });
            }
          });
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

  checkCategory = (categories, nameCategory) => {
    const check = categories.filter( category => category.name === nameCategory );
    return check.length > 0 ? true : false;
  }


  render() {
    return (
      <div>
      { !this.state.notCategory ? (
      <Grid container spacing={24}>
        <Header />
        <Grid item xs={12}>
          <Categories />
        </Grid>
        <Grid item xs={12}>
          <PostsControl />
        </Grid>
      </Grid>
      ) :
        <div>
          <Grid container spacing={24}>
            <Header />
            <NotFound /> 
          </Grid>
        </div>
      }
      </div>       
    );
  }
}

export default connect()(ViewCategory);