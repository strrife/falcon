import React from 'react';
import { Box, Icon, Button, Text, H2 } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { SignOutMutation } from '@deity/falcon-shop-data';
import { MiniAccountData } from './MiniAccountQuery';
import { SignIn } from './SignIn';

export const MiniAccount: React.SFC<MiniAccountData> = ({ customer }) =>
  customer ? (
    <Box>
      <Box>
        <H2>{`${customer.firstname} ${customer.lastname}`}</H2>
        <Text>{customer.email}</Text>
        <SignOutMutation>
          {(signOut, { loading }) => (
            <Button css={{ width: '100%' }} mt="md" disabled={loading} onClick={() => signOut()}>
              <T id="signOut.link" />
              <Icon
                src={loading ? 'loader' : 'logOut'}
                stroke="white"
                fill={loading ? 'white' : 'transparent'}
                size="md"
                ml="xs"
              />
            </Button>
          )}
        </SignOutMutation>
      </Box>
    </Box>
  ) : (
    <SignIn />
  );
