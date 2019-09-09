import { capitalize } from './string';
import { IValidator } from './IValidator';

const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

const isValueProvided = x => (x !== '' && x !== undefined && x !== null) || (Array.isArray(x) && (x as any[]).length);

const getErrorI18nId: (error: string, props?: { formI18nId?: string; name: string }) => string | string[] = (
  error,
  props
) => {
  const DEFAULT = `formError.${error}`;

  if (props && props.formI18nId) {
    return [`${props.formI18nId}.${props.name}Field${capitalize(error)}`, DEFAULT];
  }

  return DEFAULT;
};

export const requiredValidator: IValidator = ({ value, name, label, formI18nId, t }) => {
  if (!isValueProvided(value)) {
    return t(getErrorI18nId('required', { formI18nId, name }), { label });
  }

  return undefined;
};

export const emailValidator: IValidator = ({ value, label, t }) => {
  if (isValueProvided(value) && !VALID_EMAIL_REGEX.test(value.toLowerCase())) {
    return t('formError.invalid', { label });
  }

  return undefined;
};

export const passwordValidator: IValidator = ({ value, label, t }) => {
  if (isValueProvided(value) && !VALID_PASSWORD_REGEX.test(value)) {
    return t('formError.uncomplexPassword', { label });
  }

  return undefined;
};

export function lengthValidator(min: number, max?: number): IValidator {
  if (max && max < min) {
    throw new Error(`value of 'min' can not be grater that 'max'!`);
  }

  return ({ value, label, t }) => {
    if (isValueProvided(value) && typeof value === 'string') {
      if (value.length < min) {
        return t('formError.toShort', { label, min });
      }

      if (max && value.length > max) {
        return t('formError.toLong', { label, min });
      }
    }

    return undefined;
  };
}

export function rangeValidator(min: number, max?: number): IValidator {
  if (max && max < min) {
    throw new Error(`value of 'min' can not be grater that 'max'!`);
  }

  return ({ value, label, t }) => {
    if (isValueProvided(value) && typeof value === 'number') {
      if (value < min) {
        return t('formError.belowRange', { label, min });
      }

      if (max && value > max) {
        return t('formError.aboveRange', { label, max });
      }
    }

    return undefined;
  };
}
