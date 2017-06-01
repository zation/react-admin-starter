import { isUndefined } from 'lodash/fp';

export const required = value => (value ? undefined : '必填项');

export const samePasswordAs = (fieldName) => (value, filedValues) =>
  (value === filedValues[fieldName] ? undefined : '两次输入密码不一致');

export const minLength = length => value => (value && value.length < length
  ? `需要至少${length}个字符` : undefined);

export const greaterOrEqual = (fieldName, errorMessage = '输入值过低') => (value, fieldValues) =>
  (isUndefined(value) || value >= fieldValues[fieldName] ? undefined : errorMessage);
