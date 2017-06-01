import { flow, map } from 'lodash/fp';
import getEntity from '../entities/get-entity';

export default flow(
  getEntity('contentTag'),
  map(tag => ({
    text: tag,
    value: tag,
  })),
);
