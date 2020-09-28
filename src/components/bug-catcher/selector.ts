import { loadingDataSelector, errorDataSelector } from 'selectors';

import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  loading: loadingDataSelector,
  error: errorDataSelector
});
