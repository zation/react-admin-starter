import { isUndefined } from 'lodash/fp';

export const required = value => (value ? undefined : 'Required field');

export const samePasswordAs = (fieldName) => (value, filedValues) =>
  (value === filedValues[fieldName] ? undefined : 'Passwords are not the same');

export const minLength = length => value => (value && value.length < length
  ? `Please input at lease ${length} characters` : undefined);

export const greaterOrEqual = (fieldName, errorMessage = 'Input number too small') => (value, fieldValues) =>
  (isUndefined(value) || value >= fieldValues[fieldName] ? undefined : errorMessage);
