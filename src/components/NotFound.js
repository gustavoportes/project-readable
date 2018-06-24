import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function PageNotFound(){
  return (
    <Grid container spacing={24} >
      <Grid item xs={12} justify="center" container>
        <Typography color="error" variant="display3" >
          Error 404
        </Typography>
      </Grid>
      <Grid item xs={12} justify="center" container>
        <Typography color="error" variant="display2" >
          Not Found
        </Typography>
      </Grid>
      <Grid item xs={12} justify="center" container>
        <IconButton color="inherit" component={Link} to="/">
          <ArrowBack/>
        </IconButton>
      </Grid>
    </Grid>    
    );  
}

export default PageNotFound;