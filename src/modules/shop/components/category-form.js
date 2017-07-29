import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes, pure } from 'recompose';
import { Form, Button, Popconfirm } from 'antd';

import handleSubmitError from 'shared/utils/handle-submit-error';
import Input from 'shared/components/fields/input';
import { required } from 'shared/validations';

const { Item } = Form;

export default compose(
  pure,
  setPropTypes({
    onSubmit: PropTypes.func.isRequired,
    removeProductCategory: PropTypes.func,
    isEditing: PropTypes.bool,
  }),
  setDisplayName(__filename),
  handleSubmitError,
  reduxForm(),
)(({
  handleSubmit,
  submitting,
  removeProductCategory,
  reset,
  dirty,
  isEditing,
}) => (
  <Form
    layout="inline"
    onSubmit={handleSubmit}
  >
    <Field
      name="name"
      type="text"
      component={Input}
      validate={required}
      inputStyle={{ width: 300 }}
    />

    <Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={submitting}
        size="small"
        disabled={!dirty}
      >
        {isEditing ? 'Save' : 'Add'}
      </Button>
    </Item>

    {isEditing
      ? (
        <Item>
          <Button
            htmlType="reset"
            size="small"
            onClick={reset}
            disabled={!dirty}
          >
            Reset
          </Button>
        </Item>
      ) : null}

    {isEditing
      ? (
        <Item>
          <Popconfirm
            title="Confirm to delete this category?"
            onConfirm={removeProductCategory}
          >
            <Button
              type="danger"
              htmlType="button"
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Item>
      ) : null}
  </Form>
));
