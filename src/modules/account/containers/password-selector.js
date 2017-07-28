import getCurrentUser from 'shared/selector-helpers/current-user';
import { prop, flow } from 'lodash/fp';

export default state => ({
  userId: flow(
    getCurrentUser,
    prop('id'),
  )(state),
});
