import { inputTypeToDefaultValidatorsMapper } from './inputTypeToDefaultValidatorsMapper';
import { requiredValidator } from './validators';
import { IValidator } from './IValidator';

export function getDefaultInputValidators(
  input: Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'required'> & { validate?: IValidator[] }
): IValidator[] {
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
