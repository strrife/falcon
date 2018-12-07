import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { Box, Label, Input, DefaultThemeProps, ThemedComponentProps, extractThemableProps } from '@deity/falcon-ui';
import { toGridTemplate } from '../helpers';
import { Validator, passwordValidator, emailValidator, requiredValidator } from './validators';

export const FormFieldAreas = {
  label: 'label',
  input: 'input',
  error: 'error'
};

const formFieldLayout: DefaultThemeProps = {
  formFieldLayout: {
    display: 'grid',
    gridGap: 'none',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['1fr'                      ],
      [FormFieldAreas.label       ],
      [FormFieldAreas.input       ],
      [FormFieldAreas.error, '0px']
    ])
  }
};

const formFieldErrorLayout: DefaultThemeProps = {
  formFieldErrorLayout: {
    gridArea: FormFieldAreas.error,
    color: 'error',
    fontSize: 'xxs',
    css: {
      pointerEvents: 'none',
      justifySelf: 'end'
    }
  }
};

export type FormFieldProps = {
  label?: string;
  name: string;
  validators?: Validator[];
  children?: (props: React.InputHTMLAttributes<HTMLInputElement> & ThemedComponentProps) => React.ReactNode;
} & ThemedComponentProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const validateSequentially = (validators: Validator[] = [], label: string) => (value: string) => {
  const firstInvalid = validators.find(validator => validator(value, label) !== undefined);
  return firstInvalid ? firstInvalid(value, label) : undefined;
};

const getDefaultInputTypeValidator = (inputType: string | undefined) => {
  switch (inputType) {
    case 'password':
      return passwordValidator;
    case 'email':
      return emailValidator;
    default:
      return undefined;
  }
};

// TODO: when new i18n support is ready use it to translate label and placeholder props
export const FormField: React.SFC<FormFieldProps> = ({
  id,
  label,
  required,
  name,
  validators,
  children,
  ...remaingProps
}) => {
  const hasCustomValidators = validators !== undefined;
  const inputType = remaingProps.type;
  const isHidden = inputType === 'hidden';
  if (required) {
    if (!validators) {
      validators = [];
    }
    validators.unshift(requiredValidator);
  }

  const defaultInputTypeValidator = !hasCustomValidators && getDefaultInputTypeValidator(inputType);

  if (defaultInputTypeValidator && validators) {
    validators.push(defaultInputTypeValidator);
  }

  return (
    <Field
      name={name}
      validate={validateSequentially(validators, label || '')}
      render={(fieldProps: FieldProps) => {
        const { themableProps, rest } = extractThemableProps(remaingProps);

        const { field, form } = fieldProps;
        const touch = getIn(form.touched, name);
        const error = getIn(form.errors, name);
        const invalid = !!touch && !!error;

        // TODO: is there a better way of handling input ids (more automated)?
        // is fallback to name correct?
        const inputId = id || name;

        const inputProps = {
          ...field,
          ...rest,
          gridArea: FormFieldAreas.input,
          height: 'xl',
          id: inputId,
          invalid
        };

        const defaultInput = <Input {...inputProps} />;

        return (
          <Box defaultTheme={formFieldLayout} {...themableProps} display={isHidden ? 'none' : undefined}>
            <Label htmlFor={inputId} gridArea={FormFieldAreas.label} fontSize="xs" fontWeight="bold">
              {label}
            </Label>
            {children ? children(inputProps) : defaultInput}
            <Box defaultTheme={formFieldErrorLayout}>{invalid ? error : null}</Box>
          </Box>
        );
      }}
    />
  );
};
