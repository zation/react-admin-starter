import { flow, filter, propEq, size } from 'lodash/fp';

import { NUMBER, PIE } from 'shared/constants/stats-type';
import { getEntityArray } from 'shared/entities/get-entity';
import { CUSTOMER } from 'shared/constants/user-role';
import { MALE, FEMALE, getGenderText } from 'shared/constants/gender';
import { ACTIVE, INACTIVE, ACTIVATING, getUserStatusText } from 'shared/constants/user-status';
import { YELLOW, GREEN, BLUE, RED } from 'shared/constants/color';

export default state => {
  const users = flow(
    getEntityArray('user'),
    filter(propEq('role.key', CUSTOMER)),
  )(state);
  const total = size(users);
  const male = flow(
    filter(propEq('gender', MALE)),
    size,
  )(users);

  return {
    users,
    statsItems: [{
      key: 'total',
      title: '用户总数',
      data: total,
      type: NUMBER,
    }, {
      key: 'gender',
      title: '性别',
      type: PIE,
      data: [{
        name: getGenderText(MALE),
        value: male,
        fill: BLUE,
      }, {
        name: getGenderText(FEMALE),
        value: total - male,
        fill: YELLOW,
      }],
    }, {
      key: 'status',
      title: '状态',
      type: PIE,
      data: [{
        name: getUserStatusText(ACTIVE),
        value: flow(
          filter(propEq('status', ACTIVE)),
          size,
        )(users),
        fill: GREEN,
      }, {
        name: getUserStatusText(INACTIVE),
        value: flow(
          filter(propEq('status', INACTIVE)),
          size,
        )(users),
        fill: RED,
      }, {
        name: getUserStatusText(ACTIVATING),
        value: flow(
          filter(propEq('status', ACTIVATING)),
          size,
        )(users),
        fill: YELLOW,
      }],
    }],
  };
};
