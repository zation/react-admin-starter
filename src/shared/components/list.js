import React, { PropTypes } from 'react';
import { compose, setPropTypes, setDisplayName } from 'recompose';
import { map, prop } from 'lodash/fp';
import { Row, Col } from 'antd';

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    dataSource: PropTypes.object,
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        dataIndex: PropTypes.string,
        render: PropTypes.func,
      }),
    ).isRequired,
    labelLayout: PropTypes.object,
    dataLayout: PropTypes.object,
  }),
)(({ items, dataSource, labelLayout, dataLayout, title }) => (
  <div>
    {title && (
      <Row style={{ margin: '10px 0' }}>
        <Col {...labelLayout}>
          <h3>{title}</h3>
        </Col>
      </Row>
    )}
    {map(({ dataIndex, title: itemTitle, render }) => (
      <Row key={dataIndex || itemTitle} style={{ margin: '10px 0' }}>
        <Col
          {...labelLayout}
          style={{ textAlign: 'right' }}
        >{itemTitle}：</Col>
        <Col {...dataLayout}>
          {render
            ? render(dataIndex ? prop(dataIndex)(dataSource) : dataSource, dataSource)
            : prop(dataIndex)(dataSource)}
        </Col>
      </Row>
    ))(items)}
  </div>
));
