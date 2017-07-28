import getCurrentUser from 'shared/selector-helpers/current-user';
import { pick, flow } from 'lodash/fp';

export default state => ({
  initialValues: flow(
    getCurrentUser,
    pick(['nickname', 'username', 'birthDate', 'gender', 'id']),
  )(state),
});
