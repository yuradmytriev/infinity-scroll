import React from 'react';
import {isEmpty} from 'lodash';

const List = props => {
  let {list} = props;

  return (
    !isEmpty(list) &&
    list.map((item, index) => (
        <tr key={index}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.company}</td>
          <td>{item.course}</td>
          <td>{item.password}</td>
          <td>{item.is_bool}</td>
          <td>{item.score}</td>
          <td>{item.words}</td>
          <td>{item.created_at}</td>
        </tr>
    ))
  )
};

export default List;