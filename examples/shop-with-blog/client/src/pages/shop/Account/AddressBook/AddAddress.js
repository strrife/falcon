import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, GridLayout } from '@deity/falcon-ui';
import { CountriesQuery, Loader } from '@deity/falcon-ecommerce-uikit';
import { AddAddressMutation } from '@deity/falcon-shop-data';
import AddressForm from '../../components/AddressForm';
import ErrorList from '../../components/ErrorList';

const AddAddress = () => {
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

  const [done, setDone] = useState(false);

  if (done) {
    return <Redirect to="/account/address-book" />;
  }

  return (
    <CountriesQuery>
      {({ countries }) => (
        <AddAddressMutation>
          {(addAddress, { loading, error }) => (
            <GridLayout mb="md" gridGap="md">
              {loading && <Loader variant="overlay" />}
              <H1>
                <T id="addAddress.title" />
              </H1>
              <Formik
                initialValues={initialAddressValues}
                onSubmit={({ street1, street2, ...values }) =>
                  addAddress({
                    variables: {
                      input: {
                        ...values,
                        street: [street1, street2]
                      }
                    }
                  }).then(setDone(true))
                }
              >
                <AddressForm
                  id="add-address"
                  twoColumns
                  askDefault
                  onCancel={() => setDone(true)}
                  countries={countries.items}
                />
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
