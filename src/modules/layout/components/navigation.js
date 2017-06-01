import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Menu } from 'antd';
import { Link } from 'react-router';
import { map } from 'lodash/fp';

import {
  menu,
} from 'shared/constants/operation-group';
import style from './navigation.less';

const { SubMenu, Item } = Menu;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    currentOperation: PropTypes.string,
    currentOperationGroup: PropTypes.string,
  }),
)(({ currentOperation, currentOperationGroup }) => (
  <Menu
    className={style.Root}
    mode="inline"
    selectedKeys={[currentOperation]}
    defaultOpenKeys={[currentOperationGroup]}
  >
    {map(({ key, text, children }) => (
      <SubMenu
        title={text}
        key={key}
      >
        {map(({ key: childKey, link, text: childText }) => (
          <Item key={childKey}>
            <Link to={link}>{childText}</Link>
          </Item>
        ))(children)}
      </SubMenu>
    ))(menu)}
  </Menu>
));
