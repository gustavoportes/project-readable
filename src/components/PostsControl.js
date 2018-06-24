import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import OrderByControl from './OrderByControl';
import PostList from './PostList';

function PostsControl(props) {
  return (
    <Card >
      <CardContent>
        <Typography gutterBottom variant="title" component="h2" >
          Posts
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <OrderByControl />
          </Grid>
          <Grid item xs={6} justify="flex-end" container>
            <Button component={Link} to="/newpost" variant="contained" color="primary">
              New Post
            </Button>
          </Grid>
          <Grid item xs={12} >
            <PostList />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );  
}

export default PostsControl;