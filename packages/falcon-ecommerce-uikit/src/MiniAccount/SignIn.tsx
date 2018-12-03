import React from 'react';
import { Divider, H4, Text, List, ListItem, Icon, Button, GridLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { SignInForm } from '../SignIn';
import { MiniFormLayout } from './MiniFormLayout';
import { OpenSidebarMutation } from '../Sidebar';

export const SignIn = () => (
  <T>
    {t => (
      <MiniFormLayout title={t('signIn.formTitle')}>
        <SignInForm />

        <Divider my="lg" />
        <GridLayout>
          <NewCustomer />
        </GridLayout>
      </MiniFormLayout>
    )}
  </T>
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
      <T returnObjects>
        {t =>
          t('newCustomer.benefitsList').map((x: string) => (
            <ListItem key={x} display="flex" mb="sm">
              <Icon src="check" size="md" mr="xs" stroke="primaryLight" />
              {x}
            </ListItem>
          ))
        }
      </T>
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
