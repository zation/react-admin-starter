import PropTypes from 'prop-types';
import React from 'react';
import { Form, Upload, Message, Icon } from 'antd';
import cookie from 'js-cookie';
import { map, prop, concat, reject, eq } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import getAbsoluteUrl from '../../utils/absolute-url';
import getValidateStatus from './get-validate-status';
import authorizationCookieName from '../../constants/authorization-cookie-name';

const { Item } = Form;

const { API_BASE_URL } = global.CONFIG;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    layout: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
  }),
)(({
    input: { onChange, value },
    meta: { touched, error },
    layout,
    label,
    placeholder = '点击上传',
    style,
    required,
    disabled,
    accept,
  }) =>
  (
    <Item
      {...layout}
      label={label}
      hasFeedback
      validateStatus={getValidateStatus(touched, error)}
      help={touched && error}
      required={required}
    >
      <div
        className="clearfix"
        style={style}
      >
        <Upload
          action={`${API_BASE_URL}/resource`}
          listType="picture-card"
          defaultFileList={map(url => ({
            uid: url,
            url: getAbsoluteUrl(url),
            status: 'done',
          }))(value)}
          onChange={({ file: { response, status } }) => {
            if (status === 'done') {
              Message.info('上传成功！');
              onChange(value ? concat(value)(response.url) : [response.url]);
            } else if (status === 'error') {
              const { errors } = response;
              Message.error(
                errors ? map(prop('message'))(errors) : '上传失败',
              );
            }
          }}
          onRemove={({ uid, response }) => onChange(reject(eq(uid || response.url))(value))}
          accept={accept}
          headers={{ 'x-auth-token': cookie.get(authorizationCookieName) }}
          name="file"
        >
          {disabled
            ? null
            : (
              <div>
                <Icon type="plus" />
                <div>{placeholder}</div>
              </div>
            )}
        </Upload>
      </div>
    </Item>
  ));
