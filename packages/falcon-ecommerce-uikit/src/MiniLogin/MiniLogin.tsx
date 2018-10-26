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
  Input,
  Label,
  Text
} from '@deity/falcon-ui';
import { MiniSignUpData } from './MiniSignUpQuery';
import { ToggleMiniSignUpMutation, SignUpMutation } from './MiniSignUpMutations';
import { SidebarLayout } from '../SidebarLayout';
// import { toGridTemplate } from "../helpers";

// export enum MiniCartProductArea {
//   empty = ".",
//   thumb = "thumb",
//   price = "price",
//   productName = "productName",
//   remove = "remove"
// }

// const miniCartProductTheme: DefaultThemeProps = {
//   miniCartProduct: {
//     display: "grid",
//     gridGap: "sm",
//     // prettier-ignore
//     gridTemplate: toGridTemplate([
//       ["1fr",                     "2fr"                                     ],
//       [MiniCartProductArea.thumb, MiniCartProductArea.productName           ],
//       [MiniCartProductArea.thumb, MiniCartProductArea.price,          "1fr" ],
//       [MiniCartProductArea.thumb, MiniCartProductArea.remove,               ]
//     ])
//   }
// };

// const MiniCartProduct: React.SFC<any> = ({ product }) => (
//   <Box defaultTheme={miniCartProductTheme}>
//     <Image gridArea={MiniCartProductArea.thumb} src={product.src} />
//     <H3 gridArea={MiniCartProductArea.productName}>{product.name}</H3>
//     <H3 fontWeight="bold" gridArea={MiniCartProductArea.price}>
//       {product.currency} {product.price}
//     </H3>
//     <Link display="flex" alignItems="center">
//       <Icon size={24} stroke="primaryDark" src="remove" gridArea={MiniCartProductArea.remove} mr="sm" />
//       <span>Remove</span>
//     </Link>
//   </Box>
// );

// const MiniCartProducts: React.SFC<any> = ({ products }) => (
//   <List>
//     {products.map((product: any, index: number) => (
//       <ListItem pb="none" key={product.name}>
//         <MiniCartProduct product={product} />
//         {index < products.length - 1 && <Divider my="lg" />}
//       </ListItem>
//     ))}
//   </List>
// );

export const MiniLogin: React.SFC<MiniSignUpData> = ({ miniSignUp: { open } }) => (
  <ToggleMiniSignUpMutation>
    {toggle => (
      <React.Fragment>
        <Sidebar as={Portal} visible={open} side="right">
          <SidebarLayout>
            <Icon src="close" onClick={() => toggle()} position="absolute" top={15} right={30} />
            <H2 mb="lg">Login</H2>
            <Text>Log in with your account</Text>
            <Box>
              <Label htmlFor="email">Email</Label>
              <Input name="email" />
            </Box>
            <Box>
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" />
            </Box>
            <Link fontWeight="bold">Password forgot?</Link>
            {/* <SignUpMutation>{signUp => <Button width="100%">Login</Button>}</SignUpMutation> */}
            <Button type="submit" width="100%">
              Login
              <Icon src="buttonArrowRight" stroke="white" />
            </Button>

            <Text>No account yet?</Text>
            <Button type="submit" width="100%">
              Create an account
              <Icon src="buttonArrowRight" stroke="white" />
            </Button>
            <Text fontWeight="bold">Creating an account has many benefits: </Text>
            <List>
              <ListItem>check out faster</ListItem>
              <ListItem>keep more than one address</ListItem>
              <ListItem>track orders and more</ListItem>
            </List>
          </SidebarLayout>
        </Sidebar>
        <Backdrop as={Portal} visible={open} onClick={() => toggle()} />
      </React.Fragment>
    )}
  </ToggleMiniSignUpMutation>
);
