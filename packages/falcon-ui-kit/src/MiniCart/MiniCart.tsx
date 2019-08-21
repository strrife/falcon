import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon, List, ListItem, Box, H3, DefaultThemeProps, Text, Divider, Button, FlexLayout } from '@deity/falcon-ui';
import { LocaleProvider } from '@deity/falcon-front-kit';
import { T } from '@deity/falcon-i18n';
import { MiniCartResponse } from '@deity/falcon-shop-data';
import { CloseSidebarMutation } from '../Sidebar';
import { toGridTemplate, prettyScrollbars } from '../helpers';
import { MiniCartProduct } from './MiniCartProduct';

export const MiniCartLayoutArea = {
  title: 'title',
  items: 'items',
  cta: 'cta'
};

const miniCartTheme: DefaultThemeProps = {
  miniCart: {
    display: 'grid',
    gridRowGap: 'md',

    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['1fr'                          ],
      [MiniCartLayoutArea.title       ],
      [MiniCartLayoutArea.items, '1fr'],
      [MiniCartLayoutArea.cta         ]
    ]),
    css: {
      width: '100%',
      height: '100%'
    }
  }
};

const MiniCartProducts: React.SFC<any> = ({ products }) => (
  <List>
    {products.map((product: any, index: number) => (
      <ListItem pb="none" key={product.sku}>
        <MiniCartProduct product={product} />
        {index < products.length - 1 && <Divider my="md" />}
      </ListItem>
    ))}
  </List>
);

export const MiniCart: React.SFC<MiniCartResponse> = ({ cart: { quoteCurrency, items } }) => (
  <CloseSidebarMutation>
    {closeSidebar => (
      <LocaleProvider currency={quoteCurrency}>
        <Box defaultTheme={miniCartTheme}>
          <H3 gridArea={MiniCartLayoutArea.title}>
            <T id="miniCart.title" />
          </H3>

          <Box gridArea={MiniCartLayoutArea.items} css={props => ({ ...prettyScrollbars(props.theme) })}>
            <MiniCartProducts products={items} />
            {!items.length && (
              <FlexLayout alignItems="center" flexDirection="column">
                <Text fontSize="md">
                  <T id="miniCart.empty" />
                </Text>
                <Button onClick={() => closeSidebar()} mt="lg">
                  <T id="miniCart.goShoppingButton" />
                </Button>
              </FlexLayout>
            )}
          </Box>

          {items.length > 0 && (
            <Box gridArea={MiniCartLayoutArea.cta} py="sm" bgFullWidth="secondaryLight">
              <Button as={RouterLink} to="/cart" onClick={() => closeSidebar()} css={{ width: '100%' }} height="xl">
                <Icon stroke="white" size="md" mr="xs" src="lock" />
                <T id="miniCart.checkout" />
              </Button>
            </Box>
          )}
        </Box>
      </LocaleProvider>
    )}
  </CloseSidebarMutation>
);
