import { prop, curry, flow, map, isNil, isObject, isEmpty } from 'lodash/fp';

const getEntity = curry((keyPath, state) => prop(`entities.${keyPath}`, state));

export const getEntityArray = curry(
  (keyPath, state) => flow(prop(`entities[${keyPath}]`), map(value => value))(state),
);

export const isEntityEmpty = curry((keyPath, state) => {
  const result = getEntity(keyPath)(state);
  return isNil(result) || (isObject(result) && isEmpty(result));
});

export default getEntity;
