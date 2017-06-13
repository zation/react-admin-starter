import { reduce, isNil, prop } from 'lodash/fp';

export default (values, { requiredFields = [] }) => reduce(
  (errors, requiredField) => {
    if (isNil(prop(requiredField)(values))) {
      return {
        ...errors,
        [requiredField]: 'Required field',
      };
    }
    return errors;
  },
  {},
)(requiredFields);
