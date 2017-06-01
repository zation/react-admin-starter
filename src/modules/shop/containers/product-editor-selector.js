import { pick } from 'lodash/fp';

import getEntity from 'shared/entities/get-entity';
import getProductCategoryOptions from 'shared/selector-helpers/product-category-options';

export default (state, { params: { productId } }) => {
  const product = getEntity(`product.${productId}`)(state);

  return {
    initialValues: pick([
      'name',
      'cover',
      'images',
      'contentImages',
      'price',
      'originalPrice',
      'inventory',
      'capacity',
      'productCategory',
      'status',
      'isRecommended',
    ])(product),
    productId: Number(productId),
    productCategoryOptions: getProductCategoryOptions(state),
  };
};
