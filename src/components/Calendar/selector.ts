import { scoreSelector, dataSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  score: scoreSelector,
  data: dataSelector
});
