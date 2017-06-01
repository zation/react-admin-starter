import { isArray, propOr } from 'lodash/fp';
import { normalize, arrayOf } from 'normalizr';

export default schema => (originalData, { payload }) =>
  propOr({}, `entities.${schema.getKey()}`)(
    normalize(payload, isArray(payload) ? arrayOf(schema) : schema),
  );
