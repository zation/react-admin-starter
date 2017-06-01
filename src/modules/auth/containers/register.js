import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';

import { register as registerAction } from 'shared/entities/actions/user';
import Form from '../components/register-form';

export default compose(
  connect(
    null, {
      register: registerAction,
      push: pushAction,
    },
  ),
  withHandlers({
    register: ({ register, push }) => ({ username, password }) =>
      register({ username, password }).then(() => push('/users/mine/settings')),
  }),
  setDisplayName(__filename),
)(({ register }) => (
  <Form onSubmit={register} />
));
