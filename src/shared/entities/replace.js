import { isArray, propOr } from 'lodash/fp';
import { normalize } from 'normalizr';

export default schema => (originalData, { payload }) =>
  propOr({}, `entities.${schema.key}`)(
    normalize(payload, isArray(payload) ? [schema] : schema),
  );
