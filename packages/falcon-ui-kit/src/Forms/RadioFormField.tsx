import React from 'react';
import { Box, Label, Radio, FlexLayout, extractThemableProps, themed } from '@deity/falcon-ui';
import { toGridTemplate } from '../helpers';
import { Field } from './Field';
import { FormFieldProps } from './FormField';
import { FormFieldArea } from './FormFieldLayout';
import { requiredValidator, getDefaultInputTypeValidator } from './validators';

export const RadioFormFieldLayout = themed({
  tag: Box,
  defaultTheme: {
    radioFormFieldLayout: {
      display: 'grid',
      gridGap: 'xs',
      // prettier-ignore
      gridTemplate: toGridTemplate([
        ['auto', '1fr'],
        [FormFieldArea.input, FormFieldArea.label],
        [FormFieldArea.error, FormFieldArea.error, '0px']
      ])
    }
  }
});

export const RadioFormField: React.SFC<FormFieldProps> = props => {
  const { name, value, validate, required, children, ...restProps } = props;
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
      {({ field, label }) => (
        <RadioFormFieldLayout {...themableProps}>
          <Radio {...field} value={value} checked={value === field.value} gridArea={FormFieldArea.input} />
          <FlexLayout alignItems="center" gridArea={FormFieldArea.label}>
            <Label htmlFor={field.id}>{children || label}</Label>
          </FlexLayout>
        </RadioFormFieldLayout>
      )}
    </Field>
  );
};
