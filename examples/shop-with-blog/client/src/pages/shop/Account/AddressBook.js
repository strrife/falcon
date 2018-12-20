import React from 'react';
import { T } from '@deity/falcon-i18n';
import { H1, H2, Box, Divider } from '@deity/falcon-ui';
import {
  AddressesListQuery,
  AddressCardLayout,
  AddressDetails,
  AddressesListLayout
} from '@deity/falcon-ecommerce-uikit';

const AddressBook = () => (
  <Box>
    <H1>
      <T id="addressBook.title" />
    </H1>
    <AddressesListQuery>
      {({ addresses: { items } }) => {
        const defaultBilling = items.find(x => x.defaultBilling) || {};
        const defaultShipping = items.find(x => x.defaultShipping) || {};
        const restAddresses = items.filter(x => !x.defaultBilling && !x.defaultShipping) || [];

        return (
          <>
            {(defaultBilling || defaultShipping) && (
              <>
                <AddressesListLayout>
                  {defaultBilling && (
                    <AddressCardLayout>
                      <H2>
                        <T id="addressBook.defaultBilling" />
                      </H2>
                      <AddressDetails {...defaultBilling} />
                      <Box>Edit | Delete</Box>
                    </AddressCardLayout>
                  )}
                  {defaultShipping && (
                    <AddressCardLayout>
                      <H2>
                        <T id="addressBook.defaultShipping" />
                      </H2>
                      <AddressDetails {...defaultShipping} />
                      <Box>Edit | Delete</Box>
                    </AddressCardLayout>
                  )}
                </AddressesListLayout>
                <Divider my="lg" />
              </>
            )}
            <AddressesListLayout>
              {restAddresses.map(x => (
                <AddressCardLayout>
                  <AddressDetails {...x} />
                  <Box>Edit | Delete</Box>
                </AddressCardLayout>
              ))}
            </AddressesListLayout>
          </>
        );
      }}
    </AddressesListQuery>
  </Box>
);

export default AddressBook;
