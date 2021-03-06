import { flow, reject, filter, size, propEq, sumBy, prop, sortBy, reverse } from 'lodash/fp';

import { getEntityArray } from 'shared/entities/get-entity';
import { NUMBER, PIE } from 'shared/constants/stats-type';
import { DELETED, PUBLISHED, DRAFT, getContentStatusText } from 'shared/constants/content-status';
import { BLUE, YELLOW } from 'shared/constants/color';

export default (state) => {
  const contents = flow(
    getEntityArray('content'),
    reject(propEq('status', DELETED)),
    sortBy(['isRecommended']),
    reverse,
  )(state);
  const total = size(contents);

  return {
    contents,
    statsItems: [{
      key: 'total',
      type: NUMBER,
      title: 'Content Total',
      data: total,
    }, {
      key: 'viewCount',
      type: NUMBER,
      title: 'View Count',
      data: sumBy(prop('viewCount'))(contents),
    }, {
      key: 'status',
      type: PIE,
      title: 'Status',
      data: [{
        name: getContentStatusText(PUBLISHED),
        value: flow(
          filter(propEq('status', PUBLISHED)),
          size,
        )(contents),
        fill: BLUE,
      }, {
        name: getContentStatusText(DRAFT),
        value: flow(
          filter(propEq('status', DRAFT)),
          size,
        )(contents),
        fill: YELLOW,
      }],
    }],
  };
};
