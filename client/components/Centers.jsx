// container component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as centerActions from '../actions/centerActions';
import CenterList from './CenterList';
import Search from './Search';

class Centers extends Component {
  componentWillMount() {
    if (this.props.centers.length === 0) {
      this.props.centerActions.fetchCenters();
    }
  }
  render() {
    return (
      <div className="container">
        <Search />
        <div class="top-ten-padding"></div>
        <div className="row">
          <div  className="col s12 m6 l4">
            <CenterList centers={this.props.centers} />
          </div>
        </div>
        <div className="fixed-action-btn horizontal click-to-toggle">
          <a className="btn-floating btn-large red white-color" href="new-center.html">
            <i className="material-icons">add</i>
          </a>
        </div>
      </div>
    );
  }
}

Centers.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    centers: state.centers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dispatch, centerActions)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Centers);