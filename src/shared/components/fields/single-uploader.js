import React, { PropTypes } from 'react';
import { Form, Upload, Message, Icon } from 'antd';
import cookie from 'js-cookie';
import { map, prop, isFunction } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import getAbsoluteUrl from '../../utils/absolute-url';
import getValidateStatus from './get-validate-status';
import authorizationCookieName from '../../constants/authorization-cookie-name';

const { Item } = Form;
const { Dragger } = Upload;

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
    extraText: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
  extraText,
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
        style={{
          height: 120,
          width: 120,
          background: `url(${getAbsoluteUrl(value)}) no-repeat center`,
          backgroundSize: 'contain',
          borderRadius: 6,
          ...style,
        }}
      >
        {disabled
          ? null : (
            <Dragger
              action={`${API_BASE_URL}/resource`}
              onChange={({ file: { response, status } }) => {
                if (status === 'done') {
                  Message.info('上传成功！');
                  onChange(response.url);
                } else if (status === 'error') {
                  const { errors } = response;
                  Message.error(
                    errors ? map(prop('message'))(errors) : '上传失败',
                  );
                }
              }}
              showUploadList={false}
              accept={accept}
              headers={{ 'x-auth-token': cookie.get(authorizationCookieName) }}
              name="file"
            >
              {value
                ? null : <div>
                  <Icon type="plus" />
                  <p style={{ fontSize: 12, color: '#999', marginTop: -10 }}>{placeholder}</p>
                </div>}
            </Dragger>
          )}
      </div>
      {extraText && (
        <span
          className="ant-form-text"
        >
          &nbsp;{isFunction(extraText) ? extraText(value) : extraText}
        </span>
      )}
    </Item>
  ));
