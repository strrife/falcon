import { TranslationFunction } from '@deity/falcon-i18n';

export type ValidatorProps = {
  name: string;
  label?: string;
  value?: any;
  formI18nId?: string;
  t: TranslationFunction;
};

export interface IValidator {
  (props: ValidatorProps): FieldValidationError;
}

export type FieldValidationError = undefined | string | I18nFieldValidationError;
export type I18nFieldValidationError = {
  errorI18nId: string;
} & { [key in string]: any };

export function isI18nFieldValidationError(error: FieldValidationError): error is I18nFieldValidationError {
  return typeof error === 'object' && (error as I18nFieldValidationError).errorI18nId !== undefined;
}
