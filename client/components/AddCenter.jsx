import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import * as centerActions from '../actions/centerActions';

class AddCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true, message: '' },
      capacity: { value: '', isValid: true, message: '' },
      address: { value: '', isValid: true, message: '' },
      state: { value: '', isValid: true, message: '' },
      detail: { value: '', isValid: true, message: '' },
      chairs: { value: '', isValid: true, message: '' },
      projector: { value: '', isValid: true, message: '' },
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.addCenter = this.addCenter.bind(this);
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
  handleImageChange(e) {
    console.log(e.target.files[0]);
    const { state } = this;
    state.image = e.target.files[0];
    this.setState(state)
  }
  clearFields() {
    this.setState({
      name: {
        value: '', isValid: true, message: ''
      }
    });
    this.setState({ capacity: { value: '', isValid: true, message: '' } });
    this.setState({ address: { value: '', isValid: true, message: '' } });
    this.setState({ state: { value: '', isValid: true, message: '' } });
    this.setState({ detail: { value: '', isValid: true, message: '' } });
    this.setState({ chairs: { value: '', isValid: true, message: '' } });
    this.setState({ projector: { value: '', isValid: true, message: '' } });
    this.setState({ image: { value: '', isValid: true, message: '' } });
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
    if (validator.isEmpty(state.address.value)) {
      state.address.isValid = false;
      state.address.message = 'Address must not be empty';

      this.setState({ address: state.address });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.state.value)) {
      state.state.isValid = false;
      state.state.message = 'State must not be empty';

      this.setState({ state: state.state });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.detail.value)) {
      state.detail.isValid = false;
      state.detail.message = 'Detail must not be empty';

      this.setState({ detail: state.detail });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.capacity.value)) {
      state.capacity.isValid = false;
      state.capacity.message = 'Capacity must not be empty';

      this.setState({ detail: state.detail });
      fieldCheck = false;
    }
    if (!fieldCheck) {
      return false;
    }
    return true;
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
  addCenter(event) {
    event.preventDefault();
    this.resetValidationStates();
    // const formData = new FormData();
    // formData.append('name', this.state.name.value);
    // formData.append('capacity', this.state.capacity.value);
    // formData.append('address', this.state.address.value);
    // formData.append('state', this.state.state.value);
    // formData.append('chairs', this.state.chairs.value);
    // formData.append('projector', this.state.projector.value);
    // formData.append('detail', this.state.detail.value);
    // formData.append('image', this.state.image);
    const center = {
      name: this.state.name.value,
      capacity: this.state.capacity.value,
      address: this.state.address.value,
      state: this.state.state.value,
      chairs: this.state.chairs.value,
      projector: this.state.projector.value,
      detail: this.state.detail.value,
      image: this.state.image,
    };
    if (this.formIsValid()) {
      this.props.centerActions.addCenter(center);
      this.clearFields();
    }
  }
  render() {
    const nameClasses = classNames('help-block', { 'has-error': !this.state.name.isValid });
    const detailClasses = classNames('help-block', { 'has-error': !this.state.detail.isValid });
    const addressClasses = classNames('help-block', { 'has-error': !this.state.address.isValid });
    const stateClasses = classNames('help-block', { 'has-error': !this.state.state.isValid });
    const capacityClasses = classNames('help-block', { 'has-error': !this.state.capacity.isValid });
    return (
      <div className="container max-width-six-hundred">
        <div className="card">
          <div className="container">
            <h3 className="center-heading">Add a Center</h3>
          </div>
          <form className="card-content">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-name"
                  name="name"
                  value={this.state.name.value}
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="center-name">Name</label>
                <span className={nameClasses}>{this.state.name.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-address"
                  name="address"
                  value={this.state.address.value}
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="center-address">Address</label>
                <span className={addressClasses}>{this.state.address.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-state"
                  name="state"
                  value={this.state.state.value}
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="center-state">State</label>
                <span className={stateClasses}>{this.state.state.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
                <input
                  id="center-capacity"
                  name="capacity"
                  value={this.state.capacity.value}
                  type="number"
                  className="validate"
                  onChange={this.handleChange}
                />
              <label for="center-capacity">Capacity</label>
                <span className={capacityClasses}>{this.state.capacity.message}</span>
              </div>
              <div className="input-field col s4">
                <input
                  id="center-chairs"
                  name="chairs"
                  value={this.state.chairs.value}
                  type="number"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="center-state">Chairs</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="center-projector"
                  name="projector"
                  value={this.state.projector.value}
                  type="number"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="center-projector">Projector</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="center-detail"
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
              <div className="file-field input-field">
                <div className="btn navbar-purple round-btn">
                  <span>Image</span>
                  <input
                    type="file"
                    name="image"
                    onChange={this.handleImageChange}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="row center-align">
              <button
                className="btn waves-effect waves-light navbar-purple round-btn"
                type="submit"
                name="action"
                onClick={this.addCenter}
              >
                Add Center
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
AddCenter.propTypes = {
  centerActions: PropTypes.objectOf(PropTypes.func).isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    centerActions: bindActionCreators(centerActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(AddCenter);
