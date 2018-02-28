import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as utilityActions from '../actions/utilityActions';
import Search from './Search';
import EventsListWithImage from './events/EventsListWithImage';
import CenterList from './CenterList';

class AdminProfile extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
    this.props.actions.setComponentName('AdminProfile');
  }
  render() {
    const { centers = [] } = this.props;
    const { events = [] } = this.props;
    return (
      <React.Fragment>
        <ul className="tabs navbar-purple blue-text">
          <li className="tab col s3"><a className="active" href="#all-events">Test 1</a></li>
          <li className="tab col s3"><a href="#all-centers">Test 2</a></li>
        </ul>
        <div id="all-events" className="col s12 left-ten-padding">
          <div className="container">
            <Search />
            <div className="row">
              <EventsListWithImage events={events} />
            </div>
          </div>
        </div>
        <div id="all-centers" className="col s12">
          <div className="container">
            <Search />
            <div className="row">
              <CenterList centers={centers} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
AdminProfile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};
function mapStateToProps(state) {
  let centers = [];
  let events = [];
  if (state.centers && state.centers.length > 0) {
    centers = state.centers;
  }
  if (state.events && state.events.length > 0) {
    events = state.events;
  }
  return {
    centers,
    events,
    isAdmin: state.session.isAdmin,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(utilityActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
