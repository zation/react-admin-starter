import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { push as pushAction } from 'react-router-redux';

import { create as createContentAction } from 'shared/entities/actions/content';
import Form from '../components/article-form';
import selector from './article-creator-selector';

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
        push('/content/article/list');
      }),
  }),
)(({ onSubmit, initialValues, contentTagOptions }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues} contentTagOptions={contentTagOptions} />
));
