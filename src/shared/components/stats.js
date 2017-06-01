import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Card } from 'antd';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
} from 'recharts';
import { map, flow, toString, size, identity } from 'lodash/fp';

import { NUMBER, BAR, PIE } from 'shared/constants/stats-type';

import style from './stats.less';

const getContent = (type, data, name, width = 150, height = 154, formatter = identity) => {
  if (type === NUMBER) {
    const figures = flow(toString, size)(data);
    let fontSize = 64;
    if (figures > 3 && figures <= 4) {
      fontSize = 48;
    } else if (figures > 4) {
      fontSize = 32;
    }

    return (
      <div
        className={style.Number}
        style={{ fontSize }}
      >
        {formatter(data)}
      </div>
    );
  }
  if (type === BAR) {
    return (
      <BarChart data={data} width={width} height={height}>
        <Tooltip />
        <XAxis dataKey="name" />
        <Bar dataKey="value" name={name} />
      </BarChart>
    );
  }
  if (type === PIE) {
    return (
      <PieChart width={width} height={height} className={style.Pie}>
        <Tooltip />
        <Legend />
        <Pie dataKey="value" innerRadius={40} data={data} />
      </PieChart>
    );
  }
  return null;
};

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.number,
          PropTypes.string,
        ]).isRequired,
        formatter: PropTypes.func,
      }).isRequired,
    ).isRequired,
  }),
)(({ items }) => (
  <div className={style.Root}>
    {map(({ type, key, title, width, height, data, name , formatter}) => (
      <Card
        key={key}
        title={title}
        className={style.Item}
        style={{ width: width ? 'auto' : undefined }}
      >
        {getContent(type, data, name, width, height, formatter)}
      </Card>
    ))(items)}
  </div>
));
