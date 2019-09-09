import { TranslationFunction } from '@deity/falcon-i18n';

export type ValidatorProps = {
  name: string;
  label: string;
  value?: any;
  formI18nId?: string;
  t: TranslationFunction;
};

export interface IValidator {
  (props: ValidatorProps): string | undefined;
}
