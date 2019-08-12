import { FormikConfig, FormikValues } from 'formik';

export type FormProviderProps<Values = FormikValues> = {
  onSubmit?: () => any | Promise<any>;
  initialValues?: Values;
} & Pick<FormikConfig<Values>, 'children'>;
