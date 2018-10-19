import React from 'react';
import {
  Sidebar,
  H2,
  Backdrop,
  Portal,
  Icon,
  List,
  ListItem,
  Box,
  H3,
  DefaultThemeProps,
  Image,
  Link,
  Divider,
  Button,
  NumberInput
} from '@deity/falcon-ui';
import { MiniCartData } from './MiniCartQuery';
import { ToggleMiniCartMutation, RemoveCartItemMutation, UpdateCartItemMutation } from './MiniCartMutations';
import { SidebarLayout } from '../SidebarLayout';
import { toGridTemplate } from '../helpers';

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
    gridGap: 'sm',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['30px'                    , '1fr',                     '2fr'                                    ],
      [MiniCartProductArea.empty, MiniCartProductArea.thumb, MiniCartProductArea.productName           ],
      [MiniCartProductArea.remove, MiniCartProductArea.thumb, MiniCartProductArea.price,         '1fr' ],
      [MiniCartProductArea.empty, MiniCartProductArea.thumb, MiniCartProductArea.modify                ]
    ])
  }
};

const MiniCartProduct: React.SFC<any> = ({ product, currency }) => (
  <Box defaultTheme={miniCartProductTheme}>
    <Image gridArea={MiniCartProductArea.thumb} src={product.thumbnailUrl} />
    <H3 gridArea={MiniCartProductArea.productName}>{product.name}</H3>
    <H3 fontWeight="bold" gridArea={MiniCartProductArea.price}>
      {currency} {product.price}
    </H3>
    <RemoveCartItemMutation>
      {removeCartItem => (
        <Link
          gridArea={MiniCartProductArea.remove}
          display="flex"
          alignItems="center"
          onClick={() => removeCartItem({ variables: { input: { itemId: product.itemId } } })}
        >
          <Icon size={24} stroke="primaryDark" src="remove" mr="sm" />
        </Link>
      )}
    </RemoveCartItemMutation>
    <UpdateCartItemMutation>
      {updateCartItem => (
        <NumberInput
          gridArea={MiniCartProductArea.modify}
          min="1"
          name="qty"
          defaultValue={String(product.qty)}
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
      )}
    </UpdateCartItemMutation>
  </Box>
);

const MiniCartProducts: React.SFC<any> = ({ products, currency }) => (
  <List>
    {products.map((product: any, index: number) => (
      <ListItem pb="none" key={product.name}>
        <MiniCartProduct product={product} currency={currency} />
        {index < products.length - 1 && <Divider my="lg" />}
      </ListItem>
    ))}
  </List>
);

export const MiniCart: React.SFC<MiniCartData> = ({ miniCart: { open }, cart: { quoteCurrency, items } }) => (
  <ToggleMiniCartMutation>
    {toggle => (
      <React.Fragment>
        <Sidebar as={Portal} visible={open} side="right">
          <SidebarLayout>
            <Icon src="close" onClick={() => toggle()} position="absolute" top={15} right={30} />
            <H2 mb="lg">Shopping cart</H2>
            <MiniCartProducts products={items} currency={quoteCurrency} />
            <Box position="absolute" bottom={0} right={0} left={0} bg="primaryLight" p="md">
              <Button width="100%">Checkout</Button>
            </Box>
          </SidebarLayout>
        </Sidebar>
        <Backdrop as={Portal} visible={open} onClick={() => toggle} />
      </React.Fragment>
    )}
  </ToggleMiniCartMutation>
);
