import { inputTypeToDefaultValidatorsMapper } from './inputTypeToDefaultValidatorsMapper';
import { requiredValidator, Validator } from './validators';

export function getInputDefaultValidators(
  input: Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'required'> & { validate?: Validator[] }
): Validator[] {
  const { type, required, validate } = input;

  const anyValidatorsDefined = !!validate;
  let result = anyValidatorsDefined ? validate : [];

  if (required) {
    result = [requiredValidator, ...result];
  }

  if (!anyValidatorsDefined) {
    result = [...result, ...inputTypeToDefaultValidatorsMapper(type)];
  }

  return result;
}
