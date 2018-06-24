import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ScrollableTabs from './ScrollableTabs';

function Categories(props) {
  return (
    <div>
      <Card >
        <CardContent>
          <Typography gutterBottom variant="title" component="h2" >
            Categories
          </Typography>
        </CardContent>
        <ScrollableTabs />
      </Card>
    </div>
  );
}

export default Categories;