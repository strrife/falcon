import React from 'react';
import { Box } from '@deity/falcon-ui';
import { MiniCartQuery, MiniAccountQuery, MiniCart, MiniAccount } from '@deity/falcon-ecommerce-uikit';

export default ({ contentType }) => {
  if (!contentType) return null;
  // using hidden attribute will cause react to consider rendering it as low priority
  // (in version > 16.6) - https://github.com/oliviertassinari/react-swipeable-views/issues/453#issuecomment-417939459
  return (
    <React.Fragment>
      <Box hidden={contentType !== 'cart'} css={{ height: '100%' }}>
        <MiniCartQuery>{data => <MiniCart {...data} />}</MiniCartQuery>
      </Box>
      <div hidden={contentType !== 'signin'}>
        <MiniAccountQuery>{data => <MiniAccount {...data} />}</MiniAccountQuery>
      </div>
    </React.Fragment>
  );
};
