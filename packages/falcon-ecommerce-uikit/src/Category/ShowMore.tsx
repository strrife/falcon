import React, { MouseEventHandler } from 'react';
import { Button, Box } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';

export const ShowMore: React.SFC<{ onClick: MouseEventHandler; loading: boolean }> = ({ onClick, loading }) => (
  <Button onClick={onClick} variant={loading ? 'loader' : 'secondary'} height="xl" my="sm">
    <T id="productsList.pagination.showMore" />
  </Button>
);
