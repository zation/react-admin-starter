import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Popconfirm, Table, Switch } from 'antd';
import Link from 'shared/components/link';

import { PUBLISHED } from 'shared/constants/content-status';
import { time } from 'shared/utils/formatter';
import Image from 'shared/components/image';
import Search, { searchComposer, searchDataSource } from 'shared/components/search';

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    contents: PropTypes.array.isRequired,
    removeContent: PropTypes.func.isRequired,
    toggleContentStatus: PropTypes.func.isRequired,
    toggleRecommendation: PropTypes.func.isRequired,
  }),
  withProps(({ removeContent, toggleContentStatus, toggleRecommendation }) => ({
    columns: [{
      title: 'Cover',
      key: 'cover',
      dataIndex: 'cover',
      render: (cover) => <Image width={120} src={cover} alt="cover" />,
    }, {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    }, {
      title: 'Author',
      key: 'author',
      dataIndex: 'author',
    }, {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
    }, {
      title: 'View Count',
      key: 'viewCount',
      dataIndex: 'viewCount',
    }, {
      title: 'Update Time',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: time('MM-DD HH:MM'),
    }, {
      title: 'Publish',
      key: 'status',
      dataIndex: 'status',
      render: (status, { id }) => (
        <div>
          <Switch checked={status === PUBLISHED} onChange={toggleContentStatus({ id, status })} />
        </div>
      ),
    }, {
      title: 'Recommendation',
      key: 'recommendation',
      dataIndex: 'isRecommended',
      render: (isRecommended, { id, status }) => (
        <div>
          <Switch
            checked={isRecommended}
            disabled={status !== PUBLISHED}
            onChange={toggleRecommendation({ id, isRecommended })}
          />
        </div>
      ),
    }, {
      title: 'Operation',
      key: 'operation',
      render: ({ id, externalLink }) => (
        <div>
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview
          </a>
          &nbsp;&nbsp;
          <Link to={`/content/edit/${id}`}>Edit</Link>
          &nbsp;&nbsp;
          <Popconfirm
            title="Confirm to delete this content?"
            onConfirm={() => removeContent({ id })}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    }],
  })),
  searchComposer,
)(({ contents, columns, search, query }) => (
  <div>
    <Search
      placeholder="Please search by title, author, category"
      search={search}
    />

    <Table
      dataSource={searchDataSource(['title', 'author', 'category'], query)(contents)}
      columns={columns}
      rowKey="id"
    />
  </div>
));
