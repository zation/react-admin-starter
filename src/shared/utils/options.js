import { map, isArray } from 'lodash/fp';

const mapWithKeys = map.convert({ cap: false });

export default list => {
  if (isArray(list)) {
    return map(value => ({
      value,
      text: value,
    }))(list);
  }
  return mapWithKeys((text, key) => ({
    value: key,
    text,
  }))(list);
};
