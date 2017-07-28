import getProductCategoryOptions from 'shared/selector-helpers/product-category-options';
import { DRAFT } from 'shared/constants/product-status';

export default state => ({
  initialValues: {
    isRecommended: false,
    status: DRAFT,
  },
  productCategoryOptions: getProductCategoryOptions(state),
});
