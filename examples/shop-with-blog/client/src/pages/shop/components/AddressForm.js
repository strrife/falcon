import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxFormField, CountrySelector } from '@deity/falcon-ecommerce-uikit';
import { Form, FormField } from '@deity/falcon-ui-kit';
import { Box, Button } from '@deity/falcon-ui';

const AddressForm = ({ countries = [], submitLabel = 'Save', askDefault, id = '', autoCompleteSection }) => {
  const getAutoComplete = attribute => [autoCompleteSection, attribute].filter(x => x).join(' ');

  const askDefaultFields = askDefault ? (
    <Box mb="sm">
      <CheckboxFormField name="defaultShipping" />
      <CheckboxFormField name="defaultBilling" />
    </Box>
  ) : null;

  return (
    <Form id={id} i18nId="addressForm">
      {askDefaultFields}
      <FormField name="firstname" required autoComplete={getAutoComplete('given-name')} />
      <FormField name="lastname" required autoComplete={getAutoComplete('family-name')} />
      <FormField name="street1" required autoComplete={getAutoComplete('address-line1')} />
      <FormField name="street2" autoComplete={getAutoComplete('address-line2')} />
      <FormField name="countryId" required autoComplete={getAutoComplete('country')}>
        {({ form, field }) => (
          <CountrySelector {...field} items={countries} onChange={x => form.setFieldValue(field.name, x)} />
        )}
      </FormField>
      <FormField name="postcode" required autoComplete={getAutoComplete('postal-code')} />
      <FormField name="city" required autoComplete={getAutoComplete('address-level2')} />
      <FormField name="telephone" required autoComplete={getAutoComplete('tel')} />
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
  askDefault: PropTypes.bool,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      localName: PropTypes.string,
      code: PropTypes.string
    })
  )
};

export default AddressForm;
