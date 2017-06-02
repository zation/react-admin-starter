import { schema } from 'normalizr';

export const user = new schema.Entity('user');
export const role = new schema.Entity('role');
export const content = new schema.Entity('content');
export const banner = new schema.Entity('banner', { idAttribute: 'order' });
export const shopBanner = new schema.Entity('shopBanner', { idAttribute: 'order' });
export const productCategory = new schema.Entity('productCategory');
export const product = new schema.Entity('product');
export const coupon = new schema.Entity('coupon');
export const order = new schema.Entity('order');
