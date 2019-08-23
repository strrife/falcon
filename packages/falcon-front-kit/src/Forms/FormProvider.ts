import { FormikConfig, FormikValues } from 'formik';

export type FormProviderProps<Values = FormikValues> = {
  /** Invoked when form is successfully submit, TODO: consider rename to `onSuccess` ? */
  onSubmit?: () => any | Promise<any>;
  initialValues?: Values;
} & Pick<FormikConfig<Values>, 'children'>;
