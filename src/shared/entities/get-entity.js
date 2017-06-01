import { prop, curry, flow, map } from 'lodash/fp';

export const getEntityArray = curry(
  (keyPath, store) => flow(prop(`entities[${keyPath}]`), map(value => value))(store),
);

export default curry((keyPath, store) => prop(`entities.${keyPath}`, store));
