import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { goBack as goBackAction } from 'react-router-redux';

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    text: PropTypes.string,
  }),
  connect(null, { goBack: goBackAction }),
)(({ text = '返回', goBack }) => (
  <Button onClick={goBack}>
    {text}
  </Button>
));
