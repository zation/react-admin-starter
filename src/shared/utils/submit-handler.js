import { SubmissionError } from 'redux-form';
import { reduce } from 'lodash/fp';

export default promiseFunction => values => promiseFunction(values)
  .catch(({ errors }) => {
    throw new SubmissionError(reduce((object, { field, message }) => ({
      ...object,
      [field === 'default' ? '_error' : field]: message,
    }), {})(errors));
  });
