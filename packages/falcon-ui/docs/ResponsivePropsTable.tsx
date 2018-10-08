import React from 'react';
import { withMDXComponents } from '@mdx-js/tag/dist/mdx-provider';
import { withCSSContext } from '@emotion/core';
import { mappings, ResponsivePropMapping } from '../src/theme/responsiveprops';
import { Table, Thead, Tr, Th, Tbody, Td, Theme } from '../';

const mappingKeys = Object.keys(mappings);

const toKebabCase = (val: string) => val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const ResponsiveProps: React.SFC<{ theme: Theme }> = ({ theme }) => (
  <Table>
    <Thead>
      <Tr>
        <Th>Property</Th>
        <Th>CSS Property</Th>
        <Th>Theme Field</Th>
        <Th>Allowed values</Th>
      </Tr>
    </Thead>
    <Tbody>
      {mappingKeys.map(name => {
        const prop: ResponsivePropMapping = mappings[name];

        return (
          <Tr key={name}>
            <Td>{name}</Td>
            <Td>{prop.cssProp && toKebabCase(prop.cssProp)}</Td>
            <Td>{prop.themeProp}</Td>
            <Td>{prop.themeProp && Object.keys(theme[prop.themeProp]).join(' | ')}</Td>
          </Tr>
        );
      })}
    </Tbody>
  </Table>
);

export default withMDXComponents(
  withCSSContext((props: any, context: any) => <ResponsiveProps theme={context.theme} />)
);
