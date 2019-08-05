import React from 'react';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, GridLayout } from '@deity/falcon-ui';
import { CountriesQuery, AddAddressMutation, Loader } from '@deity/falcon-ecommerce-uikit';
import AddressForm from '../../components/AddressForm';
import ErrorList from '../../components/ErrorList';

const AddAddress = ({ history }) => {
  const initialAddressValues = {
    firstname: '',
    lastname: '',
    street1: '',
    street2: '',
    postcode: '',
    city: '',
    countryId: '',
    company: '',
    telephone: '',
    defaultBilling: false,
    defaultShipping: false
  };

  return (
    <CountriesQuery>
      {({ countries }) => (
        <AddAddressMutation>
          {(addAddress, { loading, error }) => (
            <GridLayout position="relative" mb="md" gridGap="md">
              {loading && <Loader variant="overlay" />}
              <H1>
                <T id="addAddress.title" />
              </H1>
              <Formik
                initialValues={initialAddressValues}
                onSubmit={
                  ({ street1, street2, ...values }) =>
                    addAddress({
                      variables: {
                        input: {
                          ...values,
                          street: [street1, street2]
                        }
                      }
                    }).then(() => history.push('/account/address-book')) // TODO: render Redirect instead
                }
              >
                {() => <AddressForm twoColumns id="add-address" countries={countries.items} askDefault />}
              </Formik>
              <ErrorList errors={error ? [new Error(error)] : []} />
            </GridLayout>
          )}
        </AddAddressMutation>
      )}
    </CountriesQuery>
  );
};

export default AddAddress;
