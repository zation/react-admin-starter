import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Popconfirm, Table, Switch } from 'antd';
import { Link } from 'react-router';

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
      title: '缩略图',
      key: 'cover',
      dataIndex: 'cover',
      render: (cover) => <Image width={120} src={cover} alt="cover" />,
    }, {
      title: '名称',
      key: 'title',
      dataIndex: 'title',
    }, {
      title: '作者',
      key: 'author',
      dataIndex: 'author',
    }, {
      title: '类型',
      key: 'category',
      dataIndex: 'category',
    }, {
      title: '阅读量',
      key: 'viewCount',
      dataIndex: 'viewCount',
    }, {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: time('MM-DD HH:MM'),
    }, {
      title: '是否发布',
      key: 'status',
      dataIndex: 'status',
      render: (status, { id }) => (
        <div>
          <Switch checked={status === PUBLISHED} onChange={toggleContentStatus({ id, status })} />
        </div>
      ),
    }, {
      title: '是否推荐',
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
      title: '操作',
      key: 'operation',
      render: ({ id, externalLink }) => (
        <div>
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            预览
          </a>
          &nbsp;&nbsp;
          <Link to={`/content/edit/${id}`}>编辑</Link>
          &nbsp;&nbsp;
          <Popconfirm
            title="确定删除该文章吗？"
            onConfirm={() => removeContent({ id })}
          >
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    }],
  })),
  searchComposer,
)(({ contents, columns, search, query }) => (
  <div>
    <Search
      placeholder="请输入标题、作者、类型进行搜索"
      search={search}
    />

    <Table
      dataSource={searchDataSource(['title', 'author', 'category'], query)(contents)}
      columns={columns}
      rowKey="id"
    />
  </div>
));
