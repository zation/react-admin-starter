import React, { PropTypes } from 'react';
import { filter, includes, toUpper, flow, some, prop } from 'lodash/fp';
import { compose, withHandlers, withState, setPropTypes, setDisplayName } from 'recompose';
import { Input } from 'antd';

const { Search } = Input;

export const searchDataSource = (attributes, query) => filter(
  item => some(
    attribute => flow(
      prop(attribute),
      toUpper,
      includes(toUpper(query)),
    )(item),
  )(attributes),
);

export const searchComposer = compose(
  withState('query', 'setQuery', ''),
  withHandlers({
    search: ({ setQuery }) => ({ target: { value } }) => setQuery(value),
  }),
);

export default compose(
  setPropTypes({
    placeholder: PropTypes.string,

    search: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
)(({ search, placeholder }) => (
  <div style={{ textAlign: 'right', marginBottom: 10 }}>
    <Search
      placeholder={placeholder}
      onChange={search}
      style={{ width: 300 }}
    />
  </div>
));
