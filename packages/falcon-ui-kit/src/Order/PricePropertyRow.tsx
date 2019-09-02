import React from 'react';
import { Text, GridLayout, ThemedComponentProps } from '@deity/falcon-ui';
import { Price } from '../Price';
import { PropertyRowLayout } from '../Layouts';

export type PricePropertyRowProps = ThemedComponentProps & {
  title: string;
  value: number;
};
export const PricePropertyRow: React.SFC<PricePropertyRowProps> = ({ title, value, ...props }) => (
  <GridLayout gridAutoFlow="column" gridTemplateColumns="1fr auto" gridGap="md" {...(props as any)}>
    <Text>{title}</Text>
    <Price value={value} />
  </GridLayout>
);
