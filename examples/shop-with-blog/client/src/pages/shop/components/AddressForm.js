import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, ErrorMessage } from 'formik';
import { FormField, toGridTemplate } from '@deity/falcon-ecommerce-uikit';
import { Box, Label, Text, Button, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';

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

const AddressForm = ({ countries = [], submitLabel = 'Save' }) => (
  <Box as={Form} defaultTheme={addressFormLayout}>
    <FormField name="email" type="email" label="Email" required gridArea={AddressFormArea.email} />
    <FormField name="firstname" label="First name" required gridArea={AddressFormArea.firstName} />
    <FormField name="lastname" label="Last name" required gridArea={AddressFormArea.lastName} />
    <FormField name="street" label="Street" required gridArea={AddressFormArea.street} />
    <FormField name="postcode" label="Post code" required gridArea={AddressFormArea.postCode} />
    <FormField name="city" label="City" required gridArea={AddressFormArea.city} />

    <Field
      name="countryId"
      render={({ field, form }) => (
        <Box gridArea={AddressForm.country}>
          <Label htmlFor={field.name}>Country *</Label>
          <Dropdown
            onChange={value => {
              form.setFieldValue(field.name, value);
            }}
          >
            <DropdownLabel>
              {(countries.find(item => item.code === field.value) || { localName: '' }).localName}
            </DropdownLabel>
            <DropdownMenu
              css={{
                maxHeight: 300,
                overflowY: 'scroll'
              }}
            >
              {countries.map(item => (
                <DropdownMenuItem key={item.localName} value={item.code}>
                  {item.localName}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          </Dropdown>
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
    <FormField name="telephone" label="Phone" required gridArea={AddressFormArea.phone} />
    <Box gridArea={AddressFormArea.submit}>
      <Button type="submit">{submitLabel}</Button>
    </Box>
  </Box>
);

AddressForm.propTypes = {
  submitLabel: PropTypes.string,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      localName: PropTypes.string,
      code: PropTypes.string
    })
  )
};

export default AddressForm;
