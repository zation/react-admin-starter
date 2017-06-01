import { startsWith } from 'lodash/fp';

export default url => (startsWith('http')(url) || startsWith('//')(url)
  ? url : `http://${url}`);

