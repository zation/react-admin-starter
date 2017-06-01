import { reduce, isNil, prop } from 'lodash/fp';

export default (values, { requiredFields = [] }) => reduce(
  (errors, requiredField) => {
    if (isNil(prop(requiredField)(values))) {
      return {
        ...errors,
        [requiredField]: '必填项',
      };
    }
    return errors;
  },
  {},
)(requiredFields);
