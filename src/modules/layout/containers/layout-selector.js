import {
  find,
  flow,
  map,
  prop,
  flatten,
  propEq,
  includes,
  toLower,
  split,
  startsWith,
  last,
  some,
} from 'lodash/fp';

import getCurrentUser from 'shared/selector-helpers/current-user';
import { operations } from 'shared/constants/operation';
import { menu } from 'shared/constants/operation-group';

export default (state, { location: { pathname } }) => {
  const currentOperation = flow(
      map(prop('children')),
      flatten,
      find(propEq('link', pathname)),
      prop('key'),
    )(menu) || find(
      operation => {
        if (startsWith('MANAGE')(operation)) {
          const word = flow(toLower, split('_'), last)(operation);
          return (new RegExp(`${word}/(list|edit|view|order|coupon)`)).test(pathname);
        }
        return includes(toLower(operation))(pathname);
      },
    )(operations);

  return {
    currentUser: getCurrentUser(state),
    currentOperation,
    currentOperationGroup: flow(
      find(({ children }) => some(propEq('key', currentOperation))(children)),
      prop('key'),
    )(menu),
  };
};
