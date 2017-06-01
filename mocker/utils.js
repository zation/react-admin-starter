import { map, flow, filter, prop } from 'lodash/fp';
import { users } from './user';

export const getRandomUserIds = () => flow(
  filter(() => Math.random() > 0.8),
  map(prop('id')),
)(users);

export const getRandomUsers = () => filter(() => Math.random() > 0.8)(users);
