import { withProps } from 'recompose';
import { SubmissionError } from 'redux-form';
import { reduce } from 'lodash/fp';

export default withProps(({ onSubmit }) => onSubmit && {
  onSubmit: async (values, dispatch, props) => {
    try {
      await onSubmit(values, dispatch, props);
    } catch ({ errors }) {
      throw new SubmissionError(reduce((object, { field, message }) => ({
        ...object,
        [field === 'default' ? '_error' : field]: message,
      }), {})(errors));
    }
  },
});
