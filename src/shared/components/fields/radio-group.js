import React, { PropTypes } from 'react';
import { Form, Radio } from 'antd';
import { map } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import getValidateStatus from './get-validate-status';

const { Item } = Form;
const { Group } = Radio;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    layout: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
)(({
  input: { onChange, value },
  meta: { touched, error },
  layout,
  label,
  options,
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
    <Group onChange={onChange} value={value} disabled={disabled}>
      {map(option => (
        <Radio key={option.value} value={option.value}>{option.text}</Radio>
      ))(options)}
    </Group>
  </Item>
));
