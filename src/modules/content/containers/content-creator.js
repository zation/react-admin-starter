import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { push as pushAction } from 'shared/history';
import Layout from 'shared/containers/layout';

import { create as createContentAction } from 'shared/entities/actions/content';
import Form from '../components/content-form';
import selector from './content-creator-selector';

export default compose(
  connect(selector, {
    createContent: createContentAction,
    push: pushAction,
  }),
  setDisplayName(__filename),
  withHandlers({
    onSubmit: ({ createContent, push }) => (values) => createContent(values)
      .then(() => {
        Message.success('Create content success!');
        push('/content/list');
      }),
  }),
)(({ onSubmit, initialValues, contentTagOptions }) => (
  <Layout>
    <Form onSubmit={onSubmit} initialValues={initialValues} contentTagOptions={contentTagOptions} />
  </Layout>
));
