import getContentTagOptions from 'shared/selector-helpers/content-tag-options';

export default (state) => ({
  initialValues: {
    tags: [],
  },
  contentTagOptions: getContentTagOptions(state),
});
