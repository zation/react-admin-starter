import React, { PropTypes } from 'react';
import { Form, Checkbox } from 'antd';
import { prop } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import getValidateStatus from './get-validate-status';

const { Item } = Form;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    layout: PropTypes.object,
    label: PropTypes.node,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
)(({
  input,
  meta: { touched, error },
  layout,
  label,
  required,
  disabled,
}) => (
  <Item
    wrapperCol={{ ...prop('wrapperCol')(layout), offset: prop('labelCol.span')(layout) }}
    hasFeedback
    validateStatus={getValidateStatus(touched, error)}
    help={touched && error}
    required={required}
  >
    <Checkbox {...input} disabled={disabled}>{label}</Checkbox>
  </Item>
));
