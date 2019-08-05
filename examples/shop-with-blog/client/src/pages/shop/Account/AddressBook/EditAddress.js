import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, GridLayout } from '@deity/falcon-ui';
import { AddressQuery, GET_ADDRESS, EditAddressMutation, CountriesQuery, Loader } from '@deity/falcon-ecommerce-uikit';
import AddressForm from '../../components/AddressForm';
import ErrorList from '../../components/ErrorList';

const EditAddress = ({ match }) => {
  const id = parseInt(match.params.id, 10);

  const [done, setDone] = useState(false);

  if (done) {
    return <Redirect to="/account/address-book" />;
  }

  return (
    <AddressQuery variables={{ id }}>
      {({ address }) => (
        <CountriesQuery>
          {({ countries }) => (
            <EditAddressMutation refetchQueries={['Addresses', { query: GET_ADDRESS, variables: { id } }]}>
              {(editAddress, { loading, error }) => (
                <GridLayout mb="md" gridGap="md">
                  {loading && <Loader variant="overlay" />}
                  <H1>
                    <T id="editAddress.title" />
                  </H1>
                  <Formik
                    initialValues={{
                      firstname: address.firstname,
                      lastname: address.lastname,
                      street1: address.street[0],
                      street2: address.street.length > 1 ? address.street[1] : '',
                      postcode: address.postcode,
                      city: address.city,
                      countryId: address.countryId,
                      company: address.company || undefined,
                      telephone: address.telephone,
                      defaultBilling: address.defaultBilling,
                      defaultShipping: address.defaultShipping
                    }}
                    onSubmit={({ street1, street2, ...values }) =>
                      editAddress({
                        variables: {
                          input: {
                            ...values,
                            id,
                            street: [street1, street2]
                          }
                        }
                      }).then(() => setDone(true))
                    }
                  >
                    <AddressForm
                      id="edit-address"
                      twoColumns
                      askDefault
                      onCancel={() => setDone(true)}
                      countries={countries.items}
                    />
                  </Formik>
                  <ErrorList errors={error ? [new Error(error)] : []} />
                </GridLayout>
              )}
            </EditAddressMutation>
          )}
        </CountriesQuery>
      )}
    </AddressQuery>
  );
};

export default EditAddress;
