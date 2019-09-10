import React from 'react';
import { ResetPassword } from '@deity/falcon-ui-kit';

export default ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('token') || '';

  return <ResetPassword resetToken={resetToken} />;
};
