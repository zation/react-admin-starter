import React from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import { compose, setDisplayName, withHandlers } from 'recompose';
import cookie from 'js-cookie';
import { Link } from 'react-router';

import { logout as logoutAction } from 'shared/entities/actions/auth';
import Navigation from '../components/navigation';
import selector from './layout-selector';

import style from './layout.less';

const { Header, Footer, Sider, Content } = Layout;

export default compose(
  connect(
    selector, {
      logout: logoutAction,
    },
  ),
  withHandlers({
    logout: ({ logout }) => () => {
      cookie.remove('authorization');
      logout();
      location.replace('/auth/login');
    },
  }),
  setDisplayName(__filename),
)(({
  children,
  currentUser: { username },
  logout,
  currentOperation,
  currentOperationGroup,
}) => (
  <Layout className={style.Root}>
    <Header className={style.Header}>
      <div style={{ float: 'right' }}>
        <span>
          <Icon type="user" /> {username}
        </span>
        <Link to="/auth/login" style={{ marginLeft: 10 }} onClick={logout}>
          <Icon type="logout" /> Logout
        </Link>
      </div>
      <span className={style.Title}>React Admin Starter</span>
    </Header>

    <Layout>
      <Sider>
        <Navigation
          currentOperation={currentOperation}
          currentOperationGroup={currentOperationGroup}
        />
      </Sider>
      <Content className={style.Container}>
        <div className={style.Content}>
          {children}
        </div>
      </Content>
    </Layout>

    <Footer className={style.Footer}>
      React Admin Starter
    </Footer>
  </Layout>
));
