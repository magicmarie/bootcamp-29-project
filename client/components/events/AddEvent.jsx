import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import validator from 'validator';
import classNames from 'classnames';
import * as eventActions from '../../actions/eventActions';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true, message: '' },
      detail: { value: '', isValid: true, message: '' },
      guests: { value: '', isValid: true, message: '' },
      date: { value: '', isValid: true, message: '' },
      time: { value: '', isValid: true, message: '' },
      center: { value: '1', isValid: true, message: '' },
      category: { value: '', isValid: true, message: '' },
      centers: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSelectCenterChange = this.handleSelectCenterChange.bind(this);
    this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  componentDidMount() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date,
      onSet: this.handleDateChange
    });
    const time = $('#event-time');
    // const value = $('#event-time').attr('value');
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: () => {},
    });
    $('.timepicker').on('change', () => {
      this.handleTimeChange(time.val());
    });
    $('select').material_select();
    const center = $('#event-center');
    const category = $('#event-category');
    $('#event-center').on('change', () => {
      this.handleSelectCenterChange(center.val());
    });
    $('#event-category').on('change', () => {
      this.handleSelectCategoryChange(category.val());
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.centers.length > 0) {
      this.setState({ centers: nextProps.centers });
    }
  }
  handleChange(event) {
    const { state } = this;
    const { name, value } = event.target;
    const field = state[name];
    field.value = value;
    this.setState({
      [field]: [field]
    });
  }
  handleDateChange(e) {
    this.setState({
      date: Object.assign({}, this.state.date, { value: moment(e.select).format('LL') })
    });
  }
  handleSelectCenterChange(e) {
    this.setState({
      center: Object.assign({}, this.state.center, { value: e })
    });
  }
  handleSelectCategoryChange(e) {
    this.setState({
      category: Object.assign({}, this.state.category, { value: e })
    });
  }
  handleTimeChange(e) {
    this.setState({
      time: Object.assign({}, this.state.time, { value: moment(e, 'HH:mm a').format('HH:mm:ss') })
    });
  }
  formIsValid() {
    let fieldCheck = true;
    const state = Object.assign({}, this.state);

    if (validator.isEmpty(state.name.value)) {
      state.name.isValid = false;
      state.name.message = 'Name must not be empty';

      this.setState({ name: state.name });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.guests.value)) {
      state.state.isValid = false;
      state.state.message = 'Guests must not be empty';

      this.setState({ state: state.guests });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.detail.value)) {
      state.detail.isValid = false;
      state.detail.message = 'Detail must not be empty';

      this.setState({ detail: state.detail });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.date.value)) {
      state.capacity.isValid = false;
      state.capacity.message = 'Date must not be empty';

      this.setState({ detail: state.date });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.time.value)) {
      state.capacity.isValid = false;
      state.capacity.message = 'Time must not be empty';

      this.setState({ detail: state.time });
      fieldCheck = false;

      if (!fieldCheck) {
        return false;
      }
      return true;
    }
  }
  resetValidationStates() {
    const state = Object.assign({}, this.state);

    Object.keys(state).map((key) => {
      if ({}.hasOwnProperty.call(state[key], 'isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }
  addEvent(e) {
    e.preventDefault();
    this.resetValidationStates();
    const datetime = `${this.state.date.value} ${this.state.time.value}`;
    const eventObject = {
      name: this.state.name.value,
      detail: this.state.detail.value,
      guests: this.state.guests.value,
      date: moment(datetime).format('YYYY-MM-DD HH:mm:ss'),
      centerId: this.state.center.value,
      categoryId: this.state.category.value
    };
    console.log(eventObject);
    if (this.formIsValid()) {
      this.props.actions.addEvent(eventObject);
    }
  }
  render() {
    const { centers = [] } = this.props;
    const nameClasses = classNames('help-block', { 'has-error': !this.state.name.isValid });
    const detailClasses = classNames('help-block', { 'has-error': !this.state.detail.isValid });
    const guestsClasses = classNames('help-block', { 'has-error': !this.state.guests.isValid });
    const dateClasses = classNames('help-block', { 'has-error': !this.state.date.isValid });
    const timeClasses = classNames('help-block', { 'has-error': !this.state.time.isValid });
    const containerClasses = classNames('container max-width-six-hundred');
    return (
      <div className={containerClasses}>
        <div className="card">
          <div className="container">
            <h3 className="center-heading">Add an Event</h3>
          </div>
          <form className="card-content">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="event-name"
                  name="name"
                  value={this.state.name.value}
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="event-name">Name</label>
                <span className={nameClasses}>{this.state.name.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="event-detail"
                  name="detail"
                  value={this.state.detail.value}
                  className="materialize-textarea validate"
                  onChange={this.handleChange}
                ></textarea>
                <label for="center-detail">Detail</label>
                <span className={detailClasses}>{this.state.detail.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="event-guests"
                  name="guests"
                  value={this.state.guests.value}
                  type="number"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="event-guests">Guests</label>
                <span className={guestsClasses}>{this.state.guests.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="date"
                  value={this.state.date.value}
                  type="text"
                  className="datepicker"
                  id="event-date"
                />
                <label for="event-date">Date</label>
                <span className={dateClasses}>{this.state.date.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="event-time"
                  name="time"
                  value={this.state.time.value}
                  className="timepicker"
                  type="text"
                  onChange={this.handleTimeChange}
                />
                <label for="event-time">Time</label>
                <span className={timeClasses}>{this.state.time.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s16">
                <select
                  name="center"
                  value={this.state.center.value}
                  onChange={this.handleSelectCenterChange}
                  id="event-center"
                >
                  <option value="">Pick a Center</option>
                  {centers.map(center => (
                    <option
                      key={center.id}
                      value={center.id}
                    >{center.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="event-center">Center</label>
              </div>
              <div className="input-field col s16">
                <select
                  name="category"
                  value={this.state.category.value}
                  onChange={this.handleSelectCategoryChange}
                  id="event-category"
                >
                  <option value="1">General</option>
                </select>
                <label htmlFor="event-category">Category</label>
              </div>
            </div>
            <div className="row center-align">
              <button
                className="btn waves-effect waves-light navbar-purple round-btn"
                type="submit"
                name="action"
                onClick={this.addEvent}
              >Add Event
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
AddEvent.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired
};
function mapStateToProps(state) {
  let centers = [];
  if (state.centers && state.centers.length > 0) {
    centers = state.centers;
  }
  return {
    centers
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)
