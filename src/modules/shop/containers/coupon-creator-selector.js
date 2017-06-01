import { formValueSelector } from 'redux-form';

import { COUPON } from 'shared/constants/form-name';
import { FIXED } from 'shared/constants/coupon-type';
import { percentage } from 'shared/utils/formatter';

const selector = formValueSelector(COUPON);

export default (state, { params: { type } }) => {
  const { condition, discount } = selector(state, 'condition', 'discount');
  return {
    type,
    name: type === FIXED
      ? `满 ${condition || '--'} 减 ${discount || '--'}`
      : `${percentage()(discount)} 折扣`,
  };
};
