import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T, I18n } from '@deity/falcon-i18n';
import { H1, H2, Box, Link, Icon, Button, Divider, FlexLayout } from '@deity/falcon-ui';
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
        const defaultBilling = items.find(x => x.defaultBilling);
        const defaultShipping = items.find(x => x.defaultShipping);
        const restAddresses = items.filter(x => !x.defaultBilling && !x.defaultShipping) || [];
        const anyDefaults = defaultBilling || defaultShipping;
        const defaultsEqual = (defaultBilling && defaultBilling.id) === (defaultShipping && defaultShipping.id);
        const anyRest = restAddresses.length > 0;

        return (
          <React.Fragment>
            {anyDefaults && (
              <AddressesListLayout my="md">
                {defaultsEqual ? (
                  <AddressCardLayout>
                    <H2>
                      <T id="addressBook.defaultBillingAndShipping" />
                    </H2>
                    <AddressCardContent address={defaultBilling} />
                  </AddressCardLayout>
                ) : (
                  <React.Fragment>
                    {defaultBilling && (
                      <AddressCardLayout>
                        <H2>
                          <T id="addressBook.defaultBilling" />
                        </H2>
                        <AddressCardContent address={defaultBilling} />
                      </AddressCardLayout>
                    )}
                    {defaultShipping && (
                      <AddressCardLayout>
                        <H2>
                          <T id="addressBook.defaultShipping" />
                        </H2>
                        <AddressCardContent address={defaultShipping} />
                      </AddressCardLayout>
                    )}
                  </React.Fragment>
                )}
              </AddressesListLayout>
            )}
            {anyDefaults && anyRest && <Divider />}
            {anyRest && (
              <Box my="md">
                <H2>
                  <T id="addressBook.otherAddresses" />
                </H2>
                <AddressesListLayout gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}>
                  {restAddresses.map(x => (
                    <AddressCardLayout key={x.id}>
                      <AddressCardContent address={x} />
                    </AddressCardLayout>
                  ))}
                </AddressesListLayout>
              </Box>
            )}
            <FlexLayout flexDirection="column" alignItems="center" p="sm">
              <Button as={RouterLink} to="/account/address-book/add" flex={1}>
                <T id="addressBook.addNewButton" />
              </Button>
            </FlexLayout>
          </React.Fragment>
        );
      }}
    </AddressesListQuery>
  </Box>
);

export default AddressBook;

const AddressCardContent = ({ address }) => (
  <React.Fragment>
    <AddressDetails {...address} />
    <FlexLayout flexDirection="row" mt="xs">
      <EditAddressLink id={address.id} />
      <Divider variant="horizontal" mx="xs" />
      <RemoveAddressLink id={address.id} />
    </FlexLayout>
  </React.Fragment>
);

const EditAddressLink = ({ id }) => (
  <Link as={RouterLink} to={`/account/address-book/edit/${id}`}>
    <T id="addressBook.editButton" />
  </Link>
);

const RemoveAddressLink = ({ id }) => (
  <RemoveAddressMutation>
    {(removeAddress, { loading }) => (
      <I18n>
        {t => (
          <React.Fragment>
            <Link
              onClick={() => {
                if (window.confirm(t('addressBook.removeConfirmationMessage'))) {
                  removeAddress({ variables: { id } });
                }
              }}
            >
              {t('addressBook.removeButton')}
            </Link>
            {loading && <Icon ml="xs" src="loader" size="md" />}
          </React.Fragment>
        )}
      </I18n>
    )}
  </RemoveAddressMutation>
);
