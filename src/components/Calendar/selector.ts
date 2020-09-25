import { scoreSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  score: scoreSelector
});
