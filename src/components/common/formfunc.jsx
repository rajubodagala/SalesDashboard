import React, { Component } from "react";
import Input from "./input";
import PhoneInput from "./phoneinput";
import Select from "./select";
import Joi from "joi-browser";

class FormFunc extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validatePhoneProperty = ({ name, value }) => {
    value = value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      const obj = { [name]: value };
      const schema = { [name]: this.schema[name] };
      const { error } = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    } else return null;
  };
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handlephoneChange = e => {
    const input = e.target;
    const errors = { ...this.state.errors };
    const errorMessage = this.validatePhoneProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
    console.log(data);
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary btn-sm">
        {label}
      </button>
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name] || ""}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderPhoneInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <PhoneInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handlephoneChange}
        error={errors[name]}
      />
    );
  }
}

export default FormFunc;
