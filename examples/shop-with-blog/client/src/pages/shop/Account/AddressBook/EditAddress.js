import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { T, I18n } from '@deity/falcon-i18n';
import { H1, GridLayout } from '@deity/falcon-ui';
import { AddressQuery, GET_ADDRESS, EditAddressMutation, Loader } from '@deity/falcon-ecommerce-uikit';
import AddressForm from '../../components/AddressForm';
import ErrorList from '../../components/ErrorList';

const EditAddress = ({ match }) => {
  const id = parseInt(match.params.id, 10);

  const [done, setDone] = useState(false);

  if (done) {
    return <Redirect to="/account/address-book" />;
  }

  return (
    <EditAddressMutation refetchQueries={['Addresses', { query: GET_ADDRESS, variables: { id } }]}>
      {(editAddress, { loading, error }) => (
        <GridLayout position="relative" mb="md" gridGap="md">
          {loading && <Loader variant="overlay" />}
          <H1>
            <T id="editAddress.title" />
          </H1>
          <AddressQuery variables={{ id }}>
            {({ address }) => (
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
                <I18n>
                  {t => (
                    <AddressForm
                      id="add-address"
                      submitLabel={t('editAddress.submitButton')}
                      twoColumns
                      askDefault
                      onCancel={() => setDone(true)}
                    />
                  )}
                </I18n>
              </Formik>
            )}
          </AddressQuery>
          <ErrorList errors={error ? [new Error(error)] : []} />
        </GridLayout>
      )}
    </EditAddressMutation>
  );
};

export default EditAddress;
