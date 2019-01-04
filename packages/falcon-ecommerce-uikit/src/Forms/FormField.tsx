import React from 'react';
import { FieldProps as FormikFieldProps } from 'formik';
import { Box, Label, Input, extractThemableProps, ThemedComponentProps, themed } from '@deity/falcon-ui';
import { Field } from './Field';
import { toGridTemplate } from '../helpers';
import { Validator, passwordValidator, emailValidator, requiredValidator } from './validators';

export const FormFieldArea = {
  label: 'label',
  input: 'input',
  error: 'error'
};

export const FormFieldLayout = themed({
  tag: Box,
  defaultTheme: {
    formFieldLayout: {
      display: 'grid',
      gridGap: 'xs',
      // prettier-ignore
      gridTemplate: toGridTemplate([
        ['1fr'                     ],
        [FormFieldArea.label       ],
        [FormFieldArea.input       ],
        [FormFieldArea.error, '0px']
      ])
    }
  }
});

export const FormFieldLabel = themed({
  tag: Label,
  defaultProps: {
    gridArea: FormFieldArea.label
  }
});

export const FormFieldError = themed({
  tag: Box,
  defaultProps: {
    gridArea: FormFieldArea.error
  },
  defaultTheme: {
    formFieldError: {
      gridArea: FormFieldArea.error,
      color: 'error',
      fontSize: 'xxs',
      css: {
        pointerEvents: 'none',
        justifySelf: 'end'
      }
    }
  }
});

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

export type FormFieldRenderProps<TValue = any> = {
  form: FormikFieldProps<TValue>['form'] & {
    id?: number | string;
  };
  field: FormikFieldProps<TValue>['field'] &
    React.InputHTMLAttributes<HTMLInputElement> &
    ThemedComponentProps & {
      id?: string;
      placeholder?: string;
      invalid: boolean;
    };
};

export type FormFieldProps<TValue = any> = {
  id?: number | string;
  name: string;
  label?: string;
  placeholder?: string;
  validate?: Validator[];
  children?: (props: FormFieldRenderProps<TValue>) => React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>; // ThemedComponentProps &

export const FormField: React.SFC<FormFieldProps> = props => {
  const { name, validate, required, children, ...formFieldRestProps } = props;
  const inputType = formFieldRestProps.type;
  const { themableProps, rest } = extractThemableProps(formFieldRestProps);

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
    <Field name={name} validate={_validate} {...rest}>
      {({ form, field, label, error }) => (
        <FormFieldLayout {...themableProps}>
          {label && <FormFieldLabel htmlFor={field.id}>{label}</FormFieldLabel>}
          {children ? (
            children({ form, field: { ...field, gridArea: FormFieldArea.input } })
          ) : (
            <Input {...field} gridArea={FormFieldArea.input} />
          )}
          <FormFieldError>{field.invalid ? error : null}</FormFieldError>
        </FormFieldLayout>
      )}
    </Field>
  );
};

// export type FormInputProps = {
//   id: string;
//   label?: string;
//   form: any;
//   field: any;
// };
// export const FormInput: React.SFC<FormInputProps> = props => {
//   const { id, label, form, field, children, ...rest } = props;

//   return (
//     <FormFieldLayout {...rest}>
//       {label && (
//         <FormFieldLabel htmlFor={id} gridArea={FormFieldArea.label}>
//           {label}
//         </FormFieldLabel>
//       )}

//       {children ? (
//         children({
//           ...inputProps,
//           height: 'xl',
//           gridArea: FormFieldArea.input
//         } as any)
//       ) : (
//         <Input {...inputProps} height="xl" gridArea={FormFieldArea.input} />
//       )}
//       <FormFieldError>{field.invalid ? field.error : null}</FormFieldError>
//     </FormFieldLayout>
//   );
// };
