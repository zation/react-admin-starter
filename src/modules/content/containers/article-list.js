import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button, Message } from 'antd';
import { Link } from 'react-router';

import { remove as removeContentAction, update as updateContentAction } from 'shared/entities/actions/content';
import { PUBLISHED, DRAFT } from 'shared/constants/content-status';
import Stats from 'shared/components/stats';
import List from '../components/article-list';
import selector from './article-list-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    removeContent: removeContentAction,
    updateContent: updateContentAction,
  }),
  withHandlers({
    toggleContentStatus: ({ updateContent }) => ({ id, status }) => () => updateContent({
      id,
      status: status === PUBLISHED ? DRAFT : PUBLISHED,
    }).then(() => {
      Message.success('Update status success!');
    }),
    toggleRecommendation: ({ updateContent }) => ({ id, isRecommended }) => () => updateContent({
      id,
      isRecommended: !isRecommended,
    }).then(() => {
      Message.success('Update recommendation success!');
    }),
  }),
)(({ contents, removeContent, toggleContentStatus, toggleRecommendation, statsItems }) => (
  <div>
    <Stats items={statsItems} />

    <div style={{ marginBottom: -30 }}>
      <Button type="primary" size="large">
        <Link to="/content/article/create">Create Content</Link>
      </Button>
    </div>
    <List
      contents={contents}
      removeContent={removeContent}
      toggleContentStatus={toggleContentStatus}
      toggleRecommendation={toggleRecommendation}
    />
  </div>
));
