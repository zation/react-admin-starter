import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input } from 'antd';
import { isFunction } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import getValidateStatus from './get-validate-status';

const { Item } = Form;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    layout: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    inputStyle: PropTypes.object,
    extraText: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  }),
)(({
  input,
  meta: { touched, error },
  layout,
  label,
  placeholder,
  type,
  required,
  disabled,
  extraText,
  inputStyle,
}) => (
  <Item
    {...layout}
    label={label}
    hasFeedback
    validateStatus={getValidateStatus(touched, error)}
    help={touched && error}
    required={required}
  >
    <Input
      type={type}
      {...input}
      placeholder={placeholder}
      disabled={disabled}
      style={inputStyle}
    />
    {extraText && (
      <span
        className="ant-form-text"
      >
        &nbsp;{isFunction(extraText) ? extraText(input.value) : extraText}
      </span>
    )}
  </Item>
));
