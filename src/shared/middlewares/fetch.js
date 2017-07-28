import { prop } from 'lodash/fp';

import fetch from '../utils/fetch';
import getEntity from '../entities/get-entity';
import { throwServerError } from '../entities/actions/server-error';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw response;
};

const deserialize = (response) => {
  const header = response.headers.get('Content-Type') || '';
  if (header.indexOf('application/json') > -1) {
    return response.json();
  }
  if (header.indexOf('application/octet-stream') > -1) {
    return response.arrayBuffer();
  }
  return response.text();
};

const handleSuccess = (dispatch, action) => response =>
  deserialize(response)
    .then(data => dispatch({ ...action, payload: data }));

const handleFailed = (dispatch, { meta }) => response =>
  deserialize(response)
    .then((data) => {
      dispatch(throwServerError({
        errors: data,
      }, {
        status: response.status,
        statusText: response.statusText,
        ignoreGlobalWarning: prop('ignoreGlobalWarning')(meta),
        ignoreAuthRedirection: prop('ignoreAuthRedirection')(meta),
      }));
      throw data;
    });

export default ({ getState, dispatch }) => next => (action) => {
  const { payload } = action;
  if (payload) {
    const { url, isApi, withoutAuth, ...options } = payload;
    if (isApi) {
      const authorization = getEntity('auth.authorization')(getState());
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'x-auth-token': !withoutAuth && authorization ? authorization : undefined,
        },
      }).then(checkStatus)
        .then(handleSuccess(dispatch, action))
        .catch(handleFailed(dispatch, action));
    }
  }
  return next(action);
};
