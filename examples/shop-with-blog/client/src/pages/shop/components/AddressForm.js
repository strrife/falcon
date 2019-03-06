import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, ErrorMessage } from 'formik';
import { FormField, CountrySelector, toGridTemplate } from '@deity/falcon-ecommerce-uikit';
import { Box, Label, Text, Button } from '@deity/falcon-ui';

const AddressFormArea = {
  firstName: 'firstName',
  lastName: 'lastName',
  street: 'street',
  number: 'number',
  postCode: 'postCode',
  city: 'city',
  email: 'email',
  phone: 'phone',
  region: 'region',
  country: 'country',
  submit: 'submit'
};

const addressFormLayout = {
  addressFormLayout: {
    display: 'grid',
    gridGap: 'sm',
    my: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr'                      ],
      [AddressFormArea.email      ],
      [AddressFormArea.firstName  ],
      [AddressFormArea.lastName   ],
      [AddressFormArea.street     ],
      [AddressFormArea.number     ],
      [AddressFormArea.postCode   ],
      [AddressFormArea.city       ],
      [AddressFormArea.phone      ],
      [AddressFormArea.country    ],
      [AddressFormArea.submit     ]
    ])
  }
};

const AddressForm = ({ countries = [], submitLabel = 'Save', id = '', autoCompleteSection }) => {
  const getAutoComplete = attribute => [autoCompleteSection, attribute].filter(x => x).join(' ');

  return (
    <Box id={id} as={Form} defaultTheme={addressFormLayout}>
      <FormField name="email" type="email" label="Email" id={`${id}-email`} required gridArea={AddressFormArea.email} />
      <FormField
        name="firstname"
        label="First name"
        id={`${id}-firstname`}
        required
        autoComplete={getAutoComplete('given-name')}
        gridArea={AddressFormArea.firstName}
      />
      <FormField
        name="lastname"
        label="Last name"
        id={`${id}-lastname`}
        required
        autoComplete={getAutoComplete('family-name')}
        gridArea={AddressFormArea.lastName}
      />
      <FormField
        name="street"
        label="Street"
        id={`${id}-street`}
        required
        autoComplete={getAutoComplete('street-address')}
        gridArea={AddressFormArea.street}
      />
      <FormField
        name="postcode"
        label="Post code"
        id={`${id}-postcode`}
        required
        autoComplete={getAutoComplete('postal-code')}
        gridArea={AddressFormArea.postCode}
      />
      <FormField
        name="city"
        label="City"
        id={`${id}-city`}
        required
        autoComplete={getAutoComplete('address-level2')}
        gridArea={AddressFormArea.city}
      />

      <Field
        name="countryId"
        render={({ field, form }) => (
          <Box gridArea={AddressForm.country}>
            <Label htmlFor={`${id}-${field.name}`}>Country</Label>
            <CountrySelector
              id={`${id}-${field.name}`}
              autoComplete={getAutoComplete('country')}
              items={countries}
              value={field.value}
              onChange={value => form.setFieldValue(field.name, value)}
            />
            <ErrorMessage
              name={field.name}
              render={msg => (
                <Text fontSize="xs" color="error">
                  {msg}
                </Text>
              )}
            />
          </Box>
        )}
      />
      <FormField
        name="telephone"
        label="Phone"
        id={`${id}-telephone`}
        required
        autoComplete={getAutoComplete('tel')}
        gridArea={AddressFormArea.phone}
      />
      <Box gridArea={AddressFormArea.submit}>
        <Button type="submit">{submitLabel}</Button>
      </Box>
    </Box>
  );
};

AddressForm.propTypes = {
  id: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      localName: PropTypes.string,
      code: PropTypes.string
    })
  )
};

export default AddressForm;
