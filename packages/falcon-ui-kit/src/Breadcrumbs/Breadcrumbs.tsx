import React from 'react';
import { Breadcrumbs as FalconUiBreadcrumbs } from '@deity/falcon-ui';
import { BreadcrumbItem, BreadcrumbItemProps } from './BreadcrumbItem';

export type BreadcrumbsProps = {
  items: BreadcrumbItemProps[];
};

export const Breadcrumbs: React.SFC<BreadcrumbsProps> = ({ items }) => (
  <FalconUiBreadcrumbs>
    {items.map(item => (
      <BreadcrumbItem key={item.name} {...item} />
    ))}
  </FalconUiBreadcrumbs>
);
Breadcrumbs.defaultProps = {
  items: []
};
