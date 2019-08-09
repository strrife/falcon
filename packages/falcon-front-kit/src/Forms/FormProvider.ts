import { FormikConfig, FormikValues } from 'formik';

export type FormProviderProps<Values = FormikValues> = {
  onSubmit?: () => void | Promise<void>;
  initialValues?: Values;
} & Pick<FormikConfig<Values>, 'children'>;
