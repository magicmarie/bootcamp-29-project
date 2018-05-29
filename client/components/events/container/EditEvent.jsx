import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import moment from 'moment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import * as eventActions from '../../../actions/eventActions';
import * as centerActions from '../../../actions/centerActions';
import EventsForm from '../presentational/EventsForm';

export class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true, message: '' },
      detail: { value: '', isValid: true, message: '' },
      guests: { value: '', isValid: true, message: '' },
      date: { value: '', isValid: true, message: '' },
      time: { value: '', isValid: true, message: '' },
      center: { value: 1, isValid: true, message: '' },
      category: { value: 1, isValid: true, message: '' },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchSingleEvent(parseInt(this.props.eventId, 10));
    // $('.datepicker').pickadate({
    //   selectMonths: true, // Creates a dropdown to control month
    //   selectYears: 15, // Creates a dropdown of 15 years to control year,
    //   today: 'Today',
    //   clear: 'Clear',
    //   close: 'Ok',
    //   closeOnSelect: true, // Close upon selecting a date,
    //   onSet: this.handleDateChange
    // });
    // const time = $('#event-time');
    // const value = $('#event-time').attr('value');
    // $('.timepicker').pickatime({
    //   default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    //   fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    //   twelvehour: false, // Use AM/PM or 24-hour format
    //   donetext: 'OK', // text for done-button
    //   cleartext: 'Clear', // text for clear-button
    //   canceltext: 'Cancel', // Text for cancel-button
    //   autoclose: false, // automatic close timepicker
    //   ampmclickable: true, // make AM PM clickable
    //   aftershow: () => {},
    // });
    // $('.timepicker').on('change', () => {
    //   this.handleTimeChange(time.val());
    // });
    // $('select').material_select();
    // const center = $('#event-center');
    const category = $('#event-category');
    // $('#event-center').on('change', () => {
    //   this.handleSelectCenterChange(center.val());
    // });
    $('#event-category').on('change', () => {
      this.handleSelectCategoryChange(category.val());
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.event.id !== nextProps.event.id) {
      this.setState({
        name: Object.assign({}, this.state.name, { value: nextProps.event.name }),
        detail: Object.assign({}, this.state.detail, { value: nextProps.event.detail }),
        guests: Object.assign({}, this.state.guests, {
          value: (nextProps.event.guests).toString()
        }),
        center: Object.assign({}, this.state.center, {
          value: (nextProps.event.centerId).toString()
        }),
        category: Object.assign({}, this.state.category, {
          value: (nextProps.event.categoryId).toString()
        }),
        date: Object.assign({}, this.state.name, {
          value: moment(nextProps.event.date).format('LL')
        }),
        time: Object.assign({}, this.state.name, {
          value: moment(nextProps.event.date).format('LT')
        })
      });
    }
  }
  handleChange(e) {
    const { state } = this;
    const { name, value } = e.target;
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
  handleSelectCategoryChange(e) {
    this.setState({
      category: Object.assign({}, this.state.category, { value: e })
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
      state.guests.isValid = false;
      state.guests.message = 'Guests must not be empty';

      this.setState({ guests: state.guests });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.detail.value)) {
      state.detail.isValid = false;
      state.detail.message = 'Detail must not be empty';

      this.setState({ detail: state.detail });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.date.value)) {
      state.date.isValid = false;
      state.date.message = 'Date must not be empty';

      this.setState({ date: state.date });
      fieldCheck = false;
    }
    if (validator.isEmpty((state.category.value).toString())) {
      state.category.isValid = false;
      state.category.message = 'Select a category';

      this.setState({ category: state.category });
      fieldCheck = false;
    }
    if (!fieldCheck) {
      return false;
    }
    return true;
  }
  resetValidationStates() {
    const state = Object.assign({}, this.state);

    Object.keys(state).forEach((key) => {
      if ({}.hasOwnProperty.call(state[key], 'isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }
  updateEvent(e) {
    e.preventDefault();
    this.resetValidationStates();
    const datetime = `${this.state.date.value} ${this.state.time.value}`;
    const eventObject = {
      id: parseInt(this.props.eventId, 10),
      name: this.state.name.value,
      detail: this.state.detail.value,
      guests: this.state.guests.value,
      date: moment(datetime).format('YYYY-MM-DD HH:mm:ss'),
      centerId: this.props.centerId,
      categoryId: this.state.category.value
    };
    if (this.formIsValid()) {
      this.props.actions.updateEvent(eventObject)
        .then((response) => {
          Materialize.toast(response.message, 4000, 'green');
          this.props.toggleEdit();
          this.props.hideModal();
        })
        .catch(error => Materialize.toast(error, 4000, 'red'));
      // this.clearFields();
    }
  }
  render() {
    const nameClasses = classNames('help-block', { 'has-error': !this.state.name.isValid });
    const detailClasses = classNames('help-block', { 'has-error': !this.state.detail.isValid });
    const guestsClasses = classNames('help-block', { 'has-error': !this.state.guests.isValid });
    const dateClasses = classNames('help-block', { 'has-error': !this.state.date.isValid });
    const timeClasses = classNames('help-block', { 'has-error': !this.state.time.isValid });
    const categoryClasses = classNames('help-block', { 'has-error': !this.state.category.isValid });
    const containerClasses = classNames('container max-width-six-hundred');
    return (
      <div className={containerClasses}>
        <div>
          <div className="container">
            <h3 className="center-heading">Edit an Event</h3>
          </div>
          <EventsForm
            name={this.state.name}
            guests={this.state.guests}
            category={this.state.category}
            date={this.state.date}
            time={this.state.time}
            detail={this.state.detail}
            nameClasses={nameClasses}
            guestsClasses={guestsClasses}
            dateClasses={dateClasses}
            timeClasses={timeClasses}
            categoryClasses={categoryClasses}
            detailClasses={detailClasses}
            saveOrUpdate={this.updateEvent}
            handleChange={this.handleChange}
            handleTimeChange={this.handleTimeChange}
            handleSelectCenterChange={this.handleSelectCenterChange}
            handleSelectCategoryChange={this.handleSelectCategoryChange}
            component="Edit"
            SelectField={SelectField}
            MenuItem={MenuItem}
            DateTimePicker={DateTimePicker}
            DatePickerDialog={DatePickerDialog}
            TimePickerDialog={TimePickerDialog}
          />
        </div>
      </div>
    );
  }
}
EditEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    guests: PropTypes.number,
    detail: PropTypes.string,
    date: PropTypes.string,
    centerId: PropTypes.number,
    categoryId: PropTypes.number,
    Center: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      capacity: PropTypes.number,
      detail: PropTypes.string,
      chairs: PropTypes.number,
      projector: PropTypes.number,
      address: PropTypes.string,
      state: PropTypes.string,
      image: PropTypes.string,
      events: PropTypes.array
    })
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  eventId: PropTypes.number,
  centerId: PropTypes.number,
  toggleEdit: PropTypes.func,
  hideModal: PropTypes.func
};
EditEvent.defaultProps = {
  eventId: 1,
  centerId: 1,
  toggleEdit: () => {},
  hideModal: () => {},
};
function mapStateToProps(state) {
  let event = {
    id: '',
    name: '',
    detail: '',
    guests: '',
    centerId: '',
    categoryId: '',
    date: '',
    Center: {}
  };
  if (state.events.event && state.events.event.id !== '') {
    ({ events: { event } } = state);
  }
  return {
    event,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(eventActions, centerActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
