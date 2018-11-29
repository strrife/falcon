import React from 'react';
import {
  Sidebar,
  Backdrop,
  Portal,
  Icon,
  List,
  ListItem,
  Box,
  H3,
  H4,
  DefaultThemeProps,
  Image,
  Link,
  Text,
  Divider,
  Button,
  NumberInput,
  FlexLayout
} from '@deity/falcon-ui';
import { MiniCartData, MiniCartTranslations } from './MiniCartQuery';
import { RemoveCartItemMutation, UpdateCartItemMutation } from '../Cart/CartMutation';
import { CloseSidebarMutation } from '../Sidebar';
import { toGridTemplate, prettyScrollbars } from '../helpers';
import { Price } from '../Locale';

export enum MiniCartProductArea {
  empty = '.',
  thumb = 'thumb',
  price = 'price',
  productName = 'productName',
  modify = 'modify',
  remove = 'remove'
}

const miniCartProductTheme: DefaultThemeProps = {
  miniCartProduct: {
    display: 'grid',
    gridGap: 'xs',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['30px',                     '1fr',                     '2fr'                                    ],
      [MiniCartProductArea.empty,  MiniCartProductArea.thumb, MiniCartProductArea.productName          ],
      [MiniCartProductArea.remove, MiniCartProductArea.thumb, MiniCartProductArea.price,          '1fr'],
      [MiniCartProductArea.empty,  MiniCartProductArea.thumb, MiniCartProductArea.modify               ]
    ])
  }
};

export enum MiniCartLayoutArea {
  title = 'title',
  items = 'items',
  cta = 'cta'
}

const miniCartLayout: DefaultThemeProps = {
  miniCartLayout: {
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

const MiniCartProduct: React.SFC<any> = ({ product, currency, translations }) => (
  <Box defaultTheme={miniCartProductTheme}>
    <Image gridArea={MiniCartProductArea.thumb} src={product.thumbnailUrl} />
    <H4 gridArea={MiniCartProductArea.productName}>{product.name}</H4>
    <Price
      fontSize="md"
      fontWeight="bold"
      gridArea={MiniCartProductArea.price}
      currency={currency}
      value={product.price}
    />
    <RemoveCartItemMutation>
      {removeCartItem => (
        <Link
          gridArea={MiniCartProductArea.remove}
          display="flex"
          alignItems="center"
          onClick={() =>
            removeCartItem({
              variables: { input: { itemId: product.itemId } },
              optimisticResponse: {
                removeCartItem: {
                  itemId: product.itemId
                }
              }
            })
          }
        >
          <Icon
            size="lg"
            stroke="secondaryDark"
            src="remove"
            mr="xs"
            css={({ theme }) => ({
              ':hover': { stroke: theme.colors.primary }
            })}
          />
        </Link>
      )}
    </RemoveCartItemMutation>
    <UpdateCartItemMutation>
      {(updateCartItem, { loading, error }) => (
        <Box gridArea={MiniCartProductArea.modify}>
          <NumberInput
            disabled={loading}
            min="1"
            name="qty"
            defaultValue={String(product.qty)}
            aria-label={translations.quantity}
            onChange={ev =>
              updateCartItem({
                variables: {
                  input: {
                    itemId: product.itemId,
                    sku: product.sku,
                    qty: parseInt(ev.target.value, 10)
                  }
                }
              })
            }
          />
          {!!error && <Text color="error">{error.message}</Text>}
        </Box>
      )}
    </UpdateCartItemMutation>
  </Box>
);

const MiniCartProducts: React.SFC<any> = ({ products, currency, translations }) => (
  <List>
    {products.map((product: any, index: number) => (
      <ListItem pb="none" key={product.sku}>
        <MiniCartProduct product={product} currency={currency} translations={translations} />
        {index < products.length - 1 && <Divider my="md" />}
      </ListItem>
    ))}
  </List>
);

export const MiniCart: React.SFC<MiniCartData & { translations: MiniCartTranslations }> = ({
  cart: { quoteCurrency, items },
  translations
}) => (
  <CloseSidebarMutation>
    {closeSidebar => (
      <Box defaultTheme={miniCartLayout}>
        <H3 gridArea={MiniCartLayoutArea.title}>{translations.title}</H3>

        <Box
          gridArea={MiniCartLayoutArea.items}
          css={props => ({
            ...prettyScrollbars(props.theme)
          })}
        >
          <MiniCartProducts products={items} currency={quoteCurrency} translations={translations} />
          {!items.length && (
            <FlexLayout alignItems="center" flexDirection="column">
              <Text fontSize="md">{translations.empty}</Text>
              <Button onClick={() => closeSidebar()} mt="lg">
                {translations.continue}
              </Button>
            </FlexLayout>
          )}
        </Box>

        {items.length > 0 && (
          <Box gridArea={MiniCartLayoutArea.cta} py="sm" bgFullWidth="secondaryLight">
            <Button css={{ width: '100%' }}>
              <Icon stroke="white" size="md" mr="xs" src="lock" />
              {translations.cta}
            </Button>
          </Box>
        )}
      </Box>
    )}
  </CloseSidebarMutation>
);
