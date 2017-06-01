import React, { PropTypes } from 'react';
import { Form, Select } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { map } from 'lodash/fp';

import getValidateStatus from './get-validate-status';

const { Item } = Form;
const { Option, OptGroup } = Select;

const getOption = setPropTypes({
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
})(({ text, value }) => (
  <Option value={value} key={value}>{text}</Option>
));

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    layout: PropTypes.object,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    multiple: PropTypes.bool,
    tags: PropTypes.bool,
  }),
)(({
    input,
    meta: { touched, error },
    layout,
    label,
    required,
    disabled,
    options,
    multiple,
    tags,
  }) =>
  (
    <Item
      {...layout}
      label={label}
      hasFeedback
      validateStatus={getValidateStatus(touched, error)}
      help={touched && error}
      required={required}
    >
      <Select
        disabled={disabled}
        {...input}
        multiple={multiple}
        tags={tags}
      >
        {map(({ children, group, text, value }) => {
          if (group) {
            return (
              <OptGroup label={group} key={group}>
                {map(getOption)(children)}
              </OptGroup>
            );
          }
          return getOption({ text, value });
        })(options)}
      </Select>
    </Item>
  ));
