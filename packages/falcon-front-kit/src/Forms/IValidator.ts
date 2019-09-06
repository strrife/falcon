import { TranslationFunction } from '@deity/falcon-i18n';

export interface IValidator {
  (props: { value: string; label: string; t: TranslationFunction }): string | undefined;
}
