import React, {Component} from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Table.css'

import List from './../../components/List';

import {connect} from 'react-redux';

import getTable from '../../actions/getTable';
import sortByName from '../../actions/sortByName';
import sortByScore from '../../actions/sortByScore';
import search from '../../actions/search';
import {isEmpty} from 'lodash';

let skip = 20;
let view = 700;
let chunks = [];
let clear = false;
const disable = 9999999;

class Table extends Component {
  constructor() {
    super();
    this.state = {
      clear: false,
      data: this.props
    };

  }
  //init data
  componentDidMount() {
    this.props.getTable();
    this.setState(() => {
      return {data: this.props};
    });
  }

  //get new data
  getData = () => {
    skip += skip;
    this.props.getTable(skip);
  };

  sortByName = () => {
    this.props.sortByName();
    view = disable;
    clear = true;
  };

  sortByScore = () => {
    this.props.sortByScore();
    view = disable;
    clear = true;
  };

  search = event => {
    const params = event.target.value;
    this.props.search(params);
    clear = true;
  };

  handleScroll = event => {
    if(event.currentTarget.scrollTop >= view) {
      view += 1400;
      this.getData()
    }
  };


  render() {
    const table = this.props.state.getTables;

    if(clear) {
      chunks = [];
    }

    if(!isEmpty(table)) {
      chunks.push(...table);
    }

    return (
      <div className={s.card}>
        <h2>Search by name</h2>
        <br/>
        <input type="text" onChange={e => this.search(e)} />
        <br/><br/>
        <button className="btn btn-primary" onClick={() => this.sortByName()}>
          Sort by name
        </button>
        <br/><br/>
        <button className="btn btn-primary" onClick={() => this.sortByScore()}>
          Sort by score
        </button>
        <br/><br/>
        <h2>Table</h2>
        <br/>
        <div className={s.table__wrapper} onScroll={e => this.handleScroll(e)}>
          <table className="table">
            <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Course</th>
              <th>Password</th>
              <th>Bool</th>
              <th>Score</th>
              <th>Words</th>
              <th>Created</th>
            </tr>
            </thead>
            <tbody className={s.table__wrapper}>
            <List list={chunks}/>
            {clear = false}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state: state,
});
const mapDispatchToProps = {
  getTable,
  sortByName,
  sortByScore,
  search,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(s)(Table));
