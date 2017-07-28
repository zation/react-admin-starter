import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table } from 'antd';

import { PRODUCT_CATEGORY } from 'shared/constants/form-name';
import Form from './category-form';

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    categories: PropTypes.array.isRequired,

    removeProductCategory: PropTypes.func,
    updateProductCategory: PropTypes.func,
    createProductCategory: PropTypes.func,
  }),
  withProps(({ removeProductCategory, updateProductCategory }) => ({
    columns: [{
      title: 'Title',
      key: 'name',
      dataIndex: 'name',
      render: (name, { id }) => (
        <Form
          form={`${PRODUCT_CATEGORY}${id}`}
          initialValues={{ name }}
          removeProductCategory={() => removeProductCategory({ id })}
          onSubmit={values => updateProductCategory({ ...values, id })}
          isEditing
        />
      ),
    }],

  })),
)(({ categories, columns, createProductCategory }) => (
  <Table
    dataSource={categories}
    columns={columns}
    rowKey="id"
    footer={() => (
      <Form
        form={`${PRODUCT_CATEGORY}create`}
        shouldResetAfterSubmit
        onSubmit={createProductCategory}
      />
    )}
  />
));
