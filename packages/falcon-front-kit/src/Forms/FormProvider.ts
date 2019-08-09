import { FormikConfig, FormikValues } from 'formik';

export type FormProviderProps<Values = FormikValues> = {
  onSuccess?: () => void | Promise<void>;
  initialValues?: Values;
} & Pick<FormikConfig<Values>, 'children'>;
