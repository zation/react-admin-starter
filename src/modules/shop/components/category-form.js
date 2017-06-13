import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes, pure } from 'recompose';
import { Form, Button, Popconfirm } from 'antd';

import submit from 'shared/utils/submit-handler';
import Input from 'shared/components/fields/input';
import { required } from 'shared/validations';

const { Item } = Form;

export default compose(
  pure,
  setPropTypes({
    onSubmit: PropTypes.func.isRequired,
    removeProductCategory: PropTypes.func,
    shouldResetAfterSubmit: PropTypes.bool,
  }),
  setDisplayName(__filename),
  reduxForm(),
)(({
  onSubmit,
  handleSubmit,
  submitting,
  removeProductCategory,
  reset,
  dirty,
  isEditing,
  shouldResetAfterSubmit,
}) => (
  <Form
    layout="inline"
    onSubmit={handleSubmit(submit((values) => {
      return onSubmit(values).then(action => {
        if (shouldResetAfterSubmit) {
          reset();
        }
        return action;
      });
    }))}
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
