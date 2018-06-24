import React from 'react';
import { connect } from 'react-redux';
import NativeSelect from '@material-ui/core/NativeSelect';
import { orderBy } from '../actions/index';

function OrderByControl(props) {

  const handleChange = (event) => {
    props.updateOrderBy(event.target.value);
  };

  return (
    <NativeSelect
      onChange={handleChange}
      name="order"
      value={props.orderBy}
    >
      <option value={"voteScore"}>Vote Score</option>
      <option value={"timestamp"}>Date Create</option>
    </NativeSelect>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderBy: (value) => { dispatch(orderBy(value)) }
  }
}

function mapStateToProps ({ posts: orderBy }) {
  if (typeof orderBy === 'undefined') {
    return { orderBy: 'voteScore' };
  }
  return orderBy;
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderByControl);