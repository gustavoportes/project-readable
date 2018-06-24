import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ScrollableTabs extends Component {
  state = {
    value: "All",
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const categories = this.props.categories.categories;
    return (
      <div >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="on"
          >
            <Tab label="All" key="All" value="All" component={Link} to="/"/>
            {categories.map(category => (
              <Tab label={category.name} key={category.name} value={category.name} component={Link} to={`/${category.path}`}/>
            ))}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps ({ categories } ) {
  return { 
    categories
  };
}

export default connect(mapStateToProps)(ScrollableTabs);