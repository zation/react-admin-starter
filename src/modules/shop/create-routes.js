import ShopBannerList from './containers/banner-list';
import ShopBannerCreator from './containers/banner-creator';
import ShopBannerEditor from './containers/banner-editor';
import CategoryList from './containers/category-list';
import ProductList from './containers/product-list';
import ProductEditor from './containers/product-editor';
import ProductCreator from './containers/product-creator';
import CouponList from './containers/coupon-list';
import CouponCreator from './containers/coupon-creator';
import CouponEditor from './containers/coupon-editor';
import OrderList from './containers/order-list';
import OrderDetail from './containers/order-detail';
import OrderEditor from './containers/order-editor';
import ShippingFeeEditor from './containers/shipping-fee-editor';

export default () => ({
  path: 'shop',
  childRoutes: [{
    path: 'banner',
    childRoutes: [{
      path: 'create',
      component: ShopBannerCreator,
    }, {
      path: 'list',
      component: ShopBannerList,
    }, {
      path: 'edit/:order',
      component: ShopBannerEditor,
    }],
  }, {
    path: 'shipping-fee',
    component: ShippingFeeEditor,
  }, {
    path: 'category/list',
    component: CategoryList,
  }, {
    path: 'product',
    childRoutes: [{
      path: 'list',
      component: ProductList,
    }, {
      path: 'create',
      component: ProductCreator,
    }, {
      path: 'edit/:productId',
      component: ProductEditor,
    }],
  }, {
    path: 'coupon',
    childRoutes: [{
      path: 'list',
      component: CouponList,
    }, {
      path: 'create/:type',
      component: CouponCreator,
    }, {
      path: 'edit/:couponId',
      component: CouponEditor,
    }],
  }, {
    path: 'order',
    childRoutes: [{
      path: 'list',
      component: OrderList,
    }, {
      path: 'view/:orderId',
      component: OrderDetail,
    }, {
      path: 'edit/:orderId',
      component: OrderEditor,
    }],
  }],
});
