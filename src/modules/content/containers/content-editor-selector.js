import { pick, flow } from 'lodash/fp';

import getEntity from 'shared/entities/get-entity';
import getContentTagOptions from 'shared/selector-helpers/content-tag-options';

export default (state, { params: { contentId } }) => ({
  initialValues: flow(
    getEntity(`content.${contentId}`),
    pick([
      'title',
      'category',
      'cover',
      'author',
      'externalLink',
      'tags',
      'isRecommended',
      'status',
    ]),
  )(state),
  contentId: Number(contentId),
  contentTagOptions: getContentTagOptions(state),
});
