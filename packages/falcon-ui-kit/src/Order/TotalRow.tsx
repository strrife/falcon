import React from 'react';
import { Text, GridLayout } from '@deity/falcon-ui';
import { Price } from '../Price';

export type TotalRowProps = {
  title: string;
  value: number;
};
export const TotalRow: React.SFC<TotalRowProps> = ({ title, value, ...props }) => (
  <GridLayout gridAutoFlow="column" gridTemplateColumns="1fr auto" gridGap="md" {...props}>
    <Text>{title}</Text>
    <Price value={value} />
  </GridLayout>
);
