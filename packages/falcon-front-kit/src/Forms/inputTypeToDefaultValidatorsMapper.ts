import { emailValidator, passwordValidator } from './validators';
import { IValidator } from './IValidator';

/**
 * Provides default value validators based on HTML input type
 * @see https://www.w3schools.com/html/html_form_input_types.asp
 * @param {string?} inputType
 */
export function inputTypeToDefaultValidatorsMapper(inputType?: string): IValidator[] {
  switch (inputType) {
    case 'password':
      return [passwordValidator];
    case 'email':
      return [emailValidator];
    default:
      return [];
  }
}
