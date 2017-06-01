import qs from 'qs';
import { any, forEach, prop } from 'lodash/fp';

const { API_BASE_URL } = global.CONFIG;
const { File } = global;
const forEachWithKey = forEach.convert({ cap: false });

const commonFetch = (method, url, data, options) => {
  let finalData;
  let headers = {
    'content-type': 'application/json',
    ...prop('headers')(options),
  };
  if (any(item => item instanceof File)(data)) {
    finalData = new FormData();
    forEachWithKey((value, key) => {
      finalData.append(key, value);
    })(data);
    headers = {};
  } else if (data) {
    finalData = JSON.stringify(data);
  }

  return {
    ...options,
    url: `${API_BASE_URL}${url}`,
    isApi: true,
    method,
    headers,
    body: finalData,
  };
};

export const read = (url, query, options) =>
  commonFetch('GET', query ? `${url}?${qs.stringify(query)}` : url, null, options);

export const post = (url, data, options) =>
  commonFetch('POST', url, data, options);

export const put = (url, data, options) =>
  commonFetch('PUT', url, data, options);

export const patch = (url, data, options) =>
  commonFetch('PATCH', url, data, options);

export const del = (url, data, options) =>
  commonFetch(
    'DELETE',
    data ? `${url}?${qs.stringify(data)}` : url,
    null,
    options,
  );
