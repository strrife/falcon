import React from 'react';
import { Box } from '@deity/falcon-ui';

const BlurOverlay = props => {
  console.log(props);
  return (
    <Box
      transitionTimingFunction="easeInOut"
      transitionDuration="standard"
      css={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 162,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0000002e',
        zIndex: 1
      }}
    />
  );
};

export default BlurOverlay;
