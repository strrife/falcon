import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { H1, H2, Box, Link, Divider } from '@deity/falcon-ui';
import {
  AddressesListQuery,
  AddressCardLayout,
  AddressDetails,
  AddressesListLayout,
  RemoveAddressMutation
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
                      <Box>
                        <EditAddressLink id={defaultBilling.id} /> | Delete
                      </Box>
                    </AddressCardLayout>
                  )}
                  {defaultShipping && (
                    <AddressCardLayout>
                      <H2>
                        <T id="addressBook.defaultShipping" />
                      </H2>
                      <AddressDetails {...defaultShipping} />
                      <Box>
                        <EditAddressLink id={defaultShipping.id} /> | Delete
                      </Box>
                    </AddressCardLayout>
                  )}
                </AddressesListLayout>
                <Divider my="lg" />
              </>
            )}
            <AddressesListLayout gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}>
              {restAddresses.map(x => (
                <AddressCardLayout key={x.id}>
                  <AddressDetails {...x} />
                  <Box>
                    <EditAddressLink id={x.id} /> | <RemoveAddressLink id={x.id} />
                  </Box>
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

const EditAddressLink = ({ id }) => (
  <Link as={RouterLink} to={`/account/address-book/edit/${id}`} flex={1}>
    Edit
  </Link>
);

const RemoveAddressLink = ({ id }) => (
  <RemoveAddressMutation>
    {(removeAddress /* , { loading, error } */) => (
      <Link onClick={() => removeAddress({ variables: { id } })} flex={1}>
        Delete
      </Link>
    )}
  </RemoveAddressMutation>
);
