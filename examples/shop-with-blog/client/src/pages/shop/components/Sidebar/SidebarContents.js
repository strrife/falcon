import React from 'react';
import { I18n } from '@deity/falcon-i18n';
import { MiniCartQuery } from '@deity/falcon-shop-data';
import { Box, Divider } from '@deity/falcon-ui';
import { SignUp } from '@deity/falcon-ecommerce-uikit';
import {
  CloseSidebarMutation,
  SidebarLayout,
  NewAccount,
  SignInForm,
  MiniCart,
  ForgotPasswordForm
} from '@deity/falcon-ui-kit';
import { SIDEBAR_CONTENT_TYPES } from './SidebarQuery';

export default ({ contentType }) => {
  // if there is no content type provided it means that sidebar contents should be rendered as hidden
  // if unrecognized content type is provided add warning about it
  if (contentType && !SIDEBAR_CONTENT_TYPES[contentType]) {
    const message = `Unrecognized sidebar content type: ${contentType}`;
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(message);
    }

    console.error(message);
  }

  // using hidden attribute will cause react to consider rendering it as low priority
  // (in version > 16.6) - https://github.com/oliviertassinari/react-swipeable-views/issues/453#issuecomment-417939459
  return (
    <I18n>
      {t => (
        <React.Fragment>
          <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPES.cart}>
            <SidebarLayout title={t('miniCart.title')}>
              <MiniCartQuery>{data => <MiniCart {...data} />}</MiniCartQuery>
            </SidebarLayout>
          </ContentBox>
          <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPES.account}>
            <SidebarLayout title={t('signIn.title')}>
              <CloseSidebarMutation>
                {closeSidebar => <SignInForm id="sign-in-sidebar" onSubmit={closeSidebar} />}
              </CloseSidebarMutation>
              <Divider my="lg" />
              <NewAccount />
            </SidebarLayout>
          </ContentBox>
          <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPES.signUp}>
            <SignUp />
          </ContentBox>
          <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPES.forgotPassword}>
            <SidebarLayout title={t('forgotPassword.title')}>
              <ForgotPasswordForm />
            </SidebarLayout>
          </ContentBox>
        </React.Fragment>
      )}
    </I18n>
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
