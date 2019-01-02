import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, Box, Label, Text, Button, FlexLayout, GridLayout, Checkbox } from '@deity/falcon-ui';
import {
  FormField,
  Form,
  FormErrorSummary,
  TwoColumnsLayout,
  TwoColumnsLayoutArea,
  AddAddressMutation,
  CountriesQuery,
  CountrySelector
} from '@deity/falcon-ecommerce-uikit';

const AddAddress = ({ history }) => (
  <GridLayout mb="md" gridGap="md">
    <H1>
      <T id="addAddress.title" />
    </H1>
    <AddAddressMutation>
      {(addAddress, { loading, error }) => (
        <Formik
          initialValues={{
            firstname: undefined,
            lastname: undefined,
            street: undefined,
            postcode: undefined,
            city: undefined,
            countryId: undefined,
            company: undefined,
            telephone: undefined,
            defaultBilling: false,
            defaultShipping: false
          }}
          onSubmit={values =>
            addAddress({
              variables: {
                input: {
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
          {() => {
            const id = 'add-address';

            return (
              <Form id={id} i18nId="addAddress">
                <Field
                  name="defaultBilling"
                  render={({ field, form }) => (
                    <Box>
                      <FlexLayout my="xs">
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
                <Field
                  name="defaultShipping"
                  render={({ field, form }) => (
                    <Box>
                      <FlexLayout my="xs">
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
                <TwoColumnsLayout>
                  <GridLayout gridArea={TwoColumnsLayoutArea.left}>
                    <FormField name="company" />
                    <FormField name="firstname" required />
                    <FormField name="lastname" required />
                    <FormField name="telephone" />
                  </GridLayout>
                  <GridLayout gridArea={TwoColumnsLayoutArea.right}>
                    <FormField name="street" required />
                    <FormField name="postcode" required />
                    <FormField name="city" required />
                    <Field
                      name="countryId"
                      render={({ field, form }) => (
                        <Box>
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
                  </GridLayout>
                </TwoColumnsLayout>

                <FlexLayout justifyContent="flex-end" alignItems="center" mt="md">
                  <Button type="submit" variant={loading ? 'loader' : undefined}>
                    <T id="addAddress.submitButton" />
                  </Button>
                </FlexLayout>
                <FormErrorSummary errors={error && [error.message]} />
              </Form>
            );
          }}
        </Formik>
      )}
    </AddAddressMutation>
  </GridLayout>
);

export default AddAddress;
