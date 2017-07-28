import ShopBannerList from './containers/banner/banner-list';
import ShopBannerCreator from './containers/banner/banner-creator';
import ShopBannerEditor from './containers/banner/banner-editor';
import CategoryList from './containers/category-list';
import ProductList from './containers/product/product-list';
import ProductEditor from './containers/product/product-editor';
import ProductCreator from './containers/product/product-creator';
import CouponList from './containers/coupon/coupon-list';
import CouponCreator from './containers/coupon/coupon-creator';
import CouponEditor from './containers/coupon/coupon-editor';
import OrderList from './containers/order/order-list';
import OrderDetail from './containers/order/order-detail';
import OrderEditor from './containers/order/order-editor';

export default {
  path: '/shop',
  childRoutes: [{
    path: '/banner',
    childRoutes: [{
      path: '/create',
      component: ShopBannerCreator,
    }, {
      path: '/list',
      component: ShopBannerList,
    }, {
      path: '/edit/:order',
      component: ShopBannerEditor,
    }],
  }, {
    path: '/category/list',
    component: CategoryList,
  }, {
    path: '/product',
    childRoutes: [{
      path: '/list',
      component: ProductList,
    }, {
      path: '/create',
      component: ProductCreator,
    }, {
      path: '/edit/:productId',
      component: ProductEditor,
    }],
  }, {
    path: '/coupon',
    childRoutes: [{
      path: '/list',
      component: CouponList,
    }, {
      path: '/create/:type',
      component: CouponCreator,
    }, {
      path: '/edit/:couponId',
      component: CouponEditor,
    }],
  }, {
    path: '/order',
    childRoutes: [{
      path: '/list',
      component: OrderList,
    }, {
      path: '/view/:orderId',
      component: OrderDetail,
    }, {
      path: '/edit/:orderId',
      component: OrderEditor,
    }],
  }],
};
