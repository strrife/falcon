import { SortOrderInput } from '@deity/falcon-shop-data';

/**
 * Determines if two `SortOrderInput` are equal from a value perspective
 * @param {SortOrderInput?} item1
 * @param {SortOrderInput? }item2
 */
export const areSortOrderInputsEqual = (item1?: SortOrderInput, item2?: SortOrderInput): boolean =>
  !!item1 && !!item2 && item1.field === item2.field && item1.direction === item2.direction;
