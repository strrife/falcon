import { createHash } from 'crypto';

declare interface CreateShortHashFn {
  (data: string): string;
  (data: Array<string>): string;
}

/**
 * Creates short hash for the given data
 * @param data Data to create hash
 * @returns Hashed string
 */
export const createShortHash: CreateShortHashFn = (data: string | Array<string>) =>
  createHash('sha1')
    .update((Array.isArray(data) ? data : [data]).join(':'))
    .digest('base64');