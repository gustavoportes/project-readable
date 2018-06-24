import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './Header.css';

function Header(props) {
  return (
    <Grid item xs={12} >
      <div className="app-bar">
        <Link className="link-header" to="/" >
          <Typography gutterBottom variant="display1" component="h1" color="inherit" >
            Readable
          </Typography>
        </Link>
      </div>
    </Grid>
  );
}

export default Header;