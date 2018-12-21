import React from 'react';
import { Box } from '@deity/falcon-ui';

const OfflineNotification = () => (
  <Box
    p="sm"
    color="white"
    css={{
      textAlign: 'center',
      backgroundColor: '#000',
      position: 'relative',
      ':before': {
        content: '""',
        width: '200vw',
        height: '100%',
        background: '#000',
        position: 'absolute',
        left: '-50vw',
        right: '50vw',
        top: 0,
        zIndex: -1
      }
    }}
  >
    You are offline.
  </Box>
);

export default OfflineNotification;
