import React from 'react';
import { Box, Label, Checkbox, FlexLayout, extractThemableProps, themed } from '@deity/falcon-ui';
import { toGridTemplate } from '../helpers';
import { Field } from './Field';
import { FormFieldProps } from './FormField';
import { FormFieldError } from './FormFieldError';
import { FormFieldArea } from './FormFieldLayout';
import { requiredValidator, getDefaultInputTypeValidator } from './validators';

export const CheckboxFormFieldLayout = themed({
  tag: Box,
  defaultTheme: {
    checkboxFormFieldLayout: {
      display: 'grid',
      gridGap: 'xs',
      // prettier-ignore
      gridTemplate: toGridTemplate([
        ['auto',             '1fr'                      ],
        [FormFieldArea.input, FormFieldArea.label       ],
        [FormFieldArea.error, FormFieldArea.error, '0px']
      ])
    }
  }
});

export const CheckboxFormField: React.SFC<FormFieldProps> = props => {
  const { name, validate, required, children, ...restProps } = props;
  const { themableProps, rest } = extractThemableProps(restProps);

  // eslint-disable-next-line
  let validators = validate || [];
  if (required) {
    validators.unshift(requiredValidator);
  }
  const defaultInputTypeValidator = !validate && getDefaultInputTypeValidator(restProps.type);
  if (defaultInputTypeValidator) {
    validators.push(defaultInputTypeValidator);
  }

  return (
    <Field name={name} validate={validators} {...rest}>
      {({ form, field, label, error }) => (
        <CheckboxFormFieldLayout {...themableProps}>
          <Checkbox
            {...field}
            gridArea={FormFieldArea.input}
            checked={field.value}
            onChange={e => form.setFieldValue(field.name, e.target.checked)}
          />
          <FlexLayout alignItems="center" gridArea={FormFieldArea.label}>
            <Label htmlFor={field.id}>{label}</Label>
          </FlexLayout>

          <FormFieldError>{field.invalid ? error : null}</FormFieldError>
        </CheckboxFormFieldLayout>
      )}
    </Field>
  );
};
