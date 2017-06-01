import React, { PropTypes } from 'react';
import { Form } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';

const { Item } = Form;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    layout: PropTypes.object,
    label: PropTypes.string,
  }),
)(({
  input: { value },
  layout,
  label,
}) => (
  <Item
    {...layout}
    label={label}
  >
    <span className="ant-form-text">{value}</span>
  </Item>
));
