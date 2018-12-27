import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, Box, Label, Text, Button, FlexLayout, Checkbox } from '@deity/falcon-ui';
import {
  FormField,
  Form,
  FormErrorSummary,
  AddressQuery,
  EditAddressMutation,
  AddressFormLayoutArea,
  addressFormLayout,
  CountriesQuery,
  CountrySelector
} from '@deity/falcon-ecommerce-uikit';

const EditAddress = ({ match, history }) => {
  const id = parseInt(match.params.id, 10);

  return (
    <AddressQuery variables={{ id }} fetchPolicy="cache-and-network">
      {({ address }) => (
        <Box>
          <H1>
            <T id="editAddress.title" />
          </H1>

          {(address.defaultBilling || address.defaultShipping) && (
            <Text>
              <T
                id="editAddress.defaultAddressLabel"
                context={[
                  address.defaultBilling ? 'billing' : undefined,
                  address.defaultShipping ? 'shipping' : undefined
                ]
                  .filter(x => x)
                  .join('&')}
              />
            </Text>
          )}
          <EditAddressMutation>
            {(editAddress, { loading, error }) => (
              <Formik
                initialValues={{
                  firstname: address.firstname,
                  lastname: address.lastname,
                  street: address.street[0],
                  postcode: address.postcode,
                  city: address.city,
                  countryId: address.countryId,
                  company: address.company,
                  telephone: address.telephone,
                  defaultBilling: address.defaultBilling,
                  defaultShipping: address.defaultShipping
                }}
                onSubmit={values =>
                  editAddress({
                    variables: {
                      input: {
                        id,
                        firstname: values.firstname,
                        lastname: values.lastname,
                        street: [values.street],
                        postcode: values.postcode,
                        city: values.city,
                        countryId: values.countryId,
                        company: values.company,
                        telephone: values.telephone,
                        defaultBilling: values.defaultBilling,
                        defaultShipping: values.defaultShipping
                      }
                    }
                  }).then(() => history.push('/account/address-book'))
                }
              >
                {() => (
                  <Form id={id} i18nId="editAddress" defaultTheme={addressFormLayout}>
                    <FormField name="company" gridArea={AddressFormLayoutArea.company} />
                    <FormField name="firstname" required gridArea={AddressFormLayoutArea.firstName} />
                    <FormField name="lastname" required gridArea={AddressFormLayoutArea.lastname} />
                    <FormField name="telephone" gridArea={AddressFormLayoutArea.telephone} />

                    <FormField name="street" required gridArea={AddressFormLayoutArea.street} />
                    <FormField name="postcode" required gridArea={AddressFormLayoutArea.postcode} />
                    <FormField name="city" required gridArea={AddressFormLayoutArea.city} />
                    <Field
                      name="countryId"
                      render={({ field, form }) => (
                        <Box gridArea={AddressFormLayoutArea.country}>
                          <Label htmlFor={`${id}-${field.name}`}>Country *</Label>
                          <CountriesQuery passLoading>
                            {({ countries = { items: [] } }) => (
                              <CountrySelector
                                items={countries.items}
                                value={field.value}
                                onChange={x => form.setFieldValue(field.name, x)}
                              />
                            )}
                          </CountriesQuery>
                          <ErrorMessage
                            name={field.name}
                            render={msg => (
                              <Text fontSize="xxs" color="error">
                                {msg}
                              </Text>
                            )}
                          />
                        </Box>
                      )}
                    />

                    <Box
                      gridArea={AddressFormLayoutArea.address}
                      display="grid"
                      gridGap="sm"
                      css={{ alignContent: 'start' }}
                    >
                      {address.defaultBilling === false && (
                        <Field
                          name="defaultBilling"
                          render={({ field, form }) => (
                            <Box>
                              <FlexLayout mb="md">
                                <Checkbox
                                  id={`${id}-${field.name}`}
                                  size="sm"
                                  checked={field.value}
                                  onChange={e => form.setFieldValue(field.name, e.target.checked)}
                                />
                                <Label htmlFor={`${id}-${field.name}`}>defaultBilling</Label>
                              </FlexLayout>
                              <ErrorMessage
                                name={field.name}
                                render={msg => (
                                  <Text fontSize="xxs" color="error">
                                    {msg}
                                  </Text>
                                )}
                              />
                            </Box>
                          )}
                        />
                      )}
                      {address.defaultShipping === false && (
                        <Field
                          name="defaultShipping"
                          render={({ field, form }) => (
                            <Box>
                              <FlexLayout mb="md">
                                <Checkbox
                                  id={`${id}-${field.name}`}
                                  size="sm"
                                  checked={field.value}
                                  onChange={e => form.setFieldValue(field.name, e.target.checked)}
                                />
                                <Label htmlFor={`${id}-${field.name}`}>defaultShipping</Label>
                              </FlexLayout>
                              <ErrorMessage
                                name={field.name}
                                render={msg => (
                                  <Text fontSize="xxs" color="error">
                                    {msg}
                                  </Text>
                                )}
                              />
                            </Box>
                          )}
                        />
                      )}
                    </Box>

                    <FlexLayout justifyContent="space-between" alignItems="center" mt="md">
                      <Button type="submit" variant={loading ? 'loader' : undefined}>
                        <T id="editAddress.submitButton" />
                      </Button>
                    </FlexLayout>
                    <FormErrorSummary errors={error && [error.message]} />
                  </Form>
                )}
              </Formik>
            )}
          </EditAddressMutation>
        </Box>
      )}
    </AddressQuery>
  );
};

export default EditAddress;
