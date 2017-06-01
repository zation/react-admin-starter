export default (touched, error) => {
  if (!touched) {
    return '';
  }
  if (touched && error) {
    return 'error';
  }
  return '';
};
