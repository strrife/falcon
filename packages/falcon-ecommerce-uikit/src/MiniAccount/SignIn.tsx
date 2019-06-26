import React from 'react';
import { Divider, H4, Text, List, ListItem, Icon, Button, GridLayout } from '@deity/falcon-ui';
import { OpenSidebarMutation, CloseSidebarMutation, SidebarLayout } from '@deity/falcon-ui-kit';
import { I18n, T } from '@deity/falcon-i18n';
import { SignInForm } from '../SignIn';

export const SignIn = () => (
  <I18n>
    {t => (
      <SidebarLayout title={t('signIn.title')}>
        <CloseSidebarMutation>
          {closeSidebar => <SignInForm id="sign-in-sidebar" onCompleted={closeSidebar} />}
        </CloseSidebarMutation>
        <Divider my="lg" />
        <GridLayout>
          <NewCustomer />
        </GridLayout>
      </SidebarLayout>
    )}
  </I18n>
);

const NewCustomer = () => (
  <GridLayout>
    <H4 mb="xs">
      <T id="newCustomer.title" />
    </H4>
    <Text>
      <T id="newCustomer.benefitsHeader" />
    </Text>
    <List>
      <I18n>
        {t =>
          [].concat(t('newCustomer.benefitList', { returnObjects: true })).map((x: string) => (
            <ListItem key={x} display="flex" mb="sm">
              <Icon src="check" size="md" mr="xs" stroke="primaryLight" />
              {x}
            </ListItem>
          ))
        }
      </I18n>
    </List>

    <OpenSidebarMutation>
      {openSidebar => (
        <Button
          justifySelf="end"
          variant="secondary"
          onClick={() => openSidebar({ variables: { contentType: 'signUp' } })}
        >
          <T id="newCustomer.createAnAccount" />
        </Button>
      )}
    </OpenSidebarMutation>
  </GridLayout>
);
