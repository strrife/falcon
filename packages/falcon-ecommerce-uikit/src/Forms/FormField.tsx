import React from 'react';
import { Box, Label, Input, DefaultThemeProps, ThemedComponentProps, extractThemableProps } from '@deity/falcon-ui';
import { Field, FieldProps, FieldRenderProps } from './Field';
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

export type FormFieldProps = {
  id?: number | string;
  name: string;
  label?: string;
  placeholder?: string;
  validate?: Validator[];
  children?: (props: React.InputHTMLAttributes<HTMLInputElement> /* & ThemedComponentProps */) => React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>; // ThemedComponentProps &

// TODO: when new i18n support is ready use it to translate label and placeholder props
export const FormField: React.SFC<FormFieldProps> = props => {
  const { id: fieldId, name, label, placeholder, validate, required, children, ...restProps } = props;
  const inputType = restProps.type;

  // eslint-disable-next-line
  let _validate = validate;
  const hasCustomValidators = _validate !== undefined;
  if (required) {
    if (!_validate) {
      _validate = [];
    }
    _validate.unshift(requiredValidator);
  }

  const defaultInputTypeValidator = !hasCustomValidators && getDefaultInputTypeValidator(inputType);

  if (defaultInputTypeValidator && _validate) {
    _validate.push(defaultInputTypeValidator);
  }

  return (
    <Field name={name} label={label} placeholder={placeholder} validate={_validate}>
      {({ field, form, i18nIds }) => {
        const { invalid, error, ...fieldRest } = field;
        const { themableProps, rest } = extractThemableProps(restProps);

        const id = fieldId || [form.id, name].filter(x => x).join('-');

        const inputProps = {
          ...fieldRest,
          id,
          placeholder,
          invalid
        };

        return (
          <Box defaultTheme={formFieldLayout} {...themableProps}>
            {field.label && (
              <Label
                htmlFor={id}
                gridArea={FormFieldAreas.label}
                defaultTheme={{ formFieldLabel: { fontSize: 'xs', fontWeight: 'bold' } }}
              >
                {field.label}
              </Label>
            )}

            {children ? (
              children({
                ...inputProps,
                height: 'xl',
                gridArea: FormFieldAreas.input
              } as any)
            ) : (
              <Input {...inputProps} height="xl" gridArea={FormFieldAreas.input} />
            )}
            <Box defaultTheme={formFieldErrorLayout}>{invalid ? field.error : null}</Box>
          </Box>
        );
      }}
    </Field>
  );
};
