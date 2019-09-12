import React from 'react';
import { I18n } from '@deity/falcon-i18n';
import { MiniCartQuery } from '@deity/falcon-shop-data';
import { Router } from '@deity/falcon-front-kit';
import { Divider } from '@deity/falcon-ui';
import {
  SidebarLayout,
  NewAccount,
  SignInForm,
  SignUpForm,
  EmptyMiniCart,
  MiniCart,
  ForgotPasswordForm,
  Deferred
} from '@deity/falcon-ui-kit';
import { SIDEBAR_TYPE } from 'src/components/Sidebar';

export default ({ contentType, open, close }) => {
  // if there is no content type provided it means that sidebar contents should be rendered as hidden
  // if unrecognized content type is provided add warning about it
  if (contentType && !SIDEBAR_TYPE[contentType]) {
    const message = `Unrecognized sidebar content type: ${contentType}`;
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(message);
    }

    console.error(message);
  }

  return (
    <Router>
      {({ history }) => (
        <I18n>
          {t => (
            <React.Fragment>
              <Deferred as={SidebarLayout} title={t('miniCart.title')} type={SIDEBAR_TYPE.cart} until={contentType}>
                <MiniCartQuery>
                  {({ data: { cart = { items: [] } } }) =>
                    cart.items.length > 0 ? (
                      <MiniCart items={cart.items} onCheckout={() => close().then(() => history.push('/checkout'))} />
                    ) : (
                      <EmptyMiniCart onGoShopping={() => close().then(() => history.push('/what-is-new.html'))} />
                    )
                  }
                </MiniCartQuery>
              </Deferred>
              <Deferred as={SidebarLayout} title={t('signIn.title')} type={SIDEBAR_TYPE.account} until={contentType}>
                <SignInForm
                  id="sign-in-sidebar"
                  onSuccess={close}
                  onForgotPassword={() => open({ variables: { contentType: SIDEBAR_TYPE.forgotPassword } })}
                />
                <Divider my="lg" />
                <NewAccount onCreateNewAccount={() => open({ variables: { contentType: SIDEBAR_TYPE.signUp } })} />
              </Deferred>
              <Deferred as={SidebarLayout} title={t('signUp.title')} type={SIDEBAR_TYPE.signUp} until={contentType}>
                <SignUpForm onSuccess={() => open({ variables: { contentType: SIDEBAR_TYPE.account } })} />
              </Deferred>
              <Deferred
                as={SidebarLayout}
                title={t('forgotPassword.title')}
                type={SIDEBAR_TYPE.forgotPassword}
                until={contentType}
              >
                <ForgotPasswordForm />
              </Deferred>
            </React.Fragment>
          )}
        </I18n>
      )}
    </Router>
  );
};
