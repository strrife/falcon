import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormField, CountrySelector } from '@deity/falcon-ecommerce-uikit';
import { Box, Button } from '@deity/falcon-ui';

const addressFormLayout = {
  addressFormLayout: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const AddressForm = ({ countries = [], submitLabel = 'Save', id = '', autoCompleteSection }) => {
  const getAutoComplete = attribute => [autoCompleteSection, attribute].filter(x => x).join(' ');

  return (
    <Form id={id} defaultTheme={addressFormLayout} i18nId="addressForm" height="400px">
      <FormField name="firstname" required autoComplete={getAutoComplete('given-name')} mb="sm" />
      <FormField name="lastname" required autoComplete={getAutoComplete('family-name')} mb="sm" />
      <FormField name="street1" required autoComplete={getAutoComplete('address-line1')} mb="sm" />
      <FormField name="street2" autoComplete={getAutoComplete('address-line2')} mb="sm" />
      <FormField name="countryId" required autoComplete={getAutoComplete('country')} mb="sm">
        {({ form, field }) => (
          <CountrySelector {...field} items={countries} onChange={x => form.setFieldValue(field.name, x)} />
        )}
      </FormField>
      <FormField name="postcode" required autoComplete={getAutoComplete('postal-code')} mb="sm" />
      <FormField name="city" required autoComplete={getAutoComplete('address-level2')} mb="sm" />
      <FormField name="telephone" required autoComplete={getAutoComplete('tel')} mb="sm" />
      <Box mb="sm">
        <Button type="submit">{submitLabel}</Button>
      </Box>
    </Form>
  );
};

AddressForm.propTypes = {
  id: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  // TODO: allow cancel
  // TODO: ask default
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      localName: PropTypes.string,
      code: PropTypes.string
    })
  )
};

export default AddressForm;
