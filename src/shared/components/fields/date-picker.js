import PropTypes from 'prop-types';
import React from 'react';
import { Form, DatePicker } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import moment from 'moment';

import getValidateStatus from './get-validate-status';

const { Item } = Form;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    layout: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
)(({
  input,
  meta: { touched, error },
  layout,
  label,
  placeholder,
  required,
  disabled,
}) => (
  <Item
    {...layout}
    label={label}
    hasFeedback
    validateStatus={getValidateStatus(touched, error)}
    help={touched && error}
    required={required}
  >
    <DatePicker
      {...input}
      value={input.value ? moment(input.value) : undefined}
      placeholder={placeholder}
      disabled={disabled}
    />
  </Item>
));
