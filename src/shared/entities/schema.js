import { Schema } from 'normalizr';

export const user = new Schema('user');
export const role = new Schema('role');
export const content = new Schema('content');
export const banner = new Schema('banner', { idAttribute: 'order' });
export const shopBanner = new Schema('shopBanner', { idAttribute: 'order' });
export const productCategory = new Schema('productCategory');
export const product = new Schema('product');
export const coupon = new Schema('coupon');
export const order = new Schema('order');
