import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Breadcrumb, Link, Text } from '@deity/falcon-ui';

export type BreadcrumbItemProps = {
  name: string;
  urlPath?: string;
};
export const BreadcrumbItem: React.SFC<BreadcrumbItemProps> = ({ name, urlPath }) => (
  <Breadcrumb key={name}>
    {urlPath ? (
      <Link as={RouterLink} to={urlPath}>
        {name}
      </Link>
    ) : (
      <Text>{name}</Text>
    )}
  </Breadcrumb>
);
