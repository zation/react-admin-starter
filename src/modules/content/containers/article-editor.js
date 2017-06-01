import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import { update as updateContentAction } from 'shared/entities/actions/content';
import Form from '../components/article-form';
import selector from './article-editor-selector';

export default compose(
  connect(selector, {
    updateContent: updateContentAction,
  }),
  setDisplayName(__filename),
  withHandlers({
    onSubmit: ({ updateContent, contentId }) => (values) => updateContent({
      ...values,
      id: contentId,
    }).then(() => {
      Message.success('Update content success!');
    }),
  }),
)(({ onSubmit, initialValues, contentTagOptions }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues} contentTagOptions={contentTagOptions} />
));
