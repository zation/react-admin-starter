import { isArray, mapValues, prop } from 'lodash/fp';
import { normalize } from 'normalizr';

const mapValuesIndexed = mapValues.convert({ cap: false });

export default schema => (originalData, { payload }) => {
  const newData = prop(`entities.${schema.key}`)(
    normalize(payload, isArray(payload) ? [schema] : schema),
  );

  return {
    ...originalData,
    ...mapValuesIndexed((value, key) => ({ ...originalData[key], ...value }))(newData),
  };
};
