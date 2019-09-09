import { TranslationFunction } from '@deity/falcon-i18n';

export type ValidatorProps = {
  name: string;
  label?: string;
  value?: any;
  formI18nId?: string;
  t: TranslationFunction;
};
export interface IValidator {
  (props: ValidatorProps): ValidationError;
}

export type ValidationError = undefined | string | I18nValidationError;
export type I18nValidationError = {
  errorI18nId: string;
} & { [key in string]: any };

export function isI18nValidationError(error: ValidationError): error is I18nValidationError {
  return typeof error === 'object' && (error as I18nValidationError).errorI18nId !== undefined;
}
