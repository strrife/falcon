import React from 'react';
import { Box, Label, Input, extractThemableProps, themed } from '@deity/falcon-ui';
import { Field, FieldProps, FieldRenderProps } from './Field';
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
      gridGap: 'none',
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
      {({ field, label, error }) => (
        <FormFieldLayout {...themableProps}>
          {label && <FormFieldLabel htmlFor={field.id}>{label}</FormFieldLabel>}

          {children ? (
            children({
              ...field,
              gridArea: FormFieldArea.input
            } as any)
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
