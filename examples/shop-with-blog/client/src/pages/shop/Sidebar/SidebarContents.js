import React from 'react';
import { I18n } from '@deity/falcon-i18n';
import { MiniCartQuery } from '@deity/falcon-shop-data';
import { Router } from '@deity/falcon-front-kit';
import { Box, Divider } from '@deity/falcon-ui';
import {
  SidebarLayout,
  NewAccount,
  SignInForm,
  SignUpForm,
  EmptyMiniCart,
  MiniCart,
  ForgotPasswordForm
} from '@deity/falcon-ui-kit';
import { SIDEBAR_CONTENT_TYPE } from 'src/components/Sidebar';

export default ({ contentType, open, close }) => {
  // if there is no content type provided it means that sidebar contents should be rendered as hidden
  // if unrecognized content type is provided add warning about it
  if (contentType && !SIDEBAR_CONTENT_TYPE[contentType]) {
    const message = `Unrecognized sidebar content type: ${contentType}`;
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(message);
    }

    console.error(message);
  }

  // using hidden attribute will cause react to consider rendering it as low priority
  // (in version > 16.6) - https://github.com/oliviertassinari/react-swipeable-views/issues/453#issuecomment-417939459
  return (
    <Router>
      {({ history }) => (
        <I18n>
          {t => (
            <React.Fragment>
              <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPE.cart}>
                <SidebarLayout title={t('miniCart.title')}>
                  <MiniCartQuery>
                    {({ data: { cart = { items: [] } } }) =>
                      cart.items.length > 0 ? (
                        <MiniCart items={cart.items} onCheckout={() => close().then(() => history.push('/checkout'))} />
                      ) : (
                        <EmptyMiniCart onGoShopping={() => close().then(() => history.push('/what-is-new.html'))} />
                      )
                    }
                  </MiniCartQuery>
                </SidebarLayout>
              </ContentBox>
              <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPE.account}>
                <SidebarLayout title={t('signIn.title')}>
                  <SignInForm
                    id="sign-in-sidebar"
                    onSuccess={close}
                    onForgotPassword={() => open({ variables: { contentType: SIDEBAR_CONTENT_TYPE.forgotPassword } })}
                  />
                  <Divider my="lg" />
                  <NewAccount
                    onCreateNewAccount={() => open({ variables: { contentType: SIDEBAR_CONTENT_TYPE.signUp } })}
                  />
                </SidebarLayout>
              </ContentBox>
              <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPE.signUp}>
                <SidebarLayout title={t('signUp.title')}>
                  <SignUpForm onSuccess={() => open({ variables: { contentType: SIDEBAR_CONTENT_TYPE.account } })} />
                </SidebarLayout>
              </ContentBox>
              <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPE.forgotPassword}>
                <SidebarLayout title={t('forgotPassword.title')}>
                  <ForgotPasswordForm />
                </SidebarLayout>
              </ContentBox>
            </React.Fragment>
          )}
        </I18n>
      )}
    </Router>
  );
};

const ContentBox = ({ current, contentType, children, ...rest }) => {
  const hidden = current !== contentType;
  const key = contentType + hidden;

  return (
    <Box key={key} hidden={hidden} css={{ height: '100%' }} {...rest}>
      {children}
    </Box>
  );
};
