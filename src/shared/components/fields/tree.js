import PropTypes from 'prop-types';
import React from 'react';
import { Form, Tree } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { map, filter, includes } from 'lodash/fp';

import getValidateStatus from './get-validate-status';

import style from './tree.less';

const { Item } = Form;
const { TreeNode } = Tree;

const getTreeNode = setPropTypes({
  title: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  children: PropTypes.array,
  disabled: PropTypes.bool,
})(({ title, key, children, disabled }) => (
  <TreeNode title={title} key={key} disabled={disabled}>
    {children && children.length > 0 ? map(getTreeNode)(children) : null}
  </TreeNode>
));

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    layout: PropTypes.object,
    label: PropTypes.string,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    checkable: PropTypes.bool,
    nodes: PropTypes.array.isRequired,
    validKeys: PropTypes.array,
  }),
)(({
  input: { value, onChange },
  meta: { touched, error },
  layout,
  label,
  required,
  multiple,
  checkable,
  defaultExpandAll,
  nodes,
  validKeys,
}) => (
  <Item
    {...layout}
    label={label}
    hasFeedback
    validateStatus={getValidateStatus(touched, error)}
    help={touched && error}
    required={required}
  >
    <Tree
      className={style.Tree}
      multiple={multiple}
      checkable={checkable}
      defaultExpandAll={defaultExpandAll}
      checkedKeys={value}
      selectedKeys={[]}
      onCheck={selectedKeys => onChange(validKeys
        ? filter(selectedKey => includes(selectedKey)(validKeys))(selectedKeys)
        : selectedKeys)}
    >
      {map(getTreeNode)(nodes)}
    </Tree>
  </Item>
));
