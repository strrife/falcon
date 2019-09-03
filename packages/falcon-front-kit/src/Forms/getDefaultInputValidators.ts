import { inputTypeToDefaultValidatorsMapper } from './inputTypeToDefaultValidatorsMapper';
import { requiredValidator, Validator } from './validators';

export function getDefaultInputValidators(
  input: Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'required'> & { validate?: Validator[] }
): Validator[] {
  const { type, required, validate } = input;
  const anyValidatorsDefined = !!validate;

  const result = anyValidatorsDefined ? validate : [];
  if (required) {
    result.unshift(requiredValidator);
  }

  if (!anyValidatorsDefined) {
    result.push(...inputTypeToDefaultValidatorsMapper(type));
  }

  return result;
}
