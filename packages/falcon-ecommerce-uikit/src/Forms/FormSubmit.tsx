import React from 'react';
import { Box, Button } from '@deity/falcon-ui';

export const FormSubmit: React.SFC<{ submitting: boolean; value: string }> = ({ submitting, value, children }) => (
  <Box justifySelf="end" mt="md">
    {children || (
      <Button type="submit" variant={submitting ? 'loader' : undefined}>
        {value}
      </Button>
    )}
  </Box>
);
