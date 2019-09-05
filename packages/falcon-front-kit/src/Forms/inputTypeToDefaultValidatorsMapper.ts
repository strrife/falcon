import { emailValidator, passwordValidator, Validator } from './validators';

/**
 * Provides default value validators based on HTML input type
 * @see https://www.w3schools.com/html/html_form_input_types.asp
 * @param {string?} inputType
 */
export function inputTypeToDefaultValidatorsMapper(inputType?: string): Validator[] {
  switch (inputType) {
    case 'password':
      return [passwordValidator];
    case 'email':
      return [emailValidator];
    default:
      return [];
  }
}
