import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import faker from 'faker';

import auth from './auth';
import user from './user';
import role from './role';
import content from './content';
import resource from './resource';
import productCategory from './product-category';
import product from './product';
import coupon from './coupon';
import order from './order';
import shoppingCartRouter from './shopping-cart';
import shopBanner from './shop-banner';

faker.locale = 'zh_CN';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

const router = new Router();
auth(router);
user(router);
role(router);
content(router);
resource(router);
productCategory(router);
product(router);
coupon(router);
order(router);
shoppingCartRouter(router);
shopBanner(router);
app.use(router);

app.listen(9001, () => {
  // eslint-disable-next-line no-console
  console.log('Mock server is running on port 9001');
});
