import React from 'react';
import { Field as FormikField, FieldProps as FormikFieldProps, getIn } from 'formik';
import { I18n } from '@deity/falcon-i18n';
import { FormContext } from './Form';
import { Validator, passwordValidator, emailValidator, requiredValidator } from './validators';

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

const LABEL_SUFFIX = 'FieldLabel';
const PLACEHOLDER_SUFFIX = 'FieldPlaceholder';

export type FieldRenderProps<TValue = any> = {
  form: FormikFieldProps<TValue>['form'] & {
    id?: number | string;
  };
  field: FormikFieldProps<TValue>['field'] & {
    label?: string;
    placeholder?: string;
    invalid: boolean;
    error: any;
  };
  i18nIds: {
    label?: string;
    placeholder?: string;
  };
}; // & React.InputHTMLAttributes<HTMLInputElement> & ThemedComponentProps;

export type FieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  validate?: Validator[];
  children?: (props: FieldRenderProps) => React.ReactNode;
};

// TODO: when new i18n support is ready use it to translate label and placeholder props
export const Field: React.SFC<FieldProps> = props => {
  const { name, label, placeholder, validate, children, ...restProps } = props;

  return (
    <FormContext.Consumer>
      {({ id: formId, i18nId: formI18nId }) => (
        <I18n>
          {t => {
            const i18nIds = formI18nId
              ? {
                  label: `${formI18nId}.${name}${LABEL_SUFFIX}`,
                  placeholder: `${formI18nId}.${name}${PLACEHOLDER_SUFFIX}`
                }
              : {};

            const fieldLabel = label || (i18nIds.label && t(i18nIds.label, { defaultValue: '' })) || undefined;
            const fieldPlaceholder =
              placeholder || (i18nIds.placeholder && t(i18nIds.placeholder, { defaultValue: '' })) || undefined;

            return (
              <FormikField name={name} validate={validateSequentially(validate, fieldLabel)}>
                {({ form: formikForm, field: formikField }: FormikFieldProps) => {
                  const touch = getIn(formikForm.touched, name);
                  const error = getIn(formikForm.errors, name);
                  const invalid = !!touch && !!error;

                  const fieldRenderProps: FieldRenderProps = {
                    form: { ...formikForm, id: formId },
                    field: {
                      ...restProps,
                      ...formikField,
                      label: fieldLabel,
                      placeholder: fieldPlaceholder,
                      invalid,
                      error
                    },
                    i18nIds
                  };

                  if (children) {
                    return children(fieldRenderProps);
                  }

                  return null;
                }}
              </FormikField>
            );
          }}
        </I18n>
      )}
    </FormContext.Consumer>
  );
};
