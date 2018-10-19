import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Badge, Icon } from '@deity/falcon-ui';

export const MiniCartIcon: React.SFC<{
  onClick: Function;
  gridArea: string;
  itemsQty: number;
}> = ({ onClick, gridArea, itemsQty }) => (
  <Box gridArea={gridArea} onClick={() => onClick()} css={{ cursor: 'pointer', position: 'relative' }}>
    <Icon src="cart" />
    {itemsQty > 0 && (
      <Badge
        fontSize="xs"
        css={{
          position: 'absolute',
          bottom: '-10px',
          right: '-10px'
        }}
      >
        {itemsQty}
      </Badge>
    )}
  </Box>
);
