import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import entities from 'shared/entities/reducer';

export default combineReducers({
  ...entities,
  form: formReducer,
});
