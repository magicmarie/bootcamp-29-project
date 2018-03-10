import React from 'react';
import classNames from 'classnames';
import validator from 'validator';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as registerActions from '../actions/registerActions';
import Preloader from './common/Preloader';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      firstName: { value: '', isValid: true, message: '' },
      lastName: { value: '', isValid: true, message: '' },
      email: { value: '', isValid: true, message: '' },
      password: { value: '', isValid: true, message: '' },
      passwordConfirmation: {
        value: '', isValid: true, matches: false, message: ''
      }
    };
  }
  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }
  handleFirstNameChange(e) {
    const firstName = Object.assign({}, this.state.firstName);
    firstName.value = e.target.value;
    this.setState({ firstName });
  }
  handleLastNameChange(e) {
    const lastName = Object.assign({}, this.state.lastName);
    lastName.value = e.target.value;
    this.setState({ lastName });
  }
  handleEmailChange(e) {
    const email = Object.assign({}, this.state.email);
    email.value = e.target.value;
    if (!validator.isEmail(email.value)) {
      email.isValid = false;
      email.message = 'Email is not valid';
    } else {
      email.isValid = true;
      email.message = '';
    }
    this.setState({ email });
  }
  handlePasswordChange(e) {
    const password = Object.assign({}, this.state.password);
    password.value = e.target.value;
    if (!validator.isLength(password.value, { min: 6 })) {
      password.isValid = false;
      password.message = 'Password should have at least 6 characters';
    } else {
      password.isValid = true;
      password.message = '';
    }
    this.setState({ password });
  }
  handlePasswordConfirmationChange(e) {
    const passwordConfirmation = Object.assign({}, this.state.passwordConfirmation);
    const password = Object.assign({}, this.state.password);
    passwordConfirmation.value = e.target.value;
    if (!validator.equals(password.value, passwordConfirmation.value)) {
      passwordConfirmation.isValid = false;
      passwordConfirmation.message = 'Passwords don\'t match';
    } else {
      passwordConfirmation.isValid = true;
      passwordConfirmation.message = '';
    }
    this.setState({ passwordConfirmation });
  }
  clearFields() {
    this.setState({ firstName: { value: '', isValid: true, message: '' } });
    this.setState({ lastName: { value: '', isValid: true, message: '' } });
    this.setState({ email: { value: '', isValid: true, message: '' } });
    this.setState({ password: { value: '', isValid: true, message: '' } });
    this.setState({
      passwordConfirmation: {
        value: '', isValid: true, message: '', matches: false
      }
    });
  }
  formIsValid() {
    let fieldCheck = true;
    const state = Object.assign({}, this.state);
    if (!validator.isEmail(state.email.value)) {
      state.email.isValid = false;
      state.email.message = 'Email is not valid';

      this.setState({ email: state.email });
      fieldCheck = false;
    }
    if (!validator.isLength(state.password.value, { min: 6 })) {
      state.password.isValid = false;
      state.password.message = 'Password should have at least 6 characters';

      this.setState({ password: state.password });
      fieldCheck = false;
    }
    if (!validator.equals(state.password.value, state.passwordConfirmation.value)) {
      state.passwordConfirmation.isValid = false;
      state.passwordConfirmation.message = 'Passwords don\'t match';

      this.setState({ passwordConfirmation: state.passwordConfirmation });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.firstName.value)) {
      state.firstName.isValid = false;
      state.firstName.message = 'First name must not be empty';

      this.setState(state);
      fieldCheck = false;
    }
    if (validator.isEmpty(state.lastName.value)) {
      state.lastName.isValid = false;
      state.lastName.message = 'Last name must not be empty';

      this.setState(state);
      fieldCheck = false;
    }
    if (fieldCheck === false) {
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
  register(event) {
    event.preventDefault();
    this.resetValidationStates();
    if (this.formIsValid()) {
      const credentials = {
        name: `${this.state.firstName.value} ${this.state.lastName.value}`,
        email: this.state.email.value,
        password: this.state.password.value
      };
      this.props.actions.registerUser(credentials)
        .then(response => Materialize.toast(response, 4000, 'green'))
        .catch(error => Materialize.toast(error, 4000, 'red'));
      this.clearFields();
    }
  }
  render() {
    const firstNameClasses = classNames('help-block', { 'has-error': !this.state.firstName.isValid });
    const lastNameClasses = classNames(
      'help-block',
      { 'has-error': !this.state.lastName.isValid }
    );
    const emailClasses = classNames('help-block', { 'has-error': !this.state.email.isValid });
    const passwordClasses = classNames('help-block', { 'has-error': !this.state.password.isValid });
    const passwordConfirmationClasses = classNames(
      'help-block',
      { 'has-error': !this.state.passwordConfirmation.isValid }
    );
    const { isLoading = false } = this.props;
    if (isLoading) {
      return (
        <Preloader />
      );
    }
    return (
      <div className="container">
        <div className="row signup-form">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <span className="card-title"><h3 className="center-heading">Sign Up</h3></span>
                <form className="container">
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="first_name"
                        value={this.state.firstName.value}
                        type="text"
                        className="validate"
                        onChange={this.handleFirstNameChange}
                      />
                      <label htmlFor="first_name">First Name</label>
                      <span className={firstNameClasses}>{this.state.firstName.message}</span>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="last_name"
                        value={this.state.lastName.value}
                        type="text"
                        className="validate"
                        onChange={this.handleLastNameChange}
                      />
                      <label htmlFor="last_name">Last Name</label>
                      <span className={lastNameClasses}>{this.state.lastName.message}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="email"
                        value={this.state.email.value}
                        type="email"
                        className="validate"
                        onChange={this.handleEmailChange}
                      />
                      <label htmlFor="email">Email</label>
                      <span className={emailClasses}>{this.state.email.message}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="password"
                        value={this.state.password.value}
                        type="password"
                        className="validate"
                        onChange={this.handlePasswordChange}
                      />
                      <label htmlFor="password">Password</label>
                      <span className={passwordClasses}>{this.state.password.message}</span>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="password_confirmation"
                        value={this.state.passwordConfirmation.value}
                        type="password"
                        className="validate"
                        onChange={this.handlePasswordConfirmationChange}
                      />
                      <label htmlFor="password_confirmation">Password Confirmation</label>
                      <span
                        className={passwordConfirmationClasses}
                      >
                        {this.state.passwordConfirmation.message}
                      </span>
                    </div>
                  </div>
                  <div className="row center-align">
                    <button
                      className="btn waves-effect waves-light navbar-purple round-btn"
                      onClick={this.register}
                      type="submit"
                      name="action"
                    >
                      Signup
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Signup.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoading: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
  return {
    isLoading: state.register.isLoading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registerActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
