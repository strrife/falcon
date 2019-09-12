import React from 'react';
import { T } from '@deity/falcon-i18n';
import { ValidatePasswordTokenQuery } from '@deity/falcon-shop-data';
import { H1 } from '@deity/falcon-ui';
import { PageLayout, FixCenteredLayout, InvalidResetPasswordToken, ResetPasswordForm } from '@deity/falcon-ui-kit';
import { OpenSidebarMutation, SIDEBAR_TYPE } from 'src/components/Sidebar';

export default ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('token') || '';

  return (
    <PageLayout>
      <H1>
        <T id="resetPassword.title" />
      </H1>
      <FixCenteredLayout maxWidth={400} gridGap="md">
        <OpenSidebarMutation>
          {openSidebar => (
            <ValidatePasswordTokenQuery variables={{ token: resetToken }}>
              {({ data: { validatePasswordToken: isTokenValid } }) =>
                isTokenValid ? (
                  <ResetPasswordForm
                    resetToken={resetToken}
                    onSuccess={() => openSidebar({ variables: { contentType: SIDEBAR_TYPE.account } })}
                  />
                ) : (
                  <InvalidResetPasswordToken
                    onRequestAnotherToken={() =>
                      openSidebar({ variables: { contentType: SIDEBAR_TYPE.forgotPassword } })
                    }
                  />
                )
              }
            </ValidatePasswordTokenQuery>
          )}
        </OpenSidebarMutation>
      </FixCenteredLayout>
    </PageLayout>
  );
};
