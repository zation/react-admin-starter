import { isArray, mapValues, prop } from 'lodash/fp';
import { normalize, arrayOf } from 'normalizr';

const mapValuesIndexed = mapValues.convert({ cap: false });

export default schema => (originalData, { payload }) => {
  const newData = prop(`entities.${schema.getKey()}`)(
    normalize(payload, isArray(payload) ? arrayOf(schema) : schema),
  );

  return {
    ...originalData,
    ...mapValuesIndexed((value, key) => ({ ...originalData[key], ...value }))(newData),
  };
};
