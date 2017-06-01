import React, { PropTypes } from 'react';
import { Form, InputNumber } from 'antd';
import { isFunction } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import getValidateStatus from './get-validate-status';

const { Item } = Form;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    size: PropTypes.oneOf(['large', 'small']),
    layout: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    inputStyle: PropTypes.object,
    extraText: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  }),
)(({
  min,
  max,
  step,
  size,
  input,
  meta: { touched, error },
  layout,
  label,
  placeholder,
  required,
  disabled,
  inputStyle,
  extraText,
}) => (
  <Item
    {...layout}
    label={label}
    hasFeedback
    validateStatus={getValidateStatus(touched, error)}
    help={touched && error}
    required={required}
  >
    <InputNumber
      {...input}
      onBlur={() => {}}
      placeholder={placeholder}
      disabled={disabled}
      style={inputStyle}
      min={min}
      max={max}
      step={step}
      size={size}
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
