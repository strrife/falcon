import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { I18n } from '@deity/falcon-i18n';
import { Box, Label, Input, DefaultThemeProps, ThemedComponentProps, extractThemableProps } from '@deity/falcon-ui';
import { FormContext } from './Form';
import { toGridTemplate } from '../helpers';
import { Validator, passwordValidator, emailValidator, requiredValidator } from './validators';

export enum FormFieldAreas {
  label = 'label',
  input = 'input',
  error = 'error'
}

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

const fieldLabelSuffix = 'FieldLabel';
const fieldPlaceholderSuffix = 'FieldPlaceholder';

export type FormFieldProps = {
  name: string;
  label?: string;
  validators?: Validator[];
  children?: (props: React.InputHTMLAttributes<HTMLInputElement> & ThemedComponentProps) => React.ReactNode;
} & ThemedComponentProps &
  React.InputHTMLAttributes<HTMLInputElement>;

// TODO: when new i18n support is ready use it to translate label and placeholder props
export const FormField: React.SFC<FormFieldProps> = props => {
  const {
    id: fieldId,
    label: fieldLabel,
    placeholder: fieldPlaceholder,
    required,
    name: fieldName,
    validators: validate,
    children,
    ...remainingProps
  } = props;
  const inputType = remainingProps.type;
  const isHidden = inputType === 'hidden';

  let validators = validate;
  const hasCustomValidators = validators !== undefined;
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
    <FormContext.Consumer>
      {({ id: formId, name: formName }) => (
        <I18n>
          {t => {
            const label = fieldLabel || t(`${formName}.${fieldName}${fieldLabelSuffix}`, { defaultValue: '' });
            const placeholder =
              fieldPlaceholder || t(`${formName}.${fieldName}${fieldPlaceholderSuffix}`, { defaultValue: '' });

            return (
              <Field
                name={fieldName}
                validate={validateSequentially(validators, label)}
                render={(fieldProps: FieldProps) => {
                  const { themableProps, rest } = extractThemableProps(remainingProps);

                  const { field, form } = fieldProps;
                  const touch = getIn(form.touched, fieldName);
                  const error = getIn(form.errors, fieldName);
                  const invalid = !!touch && !!error;

                  // TODO: is there a better way of handling input ids (more automated)?
                  // is fallback to name correct?
                  const id = fieldId || `${formId}-${fieldName}`;
                  const inputProps = {
                    ...field,
                    ...rest,
                    gridArea: FormFieldAreas.input,
                    height: 'xl',
                    id,
                    placeholder,
                    invalid
                  };

                  return (
                    <Box defaultTheme={formFieldLayout} {...themableProps} display={isHidden ? 'none' : undefined}>
                      {label && (
                        <Label
                          htmlFor={id}
                          gridArea={FormFieldAreas.label}
                          defaultTheme={{ formFieldLabel: { fontSize: 'xs', fontWeight: 'bold' } }}
                        >
                          {label}
                        </Label>
                      )}

                      {children ? children(inputProps) : <Input {...inputProps} />}
                      <Box defaultTheme={formFieldErrorLayout}>{invalid ? error : null}</Box>
                    </Box>
                  );
                }}
              />
            );
          }}
        </I18n>
      )}
    </FormContext.Consumer>
  );
};
