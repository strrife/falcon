import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs as FalconUiBreadcrumbs, ThemedComponentProps } from '@deity/falcon-ui';
import { BreadcrumbItem, BreadcrumbItemProps } from './BreadcrumbItem';

export type BreadcrumbsProps = {
  items: BreadcrumbItemProps[];
} & ThemedComponentProps<any>;

export const Breadcrumbs: React.SFC<BreadcrumbsProps> = ({ items, ...rest }) => (
  <FalconUiBreadcrumbs {...(rest as any)}>
    {items.map(item => (
      <BreadcrumbItem key={item.name} {...item} />
    ))}
  </FalconUiBreadcrumbs>
);
Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired)
};
Breadcrumbs.defaultProps = {
  items: []
};
