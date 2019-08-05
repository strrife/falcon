import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormField,
  CheckboxFormField,
  CountrySelector,
  TwoColumnsLayout,
  TwoColumnsLayoutArea
} from '@deity/falcon-ecommerce-uikit';
import { Box, Button, GridLayout, FlexLayout } from '@deity/falcon-ui';

const AddressForm = props => {
  const { countries = [], submitLabel = 'Save', twoColumns, askDefault, id = '', autoCompleteSection } = props;

  const getAutoComplete = attribute => [autoCompleteSection, attribute].filter(x => x).join(' ');

  const askDefaultFields = (
    <Box mb="sm">
      <CheckboxFormField name="defaultShipping" />
      <CheckboxFormField name="defaultBilling" />
    </Box>
  );

  // Define the form content, not including optional fields for default address
  const formContent = (
    <React.Fragment>
      <GridLayout gridArea={twoColumns ? TwoColumnsLayoutArea.left : null}>
        <FormField name="firstname" required autoComplete={getAutoComplete('given-name')} />
        <FormField name="lastname" required autoComplete={getAutoComplete('family-name')} />
        <FormField name="telephone" required autoComplete={getAutoComplete('tel')} />
      </GridLayout>
      <GridLayout gridArea={twoColumns ? TwoColumnsLayoutArea.right : null}>
        <FormField name="street1" required autoComplete={getAutoComplete('address-line1')} />
        <FormField name="street2" autoComplete={getAutoComplete('address-line2')} />
        <FormField name="countryId" required autoComplete={getAutoComplete('country')}>
          {({ form, field }) => (
            <CountrySelector {...field} items={countries} onChange={x => form.setFieldValue(field.name, x)} />
          )}
        </FormField>
        <FormField name="postcode" required autoComplete={getAutoComplete('postal-code')} />
        <FormField name="city" required autoComplete={getAutoComplete('address-level2')} />
      </GridLayout>
      <FlexLayout>
        <Box mb="sm">
          <Button type="submit">{submitLabel}</Button>
        </Box>
      </FlexLayout>
    </React.Fragment>
  );

  return (
    <Form id={id} i18nId="addressForm">
      {askDefault && askDefaultFields}
      {twoColumns ? <TwoColumnsLayout>{formContent}</TwoColumnsLayout> : formContent}
    </Form>
  );
};

AddressForm.propTypes = {
  id: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  twoColumn: PropTypes.bool,
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
