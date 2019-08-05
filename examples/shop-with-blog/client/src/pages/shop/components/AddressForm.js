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
import { T } from '@deity/falcon-i18n';

const AddressForm = props => {
  const {
    id = '',
    submitLabel = 'Save',
    twoColumns,
    askDefault,
    onCancel,
    countries = [],
    autoCompleteSection
  } = props;

  const getAutoComplete = attribute => [autoCompleteSection, attribute].filter(x => x).join(' ');

  const askDefaultFields = (
    <Box mb="sm">
      <CheckboxFormField name="defaultShipping" />
      <CheckboxFormField name="defaultBilling" />
    </Box>
  );

  // The form content, not including default address fields and submit button(s)
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
        <FormField name="postcode" required autoComplete={getAutoComplete('postal-code')} />
        <FormField name="city" required autoComplete={getAutoComplete('address-level2')} />
        <FormField name="countryId" required autoComplete={getAutoComplete('country')}>
          {({ form, field }) => (
            <CountrySelector {...field} items={countries} onChange={x => form.setFieldValue(field.name, x)} />
          )}
        </FormField>
      </GridLayout>
    </React.Fragment>
  );

  return (
    <Form id={id} i18nId="addressForm">
      {askDefault && askDefaultFields}
      {twoColumns ? <TwoColumnsLayout>{formContent}</TwoColumnsLayout> : formContent}
      <FlexLayout justifyContent={twoColumns ? 'flex-end' : 'flex-start'} alignItems="center" mt="md">
        {onCancel && (
          <Button onClick={onCancel} mr="md">
            <T id="addressForm.cancelButton" />
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </FlexLayout>
    </Form>
  );
};

AddressForm.propTypes = {
  id: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  twoColumns: PropTypes.bool,
  askDefault: PropTypes.bool,
  onCancel: PropTypes.func,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      localName: PropTypes.string,
      code: PropTypes.string
    })
  )
};

export default AddressForm;
