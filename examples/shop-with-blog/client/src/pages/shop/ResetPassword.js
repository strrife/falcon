import React from 'react';
import { ResetPassword } from '@deity/falcon-ecommerce-uikit';

export default ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const customerId = +queryParams.get('id') || 0;
  const resetToken = queryParams.get('token') || '';

  return <ResetPassword customerId={customerId} resetToken={resetToken} />;
};
