import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { I18n } from '@deity/falcon-i18n';
import { Box, Label, Input, DefaultThemeProps, ThemedComponentProps, extractThemableProps } from '@deity/falcon-ui';
import { FormContext } from './Form';
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

const fieldLabelSuffix = 'FieldLabel';
const fieldPlaceholderSuffix = 'FieldPlaceholder';

export type FormFieldProps = {
  name: string;
  label?: string;
  validate?: Validator[];
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
    validate,
    children,
    ...remainingProps
  } = props;
  const inputType = remainingProps.type;
  const isHidden = inputType === 'hidden';

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
    <FormContext.Consumer>
      {({ id: formId, i18nId }) => (
        <I18n>
          {t => {
            const label =
              fieldLabel ||
              (i18nId && t(`${i18nId}.${fieldName}${fieldLabelSuffix}`, { defaultValue: '' })) ||
              undefined;

            const placeholder =
              fieldPlaceholder ||
              (i18nId && t(`${i18nId}.${fieldName}${fieldPlaceholderSuffix}`, { defaultValue: '' })) ||
              undefined;

            return (
              <Field
                name={fieldName}
                validate={validateSequentially(_validate, label)}
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
