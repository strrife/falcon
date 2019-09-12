import React from 'react';
import { H4, Text, List, ListItem, Icon, Button, GridLayout } from '@deity/falcon-ui';
import { I18n, T } from '@deity/falcon-i18n';
import { OpenSidebarMutation } from '../Sidebar';

export const NewAccount = () => (
  <GridLayout>
    <H4 mb="xs">
      <T id="newAccount.title" />
    </H4>
    <Text>
      <T id="newAccount.benefitsHeader" />
    </Text>
    <List>
      <I18n>
        {t =>
          [].concat(t('newAccount.benefitList', { returnObjects: true })).map((x: string) => (
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
          <T id="newAccount.createAnAccount" />
        </Button>
      )}
    </OpenSidebarMutation>
  </GridLayout>
);
