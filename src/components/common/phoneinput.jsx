import React from "react";
import {
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { TextMask, InputAdapter } from "react-text-mask-hoc";

const PhoneInput = ({ name, label, error, onChange, ...rest }) => {
  return (
    <React.Fragment>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fa fa-phone" />
          </InputGroupText>
        </InputGroupAddon>
        <TextMask
          {...rest}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={label}
          className={"form-control " + (error ? "is-invalid" : "is-valid")}
          autoComplete={name}
          mask={[
            "(",
            /[1-9]/,
            /\d/,
            /\d/,
            ")",
            " ",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ]}
          Component={InputAdapter}
        />
      </InputGroup>
      <FormText color="muted">ex. (999) 999-9999</FormText>
      {error && <div className="text-danger">{error}</div>}
    </React.Fragment>
  );
};

export default PhoneInput;
