import { flow, prop } from 'lodash/fp';

import getEntity from 'shared/entities/get-entity';

export default state => flow(
  getEntity('user'),
  prop(getEntity('auth.currentUserId')(state)),
)(state);
