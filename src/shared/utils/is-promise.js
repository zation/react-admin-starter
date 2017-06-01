import { isFunction } from 'lodash/fp';

export default target => target && isFunction(target.then);
