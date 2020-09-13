import { dataSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  data: dataSelector
});
